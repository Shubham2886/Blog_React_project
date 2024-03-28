// import React, { useState, useEffect } from 'react';
// import { getUserProfile } from '../Services/profileService';

// const UserProfile = () => {
//     const [profile, setProfile] = useState(null);
//     const [loading, setLoading] = useState(true);
//     useEffect(() => {
//         const fetchProfile = async () => {
//             try {
//                 const response = await getUserProfile();
//                 // Ensure the response is not undefined and has the expected structure
//                 if (response && response.status === 'success') {
//                     const userProfile = response.data; // Extract user profile from data property
//                     setProfile(userProfile);
//                 } else {
//                     console.error('Failed to get user profile:', response ? response.error : 'Response is undefined');
//                 }
//                 setLoading(false);
//             } catch (error) {
//                 console.error('Error fetching user profile:', error);
//                 setLoading(false);
//             }
//         };

//         fetchProfile();
//     }, []);



//     useEffect(() => {
//         console.log('Profile:', profile);
//     }, [profile]); // This effect logs the profile whenever it changes

//     return (
//         <div>
//             {loading ? (
//                 <p>Loading...</p>
//             ) : profile ? (
//                 <div className="user-profile">
//                     <h2>User Profile</h2>
//                     <p><strong>Username:</strong> {profile.username}</p>
//                     <p><strong>Email:</strong> {profile.email}</p>
//                 </div>
//             ) : (
//                 <p>No user profile found.</p>
//             )}
//         </div>
//     );
// };

// export default UserProfile;


// import React, { useState, useEffect } from 'react';
// import { getUserProfile, getUserBlogs } from '../Services/profileService';
// import { deleteBlog } from '../Services/blogService';
// import { Typography, CircularProgress, Grid, Card, CardContent, Button, Menu, MenuItem } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import EditIcon from '@mui/icons-material/Edit';


// const UserProfile = () => {
//     const [profile, setProfile] = useState(null);
//     const [userBlogs, setUserBlogs] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [anchorElMap, setAnchorElMap] = useState({});

//     useEffect(() => {
//         const fetchProfile = async () => {
//             try {
//                 const response = await getUserProfile();
//                 if (response && response.status === 'success') {
//                     setProfile(response.data);
//                 } else {
//                     console.error('Failed to get user profile:', response ? response.error : 'Response is undefined');
//                 }
//             } catch (error) {
//                 console.error('Error fetching user profile:', error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchProfile();
//     }, []);

//     useEffect(() => {
//         const fetchUserBlogs = async () => {
//             try {
//                 const response = await getUserBlogs();
//                 if (response && response.status === 'success') {
//                     setUserBlogs(response.data);
//                     // Initialize anchorElMap with an anchorEl for each blog
//                     const initialAnchorElMap = response.data.reduce((acc, blog) => {
//                         acc[blog._id] = null;
//                         return acc;
//                     }, {});
//                     setAnchorElMap(initialAnchorElMap);
//                 } else {
//                     console.error('Failed to get user blogs:', response ? response.error : 'Response is undefined');
//                 }
//             } catch (error) {
//                 console.error('Error fetching user blogs:', error);
//             }
//         };
//         fetchUserBlogs();
//     }, []);

//     const handleMenuOpen = (event, blogId) => {
//         setAnchorElMap(prevState => ({
//             ...prevState,
//             [blogId]: event.currentTarget
//         }));
//     };

//     const handleMenuClose = (blogId) => {
//         setAnchorElMap(prevState => ({
//             ...prevState,
//             [blogId]: null
//         }));
//     };

//     const handleDeleteBlog = async (blogId) => {
//         console.log("Deleting blog with ID:", blogId);
//         try {
//             await deleteBlog(blogId);
//             setUserBlogs(prevState => prevState.filter(blog => blog._id !== blogId));
//         } catch (error) {
//             console.error('Error deleting blog:', error);
//         }
//         handleMenuClose(blogId);
//     };

