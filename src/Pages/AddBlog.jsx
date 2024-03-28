import React, { useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBlog } from '../Services/blogService';
import { Snackbar, Alert as MuiAlert } from '@mui/material';

import '../assets/addblog.css';

const AddBlog = () => {
    const [blogData, setBlogData] = useState({
        blogtitle: '',
        blogcontent: '',
        blogcategory: '',
        blogimage: null
    });

    const navigate = useNavigate();

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    // useEffect(() => {
    //     const userToken = localStorage.getItem("token");
    //     if (!userToken) {
    //       navigate("/login");
    //     }
    //   }, [navigate]);
    
    const handleChange = (e) => {
        if (e.target.name === 'blogimage') {
            const file = e.target.files[0];
            console.log('Selected file:', file); // Log the selected file
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
    
            const formData = new FormData();
            formData.append('blogtitle', blogData.blogtitle);
            formData.append('blogcontent', blogData.blogcontent);
            formData.append('blogcategory', blogData.blogcategory);
    
            // Check if a file is selected
            if (blogData.blogimage) {
                formData.append('blogimage', blogData.blogimage);
                console.log('File appended to FormData:', blogData.blogimage.name);
            } else {
                console.log('No file selected');
                return; // Or handle accordingly
            }
    
            // Log FormData entries to inspect
            for (var pair of formData.entries()) {
                console.log(pair[0]+ ', ' + pair[1]); 
            }
    
            await createBlog(formData);
    
            setOpenSnackbar(true); // Open the Snackbar for successful login
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
            setSnackbarSeverity('error');
            setSnackbarMessage('Failed to create blog. Please try again later.');
            setOpenSnackbar(true);
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

