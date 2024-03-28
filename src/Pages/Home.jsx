import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Grid } from "@mui/material";
import '../assets/home.css'; // Import the CSS file for styling

const Home = () => {
    const [blogs, setBlogs] = useState([]);

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

    return (
        <div className="container">
            <h1>Welcome to My Blog!</h1>
            <Grid container spacing={3}>
                {blogs.map(blog => (
                    <Grid item xs={12} sm={6} md={4} key={blog._id}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="140"
                                image={`http://localhost:3000/${blog.blogimage.replace(/\\/g, '/')}`}
                                alt="Blog Image"
                            />
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    {blog.blogtitle}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {blog.blogcontent}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Category: {blog.blogcategory}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default Home;
