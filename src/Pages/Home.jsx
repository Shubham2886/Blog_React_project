// import React, { useEffect, useState } from 'react';
// import { Card, CardContent, CardMedia, Typography, Button, Fab, Snackbar, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Avatar, Grid, Paper, IconButton } from "@mui/material";
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import ShareIcon from '@mui/icons-material/Share';
// import BookmarkIcon from '@mui/icons-material/Bookmark';
// import { likeBlog, checkLikedBlog, shareBlog, getLikesForBlog, bookmarkBlog } from '../Services/blogInteractions';
// import { addComment, getAllCommentsForBlog as fetchAllCommentsForBlog, deleteComment, updateComment } from '../Services/commentService';
// import { Link } from 'react-router-dom';
// import '../assets/home.css';
// import Pagination from '@mui/material/Pagination';
// import { useAuth } from '../Components/AuthContext';
// import { useNavigate } from 'react-router-dom';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';

// const Home = () => {
//     const navigate = useNavigate();
//     const { isLoggedIn, currentUser } = useAuth();
//     const [blogs, setBlogs] = useState([]);
//     const [expandedBlogId, setExpandedBlogId] = useState(null);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [totalPages, setTotalPages] = useState(1);
//     const [snackbarOpen, setSnackbarOpen] = useState(false);
//     const [snackbarMessage, setSnackbarMessage] = useState('');
//     const [dialogOpen, setDialogOpen] = useState(false);
//     const [shareModalOpen, setShareModalOpen] = useState(false);
//     const [sharedBlogId, setSharedBlogId] = useState(null);
//     const [likesCountMap, setLikesCountMap] = useState({});
//     const [commentInput, setCommentInput] = useState('');
//     const [comments, setComments] = useState([]); // State to hold comments
//     const [likedStatusMap, setLikedStatusMap] = useState({}); // State to store liked status for each blog
//     const [commentModalOpen, setCommentModalOpen] = useState(false); // State to manage comment modal visibility
//     const [currentBlogId, setCurrentBlogId] = useState(null); // State to hold the ID of the currently expanded blog
//     const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false); // State to manage delete confirmation dialog
//     const [commentToDelete, setCommentToDelete] = useState(null); // State to hold the ID of the comment to delete
//     const [editCommentModalOpen, setEditCommentModalOpen] = useState(false);
//     const [editedCommentContent, setEditedCommentContent] = useState('');
//     const [commentToEdit, setCommentToEdit] = useState(null);

//     const fetchCommentsForBlog = async (blogId) => {
//         try {
//             const response = await fetchAllCommentsForBlog(blogId);

//             // if (!response.ok) {
//             //     throw new Error('Failed to fetch comments for blog');
//             // }
//             const data = await response.json();
//             console.log(data);
//             setComments(data);
//         } catch (error) {
//             console.error('Error fetching comments:', error);
//         }
//     };

//     useEffect(() => {
//         if (expandedBlogId) {
//             fetchCommentsForBlog(expandedBlogId);
//         }
//     }, [expandedBlogId]);

//     // Function to handle comment submission
//     const handleSubmitComment = async (blogId) => {
//         try {
//             // Check if user is logged in
//             if (!isLoggedIn) {
//                 setDialogOpen(true); // Open dialog to prompt login
//                 return;
//             }
//             // Check if comment input is not empty
//             if (commentInput.trim() === '') {
//                 // Optionally, show a message to the user indicating that the comment cannot be empty
//                 return;
//             }
//             console.log(blogId, { content: commentInput });
//             // Call addComment function from CommentService to submit the comment
//             const response = await addComment(blogId, { content: commentInput });
//             const responseData = await response.json();
//             // Optionally, clear the comment input field after submission
//             setCommentInput('');
//             // Set success message
//             setSnackbarMessage(responseData.message);
//             setSnackbarOpen(true);
//             fetchCommentsForBlog(blogId);
//         } catch (error) {
//             console.error('Error submitting comment:', error);
//         }
//     };

