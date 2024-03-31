import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Fab, Snackbar, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { likeBlog, checkLikedBlog, shareBlog, getLikesForBlog } from '../Services/blogInteractions';
import { Link } from 'react-router-dom';
import '../assets/home.css';
import Pagination from '@mui/material/Pagination';

const Home = () => {
    const [blogs, setBlogs] = useState([]);
    const [expandedBlogId, setExpandedBlogId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);
    const [shareModalOpen, setShareModalOpen] = useState(false);
    const [sharedBlogId, setSharedBlogId] = useState(null);
    const [likesCountMap, setLikesCountMap] = useState({});
    const [likedStatusMap, setLikedStatusMap] = useState({}); // State to store liked status for each blog

    const fetchBlogs = async (page) => {
        try {
            const response = await fetch(`http://localhost:3000/api/blogs/getAllBlogs?page=${page}&limit=5`);
            if (!response.ok) {
                throw new Error('Failed to fetch blogs');
            }
            const data = await response.json();
            setBlogs(data.blogs);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        }
    };

    useEffect(() => {
        fetchBlogs(currentPage);
    }, [currentPage]);

    const handleExpandContent = (blogId) => {
        setExpandedBlogId(blogId === expandedBlogId ? null : blogId);
    };

    const handleLike = async (blogId) => {
        try {
            const response = await likeBlog(blogId);
            if (!response) {
                setDialogOpen(true);
                return;
            }
            const responseData = await response.json();
            if (response.ok) {
                const updatedBlogs = blogs.map(blog => {
                    if (blog._id === blogId) {
                        return { ...blog, liked: true };
                    }
                    return blog;
                });
                setBlogs(updatedBlogs);
                setSnackbarMessage(responseData.message);
                setSnackbarOpen(true);
            } else {
                setSnackbarMessage(responseData.message);
                setSnackbarOpen(true);
            }
        } catch (error) {
            console.error('Error liking blog:', error);
        }
    };

    const checkBlogLikedStatus = async (blogId) => {
        try {
            const response = await checkLikedBlog(blogId);
            if (!response) {
                console.error('Failed to check liked status');
                return false;
            }
            const responseData = await response.json();
            return responseData.liked || false;
        } catch (error) {
            console.error('Error checking liked blog:', error);
            return false;
        }
    };

    useEffect(() => {
        const updateBlogLikes = async () => {
            const updatedBlogs = await Promise.all(
                blogs.map(async blog => {
                    let liked = await checkBlogLikedStatus(blog._id);
                    // If checkLikedBlog returns true, set liked to true directly
                    if (liked === true) {
                        liked = true;
                    }
                    return { ...blog, liked };
                })
            );
            setBlogs(updatedBlogs);
        };

        updateBlogLikes();
    }, []);

    useEffect(() => {
        const fetchLikesCount = async () => {
            const likesCountObj = {};
            for (const blog of blogs) {
                try {
                    const likesCount = await getLikesForBlog(blog._id);
                    likesCountObj[blog._id] = likesCount;
                } catch (error) {
                    console.error(`Error fetching likes count for blog ${blog._id}:`, error);
                }
            }
            setLikesCountMap(likesCountObj);
        };

        fetchLikesCount();
    }, [blogs]);

    useEffect(() => {
        const updateLikedStatusMap = async () => {
            const likedStatusObj = {};
            for (const blog of blogs) {
                try {
                    const liked = await checkBlogLikedStatus(blog._id);
                    likedStatusObj[blog._id] = liked;
                } catch (error) {
                    console.error(`Error updating liked status for blog ${blog._id}:`, error);
                }
            }
            setLikedStatusMap(likedStatusObj);
        };

        updateLikedStatusMap();
    }, [blogs]);

    const handlePageChange = (event, page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleShare = async (blogId) => {
       
        try {
            const response = await shareBlog(blogId);
            if (!response) {
                setDialogOpen(true);
                return;
            }
            console.log('Sharing blog with ID:', blogId);
            setSharedBlogId(blogId);
            setShareModalOpen(true);
        } catch (error) {
            console.error('Error sharing blog:', error);
        }
    };

    const handleCloseShareModal = () => {
        setShareModalOpen(false);
    };

    return (
        <div className="container" style={{ width: '100%', maxWidth: '100vw', padding: '0', margin: '0' }}>
            <div className="header">
                <h1>Welcome to Daily Blogs!</h1>
            </div>
            <div className="blog-container">
                {blogs.map(blog => (
                    <Card key={blog._id} className="blog-card">
                        <CardMedia
                            component="img"
                            src={`http://localhost:3000/${blog.blogimage.replace(/\\/g, '/')}`}
                            alt={blog.blogtitle}
                        />
                        <CardContent>
                            <div className="blog-header">
                                <Typography variant="h4" className="blog-title">
                                    {blog.blogtitle}
                                </Typography>
                                <div className="blog-actions">
                                    <Fab aria-label="like" onClick={() => handleLike(blog._id)} style={{ marginRight: '8px' }} className={`icon-btn ${likedStatusMap[blog._id] === true ? 'liked' : ''}`}>
                                        <FavoriteIcon style={{ color: likedStatusMap[blog._id] === true ? 'red' : 'inherit' }} />
                                    </Fab>
                                    <Fab aria-label="share" onClick={() => handleShare(blog._id)} className="icon-btn" style={{ marginRight: '8px' }}>
                                        <ShareIcon />
                                    </Fab>
                                    <Fab aria-label="bookmark" className="icon-btn" style={{ marginRight: '8px' }}>
                                        <BookmarkIcon />
                                    </Fab>
                                    {likesCountMap[blog._id] && <Typography variant="body2">{likesCountMap[blog._id]} Likes</Typography>}
                                </div>
                            </div>
                            <Typography
                                variant="subtitle1"
                                className="blog-category"
                                style={{ marginBottom: '8px', color: '#ff5722', fontWeight: 'bold' }}
                            >
                                Category: {blog.blogcategory}
                            </Typography>
                            <Typography variant="body1" className="blog-content">
                                {expandedBlogId === blog._id ? (
                                    <>
                                        <span style={{ fontSize: '24px', fontWeight: 'bold' }}>{blog.blogcontent.charAt(0).toUpperCase()}</span>
                                        {blog.blogcontent.substring(1)}
                                    </>
                                ) : (
                                    <>
                                        <span style={{ fontSize: '24px', fontWeight: 'bold' }}>{blog.blogcontent.substring(0, 1).toUpperCase()}</span>
                                        {`${blog.blogcontent.substring(1, 200)}...`}
                                    </>
                                )}
                            </Typography>
                            {blog.blogcontent.length > 200 && (
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    size="small"
                                    className="read-more-button"
                                    onClick={() => handleExpandContent(blog._id)}
                                    style={{
                                        width: '20%',
                                        marginLeft: '600px',
                                        paddingLeft: '10px'
                                    }}
                                >
                                    {expandedBlogId === blog._id ? 'Show less' : 'Read more'}
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
            <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                variant="outlined"
                shape="rounded"
                size="large"
                style={{ marginTop: '20px', justifyContent: 'center' }}
            />
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                message={snackbarMessage}
            />
            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
                <DialogTitle>Please log in</DialogTitle>
                <DialogContent>
                    <Typography variant="body1" gutterBottom>
                        You need to log in to like, Share and bookmark a post.
                    </Typography>
                    <Link to="/login"><Button variant="outlined" color="primary" style={{ marginBottom: '8px' }}>Login</Button></Link>
                    <Link to="/register"><Button variant="outlined" color="primary">Register</Button></Link>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={() => setDialogOpen(false)} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={shareModalOpen} onClose={handleCloseShareModal}>
                <DialogTitle>Share Blog</DialogTitle>
                <DialogContent>
                    <Typography variant="body1" gutterBottom>
                        Share this blog: {sharedBlogId}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={handleCloseShareModal} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Home;