//     return (
//         <div>
//             {loading ? (
//                 <CircularProgress />
//             ) : profile ? (
//                 <div className="user-profile">
//                     <Typography variant="h2">User Profile</Typography>
//                     <Typography variant="h6"><strong>Username:</strong> {profile.username}</Typography>
//                     <Typography variant="h6"><strong>Email:</strong> {profile.email}</Typography>
//                     <Typography variant="h4" mt={4}>Your Blogs:</Typography>
//                     <Grid container spacing={2} mt={2}>
//                         {userBlogs.map(blog => (
//                             <Grid item key={blog._id} xs={12} sm={6} md={4}>
//                                 <Card>
//                                     <CardContent>
//                                         <Typography variant="h5">{blog.blogtitle}</Typography>
//                                         <img src={`http://localhost:3000/${blog.blogimage.replace(/\\/g, '/')}`} alt={blog.blogtitle} style={{ width: '100%', height: 'auto' }} />
//                                         <Typography variant="body1">{blog.blogcontent}</Typography>
//                                         <Typography variant="body2">{blog.blogcategory}</Typography>
//                                         <Button
//                                             aria-label="more"
//                                             aria-controls={`long-menu-${blog._id}`}
//                                             aria-haspopup="true"
//                                             onClick={(event) => handleMenuOpen(event, blog._id)}
//                                             sx={{
//                                                 padding: '4px',
//                                                 paddingLeft: '340px',
//                                             }}
//                                         >
//                                             <MoreVertIcon />
//                                         </Button>
//                                         <Menu
//                                             id={`long-menu-${blog._id}`}
//                                             anchorEl={anchorElMap[blog._id]}
//                                             keepMounted
//                                             open={Boolean(anchorElMap[blog._id])}
//                                             onClose={() => handleMenuClose(blog._id)}
//                                         >
//                                             <MenuItem onClick={() => {/* Handle edit blog */ }}>
//                                                 <EditIcon fontSize="small" /> Edit
//                                             </MenuItem>
//                                             <MenuItem onClick={() => handleDeleteBlog(blog._id)}>
//                                                 <DeleteIcon fontSize="small" /> Delete
//                                             </MenuItem>
//                                         </Menu>
//                                     </CardContent>
//                                 </Card>
//                             </Grid>
//                         ))}
//                     </Grid>
//                 </div>
//             ) : (
//                 <Typography variant="body1">No user profile found.</Typography>
//             )}
//         </div>
//     );
// };

// export default UserProfile;

// import React, { useState, useEffect } from 'react';
// import { getUserProfile, getUserBlogs } from '../Services/profileService';
// import { deleteBlog } from '../Services/blogService';
// import { Typography, CircularProgress, Grid, Card, CardContent, Button, Menu, MenuItem } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import EditIcon from '@mui/icons-material/Edit';


// const UserProfile = () => {
//     const [profile, setProfile] = useState(null);
//     const [userBlogs, setUserBlogs] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [anchorElMap, setAnchorElMap] = useState({});

//     useEffect(() => {
//         const fetchProfile = async () => {
//             try {
//                 const response = await getUserProfile();
//                 if (response && response.status === 'success') {
//                     setProfile(response.data);
//                 } else {
//                     console.error('Failed to get user profile:', response ? response.error : 'Response is undefined');
//                 }
//             } catch (error) {
//                 console.error('Error fetching user profile:', error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchProfile();
//     }, []);

//     useEffect(() => {
//         const fetchUserBlogs = async () => {
//             try {
//                 const response = await getUserBlogs();
//                 if (response && response.status === 'success') {
//                     setUserBlogs(response.data);
//                     // Initialize anchorElMap with an anchorEl for each blog
//                     const initialAnchorElMap = response.data.reduce((acc, blog) => {
//                         acc[blog._id] = null;
//                         return acc;
//                     }, {});
//                     setAnchorElMap(initialAnchorElMap);
//                 } else {
//                     console.error('Failed to get user blogs:', response ? response.error : 'Response is undefined');
//                 }
//             } catch (error) {
//                 console.error('Error fetching user blogs:', error);
//             }
//         };
//         fetchUserBlogs();
//     }, []);

//     const handleMenuOpen = (event, blogId) => {
//         setAnchorElMap(prevState => ({
//             ...prevState,
//             [blogId]: event.currentTarget
//         }));
//     };

//     const handleMenuClose = (blogId) => {
//         setAnchorElMap(prevState => ({
//             ...prevState,
//             [blogId]: null
//         }));
//     };

//     const handleDeleteBlog = async (blogId) => {
//         console.log("Deleting blog with ID:", blogId);
//         try {
//             await deleteBlog(blogId);
//             setUserBlogs(prevState => prevState.filter(blog => blog._id !== blogId));
//         } catch (error) {
//             console.error('Error deleting blog:', error);
//         }
//         handleMenuClose(blogId);
//     };