//     const fetchBlogs = async (page) => {
//         try {
//             const response = await fetch(`http://localhost:3000/api/blogs/getAllBlogs?page=${page}&limit=5`);
//             if (!response.ok) {
//                 throw new Error('Failed to fetch blogs');
//             }
//             const data = await response.json();
//             setBlogs(data.blogs);
//             setTotalPages(data.totalPages);
//         } catch (error) {
//             console.error('Error fetching blogs:', error);
//         }
//     };

//     useEffect(() => {
//         fetchBlogs(currentPage);
//     }, [currentPage]);

//     const handleExpandContent = (blogId) => {
//         setExpandedBlogId(blogId === expandedBlogId ? null : blogId);
//     };

//     const handleLike = async (blogId) => {
//         try {
//             const response = await likeBlog(blogId);


//             if (!response) {
//                 setDialogOpen(true);
//                 return;
//             }
//             const responseData = await response.json();

//             if (response.ok) {
//                 const updatedBlogs = blogs.map(blog => {
//                     if (blog._id === blogId) {
//                         return { ...blog, liked: true };
//                     }
//                     return blog;
//                 });
//                 setBlogs(updatedBlogs);
//                 setSnackbarMessage(responseData.message);
//                 setSnackbarOpen(true);
//             } else {
//                 setSnackbarMessage(responseData.message);
//                 setSnackbarOpen(true);
//             }
//         } catch (error) {
//             console.error('Error liking blog:', error);
//         }
//     };

//     const checkBlogLikedStatus = async (blogId) => {
//         try {
//             const response = await checkLikedBlog(blogId);
//             //console.log(response);
//             if (!response) {
//                 console.error('Failed to check liked status');
//                 return false;
//             }
//             const responseData = await response.json();
//             console.log(responseData);
//             return responseData.liked || false;
//         } catch (error) {
//             console.error('Error checking liked blog:', error);
//             return false;
//         }
//     };

//     useEffect(() => {
//         const updateBlogLikes = async () => {
//             const updatedBlogs = await Promise.all(
//                 blogs.map(async blog => {
//                     let liked = isLoggedIn ? await checkBlogLikedStatus(blog._id) : false;
//                     // If checkLikedBlog returns true, set liked to true directly
//                     if (liked === true) {
//                         liked = true;
//                     }
//                     return { ...blog, liked };
//                 })
//             );
//             setBlogs(updatedBlogs);
//         };

//         updateBlogLikes();
//     }, [isLoggedIn]);

//     useEffect(() => {
//         const fetchLikesCount = async () => {
//             const likesCountObj = {};
//             for (const blog of blogs) {
//                 try {
//                     const likesCount = await getLikesForBlog(blog._id);
//                     likesCountObj[blog._id] = likesCount;
//                 } catch (error) {
//                     console.error(`Error fetching likes count for blog ${blog._id}:`, error);
//                 }
//             }
//             setLikesCountMap(likesCountObj);
//         };

//         fetchLikesCount();
//     }, [blogs]);

//     useEffect(() => {
//         const updateLikedStatusMap = async () => {
//             const likedStatusObj = {};
//             for (const blog of blogs) {
//                 try {
//                     const liked = await checkBlogLikedStatus(blog._id);
//                     likedStatusObj[blog._id] = liked;
//                 } catch (error) {
//                     console.error(`Error updating liked status for blog ${blog._id}:`, error);
//                 }
//             }
//             setLikedStatusMap(likedStatusObj);
//         };

//         updateLikedStatusMap();
//     }, [blogs]);

//     const handlePageChange = (event, page) => {
//         setCurrentPage(page);
//         window.scrollTo({ top: 0, behavior: 'smooth' });
//     };


//     const handleShare = async (blogId) => {

