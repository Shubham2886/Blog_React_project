import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBlog } from '../Services/blogService';
import { Snackbar, Alert as MuiAlert } from '@mui/material';
import { TextField, Button, Typography, Grid, Container, Paper, Select, MenuItem } from '@mui/material'; // Import Material UI components
import { useAuth } from '../Components/AuthContext';

const AddBlog = () => {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();
    const [blogData, setBlogData] = useState({
        blogtitle: '',
        blogcontent: '',
        blogcategory: '',
        blogimage: null
    });
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
        }
    }, [isLoggedIn, navigate]);

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
        <Container maxWidth="md" sx={{ mt: 4 }}> {/* Material UI Container component */}
            <Typography variant="h4" align="center" gutterBottom>Add New Blog</Typography> {/* Material UI Typography component */}
            <Paper elevation={3} sx={{ padding: 3, backgroundColor: '#f5f5f5' }}> {/* Material UI Paper component */}
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', fontSize: 16 }}>Title</Typography>
                            <TextField
                                fullWidth
                                multiline
                                id="blogtitle"
                                name="blogtitle"
                                value={blogData.blogtitle}
                                onChange={handleChange}
                                InputLabelProps={{ shrink: true }} // Adjusting InputLabelProps
                            />
                        </Grid>
                        <Grid item xs={12} sx={{ mt: 2 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', fontSize: 16 }}>Content</Typography>
                            <TextField
                                fullWidth
                                multiline
                                rows={6}
                                id="blogcontent"
                                name="blogcontent"
                                value={blogData.blogcontent}
                                onChange={handleChange}
                                InputLabelProps={{ shrink: true }} // Adjusting InputLabelProps
                            />
                        </Grid>
                        <Grid item xs={12} sx={{ mt: 2 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', fontSize: 16 }}>Category</Typography>
                            <Select
                                fullWidth
                                id="blogcategory"
                                name="blogcategory"
                                value={blogData.blogcategory}
                                onChange={handleChange}
                                displayEmpty
                                InputLabelProps={{ shrink: true }}
                            >
                                <MenuItem value="" disabled>
                                    Select category
                                </MenuItem>
                                <MenuItem value="Travel">Travel</MenuItem>
                                <MenuItem value="Spirituality">Spirituality</MenuItem>
                                <MenuItem value="Mythology">Mythology</MenuItem>
                                <MenuItem value="Food">Food and Cooking</MenuItem>
                                <MenuItem value="Lifestyle">Lifestyle</MenuItem>
                                <MenuItem value="Technology">Technology</MenuItem>
                                <MenuItem value="Parenting">Parenting</MenuItem>
                                <MenuItem value="Finance">Finance and Money Management</MenuItem>
                                <MenuItem value="Health">Health and Wellness</MenuItem>
                                <MenuItem value="DIY">DIY and Crafts</MenuItem>
                                <MenuItem value="Entertainment">Entertainment</MenuItem>
                                <MenuItem value="PersonalFinance">Personal Finance</MenuItem>
                                <MenuItem value="Business">Business and Entrepreneurship</MenuItem>
                                <MenuItem value="Photography">Photography</MenuItem>
                                <MenuItem value="Gaming">Gaming</MenuItem>
                                <MenuItem value="Home">Home and Garden</MenuItem>
                                <MenuItem value="Education">Education</MenuItem>
                                <MenuItem value="Politics">Politics and Current Events</MenuItem>
                                <MenuItem value="Relationships">Relationships</MenuItem>
                                <MenuItem value="Sports">Sports</MenuItem>
                                <MenuItem value="Environmentalism">Environmentalism and Sustainability</MenuItem>
                                <MenuItem value="Writing">Writing and Blogging</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={12} sx={{ mt: 2 }}>
                            <input
                                accept="image/*"
                                id="blogimage"
                                name="blogimage"
                                type="file"
                                style={{ display: 'none' }}
                                onChange={handleChange}
                            />
                            <label htmlFor="blogimage">
                                <Button variant="contained" component="span">
                                    Upload Image
                                </Button>
                            </label>
                            {blogData.blogimage && (
                                <Typography variant="body1" sx={{ fontSize: 14, fontWeight: 'bold', marginTop: 2 }}>
                                    {blogData.blogimage.name} {/* Displaying the selected file name */}
                                </Typography>
                            )}
                        </Grid>
                        <Grid item xs={12} sx={{ mt: 2 }}>
                            <Button type="submit" variant="contained" color="primary">
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>

            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Adjust anchor origin for mobile devices
            >
                <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity={snackbarSeverity}>
                    {snackbarMessage}
                </MuiAlert>
            </Snackbar>
        </Container>
    );
};

export default AddBlog;