//     return (
//         <div>
//             {loading ? (
//                 <CircularProgress />
//             ) : profile ? (
//                 <div className="user-profile">
//                     <Typography variant="h2">User Profile</Typography>
//                     <Typography variant="h6"><strong>Username:</strong> {profile.username}</Typography>
//                     <Typography variant="h6"><strong>Email:</strong> {profile.email}</Typography>
//                     <Typography variant="h4" mt={4}>Your Blogs:</Typography>
//                     <Grid container spacing={2} mt={2}>
//                         {userBlogs.map(blog => (
//                             <Grid item key={blog._id} xs={12} sm={6} md={4}>
//                                 <Card>
//                                     <CardContent>
//                                         <Typography variant="h5">{blog.blogtitle}</Typography>
//                                         <img src={`http://localhost:3000/${blog.blogimage.replace(/\\/g, '/')}`} alt={blog.blogtitle} style={{ width: '100%', height: 'auto' }} />
//                                         <Typography variant="body1">{blog.blogcontent}</Typography>
//                                         <Typography variant="body2">{blog.blogcategory}</Typography>
//                                         <Button
//                                             aria-label="more"
//                                             aria-controls={`long-menu-${blog._id}`}
//                                             aria-haspopup="true"
//                                             onClick={(event) => handleMenuOpen(event, blog._id)}
//                                             sx={{
//                                                 padding: '4px',
//                                                 paddingLeft: '340px',
//                                             }}
//                                         >
//                                             <MoreVertIcon />
//                                         </Button>
//                                         <Menu
//                                             id={`long-menu-${blog._id}`}
//                                             anchorEl={anchorElMap[blog._id]}
//                                             keepMounted
//                                             open={Boolean(anchorElMap[blog._id])}
//                                             onClose={() => handleMenuClose(blog._id)}
//                                         >
//                                             <MenuItem onClick={() => {/* Handle edit blog */ }}>
//                                                 <EditIcon fontSize="small" /> Edit
//                                             </MenuItem>
//                                             <MenuItem onClick={() => handleDeleteBlog(blog._id)}>
//                                                 <DeleteIcon fontSize="small" /> Delete
//                                             </MenuItem>
//                                         </Menu>
//                                     </CardContent>
//                                 </Card>
//                             </Grid>
//                         ))}
//                     </Grid>
//                 </div>
//             ) : (
//                 <Typography variant="body1">No user profile found.</Typography>
//             )}
//         </div>
//     );
// };

// export default UserProfile;