//         try {
//             const response = await shareBlog(blogId);
//             console.log(response);
//             if (!response) {
//                 setDialogOpen(true);
//                 return;
//             }
//             console.log('Sharing blog with ID:', blogId);
//             setSharedBlogId(blogId);
//             setShareModalOpen(true);
//         } catch (error) {
//             console.error('Error sharing blog:', error);
//         }
//     };

//     const handleCloseShareModal = () => {
//         setShareModalOpen(false);
//     };

//     const handleBookmark = async (blogId) => {
//         try {
//             const response = await bookmarkBlog(blogId);
//             if (!response) {
//                 setDialogOpen(true);
//                 return;
//             }
//             const responseData = await response.json();
//             console.log(responseData);
//             if (response.ok) {
//                 setSnackbarMessage(responseData.message);
//                 setSnackbarOpen(true);
//             } else {
//                 setSnackbarMessage(responseData.message);
//                 setSnackbarOpen(true);
//             }
//         } catch (error) {
//             console.error('Error bookmarking blog:', error);
//         }
//     };

//     // Function to handle opening the comment modal and fetching comments for the selected blog
//     const handleOpenCommentModal = async (blogId) => {
//         setCurrentBlogId(blogId);
//         // Check if user is logged in
//         if (!isLoggedIn) {
//             setDialogOpen(true);
//             return;
//         }
//         // If user is logged in, proceed to open the comment modal
//         setCommentModalOpen(true);
//         await fetchCommentsForBlog(blogId); // Fetch comments for the selected blog
//         // setCurrentBlogId(blogId);
//         // setCommentModalOpen(true);
//         // await fetchCommentsForBlog(blogId); // Fetch comments for the selected blog
//     };

//     // Function to handle closing the comment modal and resetting the current blog ID
//     const handleCloseCommentModal = () => {
//         setCommentModalOpen(false);
//         setCurrentBlogId(null); // Reset the current blog ID
//     };

//     // Function to handle deleting a comment
//     const handleDeleteComment = async (blogId, commentId) => {
//         setDeleteConfirmationOpen(true);
//         setCommentToDelete({ blogId, commentId });
//     };

//     // Function to confirm and delete a comment
//     const confirmDeleteComment = async () => {
//         const { blogId, commentId } = commentToDelete;
//         try {
//             const response = await deleteComment(blogId, commentId);
//             const responseData = await response.json();
//             await fetchCommentsForBlog(blogId);
//             setSnackbarMessage(responseData.message);
//             setSnackbarOpen(true);
//         } catch (error) {
//             console.error('Error deleting comment:', error);
//         } finally {
//             setDeleteConfirmationOpen(false);
//             setCommentToDelete(null);
//         }
//     };


//     // Function to handle opening the edit comment modal
//     const handleEditComment = (blogId, commentId) => {
//         const comment = comments.data.find(c => c._id === commentId);
//         setCommentToEdit(comment);
//         setEditedCommentContent(''); // Set to empty string initially
//         setEditCommentModalOpen(true);
//     };

//     // Function to handle closing the edit comment modal
//     const handleCloseEditCommentModal = () => {
//         setEditCommentModalOpen(false);
//         setCommentToEdit(null);
//         setEditedCommentContent('');
//     };

//     // Function to handle editing and submitting the comment
//     const handleEditSubmit = async () => {
//         try {
//             const { blogId, _id } = commentToEdit;
//             const updatedCommentData = { content: editedCommentContent }; // Use editedCommentContent

//             const response = await updateComment(blogId, _id, updatedCommentData);
//             if (!response.ok) {
//                 throw new Error('Failed to update comment');
//             }
//             const responseData = await response.json();
//             console.log(responseData);
//             setSnackbarMessage(responseData.message);
//             await fetchCommentsForBlog(blogId);
//             setSnackbarOpen(true);
//             handleCloseEditCommentModal();
//         } catch (error) {
//             console.error('Error updating comment:', error);
//         }
//     };

