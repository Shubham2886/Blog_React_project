import React, { useState, useEffect } from 'react';
import { getBookmarkBlog } from '../Services/blogInteractions';
import { CircularProgress, Card, CardContent, Typography } from '@mui/material';

const BookmarkBlog = () => {
    const [bookmarkedBlogs, setBookmarkedBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookmarkedBlogs = async () => {
            try {
                const response = await getBookmarkBlog();
                //console.log(response); // Log the response to verify it's not undefined
                if (response && response.status === 'success') {
                    setBookmarkedBlogs(response.bookmarkedBlogs);
                    //console.log(response.bookmarkedBlogs); // Log the bookmarked blogs to verify
                } else {
                    console.error('Failed to get bookmarked blogs:', response ? response.error : 'Response is undefined');
                }
            } catch (error) {
                console.error('Error fetching bookmarked blogs:', error);
            } finally {
                setLoading(false);
            }
        };        
        fetchBookmarkedBlogs();
    }, []);

    return (
        <div style={{ marginTop: '20px', marginLeft: 'auto', marginRight: 'auto', maxWidth: '800px' }}>
            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <CircularProgress />
                </div>
            ) : bookmarkedBlogs.length === 0 ? (
                <Typography variant="h4" style={{ marginBottom: '20px' }}>
                    No bookmarked blogs available
                </Typography>
            ) : (
                bookmarkedBlogs.map(blog => (
                    <Card key={blog._id} style={{ marginBottom: '20px' }}>
                        <CardContent style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="h5" style={{ fontWeight: 'bold', color: '#333', marginBottom: '10px' }}>
                                {blog.blogtitle}
                            </Typography>
                        </CardContent>
                        <CardContent>
                            <Typography
                                variant="subtitle1"
                                className="blog-category"
                                style={{ marginBottom: '8px', color: '#ff5722', fontWeight: 'bold' }}
                            >
                                Category: {blog.blogcategory}
                            </Typography>
                            <hr></hr>
                            <img src={blog.blogimage} alt={blog.blogtitle} style={{ width: '100%', height: 'auto' }} />
                            <Typography variant="body1" style={{ fontFamily: 'inherit', fontSize: 'inherit', lineHeight: 'inherit' }}>
                                {blog.blogcontent}
                            </Typography>
                        </CardContent>
                    </Card>
                ))                
            )}
        </div>
    );
};

export default BookmarkBlog;