import React, { useState, useEffect } from 'react';
import { getUserProfile, getUserBlogs } from '../Services/profileService';
import { deleteBlog } from '../Services/blogService';
import { Typography, CircularProgress, Card, CardContent, Button, Menu, MenuItem, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';

const UserProfile = () => {
    const [profile, setProfile] = useState(null);
    const [userBlogs, setUserBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [anchorElMap, setAnchorElMap] = useState({});
    const [expandedBlogId, setExpandedBlogId] = useState(null);
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
    const [blogToDelete, setBlogToDelete] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false); // Updated
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await getUserProfile();
                if (response && response.status === 'success') {
                    setProfile(response.data);
                } else {
                    console.error('Failed to get user profile:', response ? response.error : 'Response is undefined');
                }
            } catch (error) {
                console.error('Error fetching user profile:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    useEffect(() => {
        const fetchUserBlogs = async () => {
            try {
                const response = await getUserBlogs();
                if (response && response.status === 'success') {
                    setUserBlogs(response.data);
                    // Initialize anchorElMap with an anchorEl for each blog
                    const initialAnchorElMap = response.data.reduce((acc, blog) => {
                        acc[blog._id] = null;
                        return acc;
                    }, {});
                    setAnchorElMap(initialAnchorElMap);
                } else {
                    console.error('Failed to get user blogs:', response ? response.error : 'Response is undefined');
                }
            } catch (error) {
                console.error('Error fetching user blogs:', error);
            }
        };
        fetchUserBlogs();
    }, []);

    const handleMenuOpen = (event, blogId) => {
        setAnchorElMap(prevState => ({
            ...prevState,
            [blogId]: event.currentTarget
        }));
    };

    const handleMenuClose = (blogId) => {
        setAnchorElMap(prevState => ({
            ...prevState,
            [blogId]: null
        }));
    };

    const handleDeleteConfirmationOpen = (blogId) => {
        setBlogToDelete(blogId);
        setDeleteConfirmationOpen(true);
    };

    const handleDeleteConfirmationClose = () => {
        setDeleteConfirmationOpen(false);
        setBlogToDelete(null);
    };

    const handleDeleteBlog = async () => {
        if (blogToDelete) {
            console.log("Deleting blog with ID:", blogToDelete);
            try {
                await deleteBlog(blogToDelete);
                setUserBlogs(prevState => prevState.filter(blog => blog._id !== blogToDelete));
                setSnackbarSeverity('success');
                setSnackbarMessage('Blog deleted successfully!');
                setSnackbarOpen(true); // Open the Snackbar for successful deletion
                setTimeout(() => {
                    setSnackbarOpen(false); // Close the Snackbar after 3 seconds
                }, 3000);
            } catch (error) {
                console.error('Error deleting blog:', error);
                setSnackbarSeverity('error');
                setSnackbarMessage('Failed to delete blog. Please try again later.');
                setSnackbarOpen(true);
            }
            handleMenuClose(blogToDelete);
            handleDeleteConfirmationClose();
        }
    };

    const handleExpandContent = (blogId) => {
        setExpandedBlogId(blogId === expandedBlogId ? null : blogId);
    };

    return (
        <div>
            {loading ? (
                <CircularProgress />
            ) : profile ? (
                <div className="user-profile">
                    <Typography variant="h2">User Profile</Typography>
                    <Typography variant="h6"><strong>Username:</strong> {profile.username}</Typography>
                    <Typography variant="h6"><strong>Email:</strong> {profile.email}</Typography>
                    <Typography variant="h4" mt={4}>Your Blogs:</Typography>
                    <div style={{ marginTop: '20px', marginLeft: 'auto', marginRight: 'auto', maxWidth: '800px' }}>
                        {userBlogs.map(blog => (
                            <Card key={blog._id} style={{ marginBottom: '20px' }}>
                                <CardContent>
                                    <Typography variant="h5" style={{ fontWeight: 'bold', color: '#333', marginBottom: '10px' }}>
                                        {blog.blogtitle}
                                    </Typography>
                                    <Typography variant="body2" style={{ backgroundColor: '#f0f0f0', padding: '5px', borderRadius: '3px', marginBottom: '10px', display: 'inline-block' }}>
                                        {blog.blogcategory}
                                    </Typography>
                                    <img src={`http://localhost:3000/${blog.blogimage.replace(/\\/g, '/')}`} alt={blog.blogtitle} style={{ width: '100%', height: 'auto' }} />
                                    <Typography variant="body1" style={{ fontFamily: 'inherit', fontSize: 'inherit', lineHeight: 'inherit', maxHeight: expandedBlogId === blog._id ? 'none' : '100px', overflow: 'hidden' }}>
                                        {blog.blogcontent}
                                    </Typography>
                                    {expandedBlogId !== blog._id && (
                                        <Button onClick={() => handleExpandContent(blog._id)} variant="contained" color="primary" size="small" style={{ marginTop: '10px' }}>
                                            Read more
                                        </Button>
                                    )}
                                    <Button
                                        aria-label="more"
                                        aria-controls={`long-menu-${blog._id}`}
                                        aria-haspopup="true"
                                        onClick={(event) => handleMenuOpen(event, blog._id)}
                                        sx={{
                                            padding: '4px',
                                            paddingLeft: '700px',
                                        }}
                                    >
                                        <MoreVertIcon />
                                    </Button>
                                    <Menu
                                        id={`long-menu-${blog._id}`}
                                        anchorEl={anchorElMap[blog._id]}
                                        keepMounted
                                        open={Boolean(anchorElMap[blog._id])}
                                        onClose={() => handleMenuClose(blog._id)}
                                    >
                                        <MenuItem onClick={() => {/* Handle edit blog */ }}>
                                            <EditIcon fontSize="small" /> Edit
                                        </MenuItem>
                                        <MenuItem onClick={() => handleDeleteConfirmationOpen(blog._id)}>
                                            <DeleteIcon fontSize="small" /> Delete
                                        </MenuItem>
                                    </Menu>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            ) : (
                <Typography variant="body1">No user profile found.</Typography>
            )}
            <Dialog
                open={deleteConfirmationOpen}
                onClose={handleDeleteConfirmationClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Confirmation"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this blog?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteConfirmationClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteBlog} color="primary" autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
            {/* Snackbar Component */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)} // Close Snackbar on click-away
                message={snackbarMessage}
                severity={snackbarSeverity}
            />
        </div>
    );
};

export default UserProfile;