//     return (
//         <div className="container" style={{ width: '100%', maxWidth: '100vw', padding: '0', margin: '0' }}>
//             <div className="header">
//                 <h1>Welcome to Daily Blogs!</h1>
//             </div>

//             <div className="blog-container">
//                 {blogs.map(blog => (
//                     <Card key={blog._id} className="blog-card">
//                         <CardMedia
//                             component="img"
//                             src={`http://localhost:3000/${blog.blogimage.replace(/\\/g, '/')}`}
//                             alt={blog.blogtitle}
//                         />
//                         <CardContent>
//                             <div className="blog-header">
//                                 <Typography variant="h4" className="blog-title">
//                                     {blog.blogtitle}
//                                 </Typography>
//                                 <hr></hr>
//                                 <div className="blog-actions">
//                                     <Fab aria-label="like" onClick={() => handleLike(blog._id)} style={{ marginRight: '8px' }} className={`icon-btn ${likedStatusMap[blog._id] === true ? 'liked' : ''}`}>
//                                         <FavoriteIcon style={{ color: likedStatusMap[blog._id] === true ? 'red' : 'inherit' }} />
//                                     </Fab>
//                                     <Fab aria-label="share" onClick={() => handleShare(blog._id)} className="icon-btn" style={{ marginRight: '8px' }}>
//                                         <ShareIcon />
//                                     </Fab>
//                                     <Fab aria-label="bookmark" onClick={() => handleBookmark(blog._id)} className="icon-btn" style={{ marginRight: '8px' }}>
//                                         <BookmarkIcon />
//                                     </Fab>
//                                     {likesCountMap[blog._id] > 0 && <Typography variant="body2">{likesCountMap[blog._id]} Likes</Typography>}
//                                 </div>
//                             </div>
//                             <Typography
//                                 variant="subtitle1"
//                                 className="blog-category"
//                                 style={{ marginBottom: '8px', color: '#ff5722', fontWeight: 'bold' }}
//                             >
//                                 Category: {blog.blogcategory}
//                             </Typography>
//                             <Typography variant="body1" className="blog-content">
//                                 {expandedBlogId === blog._id ? (
//                                     <>
//                                         <span style={{ fontSize: '24px', fontWeight: 'bold' }}>{blog.blogcontent.charAt(0).toUpperCase()}</span>
//                                         {blog.blogcontent.substring(1)}
//                                     </>
//                                 ) : (
//                                     <>
//                                         <span style={{ fontSize: '24px', fontWeight: 'bold' }}>{blog.blogcontent.substring(0, 1).toUpperCase()}</span>
//                                         {`${blog.blogcontent.substring(1, 200)}...`}
//                                     </>
//                                 )}
//                             </Typography>
//                             {blog.blogcontent.length > 200 && (
//                                 <Button
//                                     variant="outlined"
//                                     color="primary"
//                                     size="small"
//                                     className="read-more-button"
//                                     onClick={() => handleExpandContent(blog._id)}
//                                     style={{
//                                         width: '20%',
//                                         marginLeft: '700px',
//                                         paddingLeft: '10px'
//                                     }}
//                                 >
//                                     {expandedBlogId === blog._id ? 'Show less' : 'Read more'}
//                                 </Button>
//                             )}
//                         </CardContent>
//                         <Button onClick={() => handleOpenCommentModal(blog._id)}>View Comments</Button>

//                     </Card>
//                 ))}
//             </div>
//             <Pagination
//                 count={totalPages}
//                 page={currentPage}
//                 onChange={handlePageChange}
//                 variant="outlined"
//                 shape="rounded"
//                 size="large"
//                 style={{
//                     marginTop: '20px',
//                     marginBottom: '20px',
//                     justifyContent: 'center',
//                     backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent white background
//                     padding: '10px', // Add padding for better visibility
//                     borderRadius: '10px', // Rounded corners
//                     boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' // Box shadow for depth
//                 }}
//             />

