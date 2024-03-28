import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBlog } from '../Services/blogService';
import { Snackbar, Alert as MuiAlert } from '@mui/material';

import '../assets/addblog.css';

const AddBlog = () => {
    const navigate = useNavigate();
    const [blogData, setBlogData] = useState({
        blogtitle: '',
        blogcontent: '',
        blogcategory: '',
        blogimage: null
    });
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const handleChange = (e) => {
        if (e.target.name === 'blogimage') {
            const file = e.target.files[0];
            setBlogData(prevState => ({
                ...prevState,
                blogimage: file
            }));
        } else {
            setBlogData(prevState => ({
                ...prevState,
                [e.target.name]: e.target.value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setOpenSnackbar(true);
                setSnackbarSeverity('error');
                setSnackbarMessage('Please login to create a blog.');
                setTimeout(() => {
                    setOpenSnackbar(false);
                    navigate('/login');
                }, 3000);
                return;
            }

            // Validation for missing fields
            if (!blogData.blogtitle || !blogData.blogcontent || !blogData.blogcategory || !blogData.blogimage) {
                setOpenSnackbar(true);
                setSnackbarSeverity('error');
                setSnackbarMessage('Please fill in all fields.');
                return;
            }
            

            // Validation for title length
            if (blogData.blogtitle.length > 150) {
                setOpenSnackbar(true);
                setSnackbarSeverity('error');
                setSnackbarMessage('Title length should not exceed 150 characters.');
                return;
            }
            console.log(blogData.blogcontent.length)
            if (blogData.blogcontent.length > 5000) {
                setOpenSnackbar(true);
                setSnackbarSeverity('error');
                setSnackbarMessage('Blog content length should not exceed 5000 characters.');
                return;
            }
            if (blogData.blogimage.size > 2 * 1024 * 1024 || !['image/png', 'image/jpeg', 'image/jpg'].includes(blogData.blogimage.type)) {
                setOpenSnackbar(true);
                setSnackbarSeverity('error');
                setSnackbarMessage('Blog image should be in PNG, JPEG, or JPG format and should not exceed 2MB.');
                return;
            }

            const formData = new FormData();
            formData.append('blogtitle', blogData.blogtitle);
            formData.append('blogcontent', blogData.blogcontent);
            formData.append('blogcategory', blogData.blogcategory);
            formData.append('blogimage', blogData.blogimage);

            await createBlog(formData);

            setOpenSnackbar(true); // Open the Snackbar for successful blog creation
            setTimeout(() => {
                setOpenSnackbar(false); // Close the Snackbar after 3 seconds
                navigate('/');
            }, 3000);
            setSnackbarSeverity('success');
            setSnackbarMessage('Blog created successfully!');

            // Reset form fields after successful submission
            setBlogData({
                blogtitle: '',
                blogcontent: '',
                blogcategory: '',
                blogimage: null
            });
        } catch (error) {
            console.error('Error creating blog:', error);
            setOpenSnackbar(true);
            setSnackbarSeverity('error');
            setSnackbarMessage('Failed to create blog. Please try again later.');
        }
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    return (
        <div className="container">
            <h1>Add New Blog</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="blogtitle">Title:</label>
                    <input type="text" id="blogtitle" name="blogtitle" value={blogData.blogtitle} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="blogcontent">Content:</label>
                    <textarea id="blogcontent" name="blogcontent" value={blogData.blogcontent} onChange={handleChange}></textarea>
                </div>
                <div>
                    <label htmlFor="blogcategory">Category:</label>
                    <input type="text" id="blogcategory" name="blogcategory" value={blogData.blogcategory} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="blogimage">Image:</label>
                    <input type="file" id="blogimage" name="blogimage" accept="image/*" onChange={handleChange} />
                </div>
                <button type="submit">Submit</button>
            </form>

            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity={snackbarSeverity}>
                    {snackbarMessage}
                </MuiAlert>
            </Snackbar>
        </div>
    );
};

export default AddBlog;
