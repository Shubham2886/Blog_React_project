// import React, { useEffect, useState } from 'react';
// import { Card, CardContent, CardMedia, Typography, Grid } from "@mui/material";
// import '../assets/home.css'; // Import the CSS file for styling

// const Home = () => {
//     const [blogs, setBlogs] = useState([]);

//     const fetchBlogs = async () => {
//         try {
//             const response = await fetch('http://localhost:3000/api/blogs/getAllBlogs?page=1&limit=10');
//             if (!response.ok) {
//                 throw new Error('Failed to fetch blogs');
//             }
//             const data = await response.json();
//             setBlogs(data.blogs);
//         } catch (error) {
//             console.error('Error fetching blogs:', error);
//         }
//     };

//     useEffect(() => {
//         fetchBlogs();
//     }, []);

//     return (
//         <div className="container">
//             <h1>Welcome to My Blog!</h1>
//             <Grid container spacing={3}>
//                 {blogs.map(blog => (
//                     <Grid item xs={12} sm={6} md={4} key={blog._id}>
//                         <Card>
//                             <CardMedia
//                                 component="img"
//                                 height="140"
//                                 image={`http://localhost:3000/${blog.blogimage.replace(/\\/g, '/')}`}
//                                 alt="Blog Image"
//                             />
//                             <CardContent>
//                                 <Typography variant="h5" component="div">
//                                     {blog.blogtitle}
//                                 </Typography>
//                                 <Typography variant="body2" color="text.secondary">
//                                     {blog.blogcontent}
//                                 </Typography>
//                                 <Typography variant="body2" color="text.secondary">
//                                     Category: {blog.blogcategory}
//                                 </Typography>
//                             </CardContent>
//                         </Card>
//                     </Grid>
//                 ))}
//             </Grid>
//         </div>
//     );
// };

// export default Home;

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from "@mui/material";
import '../assets/home.css'; // Import the CSS file for styling

const Home = () => {
    const [blogs, setBlogs] = useState([]);
    const [expandedBlogId, setExpandedBlogId] = useState(null);

    const fetchBlogs = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/blogs/getAllBlogs?page=1&limit=10');
            if (!response.ok) {
                throw new Error('Failed to fetch blogs');
            }
            const data = await response.json();
            setBlogs(data.blogs);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const handleExpandContent = (blogId) => {
        setExpandedBlogId(blogId === expandedBlogId ? null : blogId);
    };

    return (
        <div className="container">
            <h1>Welcome to My Blog!</h1>
            <div style={{ marginTop: '20px', marginLeft: 'auto', marginRight: 'auto', maxWidth: '800px' }}>
                {blogs.map(blog => (
                    <Card key={blog._id} className="blog-card" style={{ marginBottom: '20px' }}>
                        <CardContent>
                            <Typography variant="h5" style={{ fontWeight: 'bold', color: '#333', marginBottom: '10px' }}>
                                {blog.blogtitle}
                            </Typography>
                            <Typography variant="body2" style={{ backgroundColor: '#f0f0f0', padding: '5px', borderRadius: '3px', marginBottom: '10px', display: 'inline-block' }}>
                                {blog.blogcategory}
                            </Typography>
                            <img src={`http://localhost:3000/${blog.blogimage.replace(/\\/g, '/')}`} alt={blog.blogtitle} style={{ width: '100%', height: 'auto' }} />
                            <Typography variant="body2" style={{ fontFamily: 'inherit', fontSize: 'inherit', lineHeight: 'inherit'}}>
                                {expandedBlogId === blog._id ? blog.blogcontent : blog.blogcontent.substring(0, 100)} {/* Show full content if expanded */}
                            </Typography>
                            {blog.blogcontent.length > 100 && (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    style={{ marginTop: '10px' }}
                                    onClick={() => handleExpandContent(blog._id)}
                                >
                                    {expandedBlogId === blog._id ? 'Show less' : 'Read more'}
                                </Button>
                            )}

                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Home;