//             <Snackbar
//                 open={snackbarOpen}
//                 autoHideDuration={3000}
//                 onClose={() => setSnackbarOpen(false)}
//                 message={snackbarMessage}
//             />
//             <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
//                 <DialogTitle>Please log in</DialogTitle>
//                 <DialogContent>
//                     <Typography variant="body1" gutterBottom>
//                         You need to log in to like, Share, Comment and bookmark a post.
//                     </Typography>
//                     <Link to="/login"><Button variant="outlined" color="primary" style={{ marginBottom: '8px' }}>Login</Button></Link>
//                     <Link to="/register"><Button variant="outlined" color="primary">Register</Button></Link>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button variant="contained" onClick={() => setDialogOpen(false)} color="primary">
//                         Close
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//             <Dialog open={shareModalOpen} onClose={handleCloseShareModal}>
//                 <DialogTitle>Share Blog</DialogTitle>
//                 <DialogContent>
//                     <Typography variant="body1" gutterBottom>
//                         Share this blog: {sharedBlogId}
//                     </Typography>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button variant="contained" onClick={handleCloseShareModal} color="primary">
//                         Close
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//             <Dialog open={commentModalOpen} onClose={handleCloseCommentModal} fullWidth maxWidth="md">
//                 <DialogTitle>Comments</DialogTitle>
//                 <DialogContent>
//                     {/* Display comments */}
//                     {Array.isArray(comments.data) && comments.data.length > 0 ? (
//                         comments.data.map(comment => (
//                             <Paper key={comment._id} style={{ padding: '10px', marginBottom: '10px' }}>
//                                 <Grid container wrap="nowrap" spacing={2}>
//                                     <Grid item>
//                                         <Avatar alt={comment.userId.username} src={comment.userId.profilePicture} />
//                                     </Grid>
//                                     <Grid item xs>
//                                         <Typography variant="subtitle1">{comment.userId.username}</Typography>
//                                         <Typography variant="body2" color="textSecondary">{new Date(comment.createdAt).toLocaleString()}</Typography>
//                                         <Typography variant="body1">{comment.content}</Typography>
//                                     </Grid>
//                                     {comment.userId._id === currentUser.id && (
//                                         <Grid item>
//                                             <IconButton onClick={() => handleEditComment(comment.blogId, comment._id)} className="edit-icon">
//                                                 <EditIcon />
//                                             </IconButton>
//                                             <IconButton onClick={() => handleDeleteComment(comment.blogId, comment._id)} className="delete-icon">
//                                                 <DeleteIcon />
//                                             </IconButton>
//                                         </Grid>
//                                     )}
//                                 </Grid>
//                             </Paper>
//                         ))
//                     ) : (
//                         <Typography variant="body1">No comments found for this blog.</Typography>
//                     )}

//                     {/* Add comment section */}
//                     <TextField
//                         id={`comment-input-${currentBlogId}`}
//                         label="Add Comment"
//                         multiline
//                         rows={4}
//                         variant="outlined"
//                         fullWidth
//                         value={commentInput}
//                         onChange={(e) => setCommentInput(e.target.value)}
//                         style={{ marginTop: '20px' }}
//                     />
//                 </DialogContent>
//                 <DialogActions>
//                     <Button variant="contained" onClick={handleCloseCommentModal} color="primary">
//                         Close
//                     </Button>
//                     <Button
//                         variant="contained"
//                         color="primary"
//                         onClick={() => handleSubmitComment(currentBlogId)}
//                         disabled={!isLoggedIn}
//                     >
//                         Add Comment
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//             <Dialog open={deleteConfirmationOpen} onClose={() => setDeleteConfirmationOpen(false)}>
//                 <DialogTitle>Confirm Delete</DialogTitle>
//                 <DialogContent>
//                     <Typography variant="body1" gutterBottom>
//                         Are you sure you want to delete this comment?
//                     </Typography>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button variant="contained" onClick={() => setDeleteConfirmationOpen(false)} color="primary">
//                         Cancel
//                     </Button>
//                     <Button variant="contained" onClick={confirmDeleteComment} color="secondary">
//                         Delete
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//             <Dialog open={editCommentModalOpen} onClose={handleCloseEditCommentModal} fullWidth maxWidth="sm">
//                 <DialogTitle>Edit Comment</DialogTitle>
//                 <DialogContent>
//                     <TextField
//                         autoFocus
//                         multiline
//                         margin="dense"
//                         id="edited-comment"
//                         label="Edit Comment"
//                         type="text"
//                         fullWidth
//                         value={editedCommentContent} // Use editedCommentContent here
//                         onChange={(e) => setEditedCommentContent(e.target.value)}
//                         color="primary" // Set the color property to primary
//                     />
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleCloseEditCommentModal} color="primary">
//                         Cancel
//                     </Button>
//                     <Button onClick={handleEditSubmit} color="primary">
//                         Submit
//                     </Button>
//                 </DialogActions>
//             </Dialog>

//         </div>
//     );
// };

// export default Home;

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Fab, Snackbar, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Avatar, Grid, Paper, IconButton } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { likeBlog, checkLikedBlog, shareBlog, getLikesForBlog, bookmarkBlog } from '../Services/blogInteractions';
import { addComment, getAllCommentsForBlog as fetchAllCommentsForBlog, deleteComment, updateComment } from '../Services/commentService';
import { Link } from 'react-router-dom';
import '../assets/home.css';
import Pagination from '@mui/material/Pagination';
import { useAuth } from '../Components/AuthContext';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Home = () => {
    const { isLoggedIn, currentUser } = useAuth();
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
    const [commentInput, setCommentInput] = useState('');
    const [comments, setComments] = useState([]); // State to hold comments
    const [likedStatusMap, setLikedStatusMap] = useState({}); // State to store liked status for each blog
    const [commentModalOpen, setCommentModalOpen] = useState(false); // State to manage comment modal visibility
    const [currentBlogId, setCurrentBlogId] = useState(null); // State to hold the ID of the currently expanded blog
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false); // State to manage delete confirmation dialog
    const [commentToDelete, setCommentToDelete] = useState(null); // State to hold the ID of the comment to delete
    const [editCommentModalOpen, setEditCommentModalOpen] = useState(false);
    const [editedCommentContent, setEditedCommentContent] = useState('');
    const [commentToEdit, setCommentToEdit] = useState(null);

    const fetchCommentsForBlog = async (blogId) => {
        try {
            const response = await fetchAllCommentsForBlog(blogId);

            // if (!response.ok) {
            //     throw new Error('Failed to fetch comments for blog');
            // }
            const data = await response.json();
            console.log(data);
            setComments(data);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    useEffect(() => {
        if (expandedBlogId) {
            fetchCommentsForBlog(expandedBlogId);
        }
    }, [expandedBlogId]);

    // Function to handle comment submission
    const handleSubmitComment = async (blogId) => {
        try {
            // Check if user is logged in
            if (!isLoggedIn) {
                setDialogOpen(true); // Open dialog to prompt login
                return;
            }
            // Check if comment input is not empty
            if (commentInput.trim() === '') {
                // Optionally, show a message to the user indicating that the comment cannot be empty
                return;
            }
            console.log(blogId, { content: commentInput });
            // Call addComment function from CommentService to submit the comment
            const response = await addComment(blogId, { content: commentInput });
            const responseData = await response.json();
            // Optionally, clear the comment input field after submission
            setCommentInput('');
            // Set success message
            setSnackbarMessage(responseData.message);
            setSnackbarOpen(true);
            fetchCommentsForBlog(blogId);
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    };

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
            if (!response.ok) {
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
            //console.log(response);
            if (!response) {
                console.error('Failed to check liked status');
                return false;
            }
            const responseData = await response.json();
            console.log(responseData);
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
                    let liked = isLoggedIn ? await checkBlogLikedStatus(blog._id) : false;
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
    }, [isLoggedIn]);

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
            console.log(response);
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

    const handleBookmark = async (blogId) => {
        try {
            const response = await bookmarkBlog(blogId);
            if (!response) {
                setDialogOpen(true);
                return;
            }
            const responseData = await response.json();
            console.log(responseData);
            if (response.ok) {
                setSnackbarMessage(responseData.message);
                setSnackbarOpen(true);
            } else {
                setSnackbarMessage(responseData.message);
                setSnackbarOpen(true);
            }
        } catch (error) {
            console.error('Error bookmarking blog:', error);
        }
    };

    // Function to handle opening the comment modal and fetching comments for the selected blog
    const handleOpenCommentModal = async (blogId) => {
        setCurrentBlogId(blogId);
        // Check if user is logged in
        if (!isLoggedIn) {
            setDialogOpen(true);
            return;
        }
        // If user is logged in, proceed to open the comment modal
        setCommentModalOpen(true);
        await fetchCommentsForBlog(blogId); // Fetch comments for the selected blog
        // setCurrentBlogId(blogId);
        // setCommentModalOpen(true);
        // await fetchCommentsForBlog(blogId); // Fetch comments for the selected blog
    };

    // Function to handle closing the comment modal and resetting the current blog ID
    const handleCloseCommentModal = () => {
        setCommentModalOpen(false);
        setCurrentBlogId(null); // Reset the current blog ID
    };

    // Function to handle deleting a comment
    const handleDeleteComment = async (blogId, commentId) => {
        setDeleteConfirmationOpen(true);
        setCommentToDelete({ blogId, commentId });
    };

    // Function to confirm and delete a comment
    const confirmDeleteComment = async () => {
        const { blogId, commentId } = commentToDelete;
        try {
            const response = await deleteComment(blogId, commentId);
            const responseData = await response.json();
            await fetchCommentsForBlog(blogId);
            setSnackbarMessage(responseData.message);
            setSnackbarOpen(true);
        } catch (error) {
            console.error('Error deleting comment:', error);
        } finally {
            setDeleteConfirmationOpen(false);
            setCommentToDelete(null);
        }
    };


    // Function to handle opening the edit comment modal
    const handleEditComment = (blogId, commentId) => {
        const comment = comments.data.find(c => c._id === commentId);
        setCommentToEdit(comment);
        setEditedCommentContent(''); // Set to empty string initially
        setEditCommentModalOpen(true);
    };

    // Function to handle closing the edit comment modal
    const handleCloseEditCommentModal = () => {
        setEditCommentModalOpen(false);
        setCommentToEdit(null);
        setEditedCommentContent('');
    };

    // Function to handle editing and submitting the comment
    const handleEditSubmit = async () => {
        try {
            const { blogId, _id } = commentToEdit;
            const updatedCommentData = { content: editedCommentContent }; // Use editedCommentContent

            const response = await updateComment(blogId, _id, updatedCommentData);
            if (!response.ok) {
                throw new Error('Failed to update comment');
            }
            const responseData = await response.json();
            console.log(responseData);
            setSnackbarMessage(responseData.message);
            await fetchCommentsForBlog(blogId);
            setSnackbarOpen(true);
            handleCloseEditCommentModal();
        } catch (error) {
            console.error('Error updating comment:', error);
        }
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
                                <hr></hr>
                                <div className="blog-actions">
                                    <Fab aria-label="like" onClick={() => handleLike(blog._id)} style={{ marginRight: '8px' }} className={`icon-btn ${likedStatusMap[blog._id] === true ? 'liked' : ''}`}>
                                        <FavoriteIcon style={{ color: likedStatusMap[blog._id] === true ? 'red' : 'inherit' }} />
                                    </Fab>
                                    <Fab aria-label="share" onClick={() => handleShare(blog._id)} className="icon-btn" style={{ marginRight: '8px' }}>
                                        <ShareIcon />
                                    </Fab>
                                    <Fab aria-label="bookmark" onClick={() => handleBookmark(blog._id)} className="icon-btn" style={{ marginRight: '8px' }}>
                                        <BookmarkIcon />
                                    </Fab>
                                    {likesCountMap[blog._id] > 0 && <Typography variant="body2">{likesCountMap[blog._id]} Likes</Typography>}
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
                                        marginLeft: '700px',
                                        paddingLeft: '10px'
                                    }}
                                >
                                    {expandedBlogId === blog._id ? 'Show less' : 'Read more'}
                                </Button>
                            )}
                        </CardContent>
                        <Button onClick={() => handleOpenCommentModal(blog._id)}>View Comments</Button>

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
                style={{
                    marginTop: '20px',
                    marginBottom: '20px',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent white background
                    padding: '10px', // Add padding for better visibility
                    borderRadius: '10px', // Rounded corners
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' // Box shadow for depth
                }}
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
                        You need to log in to like, Share, Comment and bookmark a post.
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
            <Dialog open={commentModalOpen} onClose={handleCloseCommentModal} fullWidth maxWidth="md">
                <DialogTitle>Comments</DialogTitle>
                <DialogContent>
                    {/* Display comments */}
                    <div style={{ overflowY: 'auto', flex: 1 }}>
                        {Array.isArray(comments.data) && comments.data.length > 0 ? (
                            comments.data.map(comment => (
                                <Paper key={comment._id} style={{ padding: '10px', marginBottom: '10px' }}>
                                    <Grid container wrap="nowrap" spacing={2}>
                                        <Grid item>
                                            <Avatar alt={comment.userId.username} src={comment.userId.profilePicture} />
                                        </Grid>
                                        <Grid item xs>
                                            <Typography variant="subtitle1">{comment.userId.username}</Typography>
                                            <Typography variant="body2" color="textSecondary">{new Date(comment.createdAt).toLocaleString()}</Typography>
                                            <Typography variant="body1">{comment.content}</Typography>
                                        </Grid>
                                        {comment.userId._id === currentUser.id && (
                                            <Grid item>
                                                <IconButton onClick={() => handleEditComment(comment.blogId, comment._id)} className="edit-icon">
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton onClick={() => handleDeleteComment(comment.blogId, comment._id)} className="delete-icon">
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Grid>
                                        )}
                                    </Grid>
                                </Paper>
                            ))
                        ) : (
                            <Typography variant="body1">No comments found for this blog.</Typography>
                        )}
                    </div>
                    {/* Add comment section */}
                    <TextField
                        id={`comment-input-${currentBlogId}`}
                        label="Add Comment"
                        multiline
                        rows={4}
                        variant="outlined"
                        fullWidth
                        value={commentInput}
                        onChange={(e) => setCommentInput(e.target.value)}
                        style={{ marginTop: '20px' }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={handleCloseCommentModal} color="primary">
                        Close
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleSubmitComment(currentBlogId)}
                        disabled={!isLoggedIn}
                    >
                        Add Comment
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={deleteConfirmationOpen} onClose={() => setDeleteConfirmationOpen(false)}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <Typography variant="body1" gutterBottom>
                        Are you sure you want to delete this comment?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={() => setDeleteConfirmationOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={confirmDeleteComment} color="secondary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={editCommentModalOpen} onClose={handleCloseEditCommentModal} fullWidth maxWidth="sm">
                <DialogTitle>Edit Comment</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        multiline
                        margin="dense"
                        id="edited-comment"
                        label="Edit Comment"
                        type="text"
                        fullWidth
                        value={editedCommentContent} // Use editedCommentContent here
                        onChange={(e) => setEditedCommentContent(e.target.value)}
                        color="primary" // Set the color property to primary
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditCommentModal} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleEditSubmit} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
    );
};

export default Home;

