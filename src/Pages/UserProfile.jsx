// import React, { useState, useEffect } from 'react';
// import { getUserProfile, getUserBlogs } from '../Services/profileService';
// import { deleteBlog, updateBlog } from '../Services/blogService';
// import { Typography, CircularProgress, Card, CardContent, Button, Menu, MenuItem, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, TextField } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import EditIcon from '@mui/icons-material/Edit';
// import { useAuth } from '../Components/AuthContext';
// import { useNavigate } from 'react-router-dom';

// const UserProfile = () => {
//     const { isLoggedIn } = useAuth();
//     const navigate = useNavigate();

//     const [profile, setProfile] = useState(null);
//     const [userBlogs, setUserBlogs] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [anchorElMap, setAnchorElMap] = useState({});
//     const [expandedBlogId, setExpandedBlogId] = useState(null);
//     const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
//     const [blogToDelete, setBlogToDelete] = useState(null);
//     const [snackbarOpen, setSnackbarOpen] = useState(false);
//     const [snackbarMessage, setSnackbarMessage] = useState('');
//     const [snackbarSeverity, setSnackbarSeverity] = useState('success');
//     const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
//     const [blogToUpdate, setBlogToUpdate] = useState(null);
//     const [updatedBlogTitle, setUpdatedBlogTitle] = useState('');
//     const [updatedBlogContent, setUpdatedBlogContent] = useState('');
//     const [updatedBlogCategory, setUpdatedBlogCategory] = useState('');
//     const [updatedBlogImage, setUpdatedBlogImage] = useState(null);

//     //console.log(isLoggedIn);

//     useEffect(() => {
//         if (!isLoggedIn) {
//             navigate('/login');
//         }
//     }, [isLoggedIn, navigate]);

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

//     const handleDeleteConfirmationOpen = (blogId) => {
//         setBlogToDelete(blogId);
//         setDeleteConfirmationOpen(true);
//     };

//     const handleDeleteConfirmationClose = () => {
//         setDeleteConfirmationOpen(false);
//         setBlogToDelete(null);
//     };

//     const handleDeleteBlog = async () => {
//         if (blogToDelete) {
//             console.log("Deleting blog with ID:", blogToDelete);
//             try {
//                 await deleteBlog(blogToDelete);
//                 setUserBlogs(prevState => prevState.filter(blog => blog._id !== blogToDelete));
//                 setSnackbarSeverity('success');
//                 setSnackbarMessage('Blog deleted successfully!');
//                 setSnackbarOpen(true);
//                 setTimeout(() => {
//                     setSnackbarOpen(false);
//                 }, 3000);
//             } catch (error) {
//                 console.error('Error deleting blog:', error);
//                 setSnackbarSeverity('error');
//                 setSnackbarMessage('Failed to delete blog. Please try again later.');
//                 setSnackbarOpen(true);
//             }
//             handleMenuClose(blogToDelete);
//             handleDeleteConfirmationClose();
//         }
//     };

//     const handleExpandContent = (blogId) => {
//         setExpandedBlogId(blogId === expandedBlogId ? null : blogId);
//     };

//     const handleEditBlog = (blog) => {
//         setBlogToUpdate(blog);
//         setUpdatedBlogTitle(blog.blogtitle);
//         setUpdatedBlogContent(blog.blogcontent);
//         setUpdatedBlogCategory(blog.blogcategory);
//         setUpdateDialogOpen(true);
//     };

//     const handleUpdateDialogClose = () => {
//         setUpdateDialogOpen(false);
//         setBlogToUpdate(null);
//         setUpdatedBlogTitle('');
//         setUpdatedBlogContent('');
//         setUpdatedBlogCategory('');
//     };

//     const handleUpdateBlog = async () => {
//         if (blogToUpdate) {
//             try {
//                 console.log("Updated blog data:", updatedBlogTitle, updatedBlogContent, updatedBlogCategory);

//                 const updatedBlogData = new FormData();
//                 updatedBlogData.append('blogtitle', updatedBlogTitle);
//                 updatedBlogData.append('blogcontent', updatedBlogContent);
//                 updatedBlogData.append('blogcategory', updatedBlogCategory);
//                 if (updatedBlogImage) {
//                     updatedBlogData.append('blogimage', updatedBlogImage);
//                 }

//                 console.log("FormData:", updatedBlogData);

//                 const response = await updateBlog(blogToUpdate._id, updatedBlogData);
//                 const responseData = await response.json();
//                 console.log(responseData);
//                 if (response.ok) { // Check if response is okay
//                     // Update userBlogs state with the updated blog data
//                     setUserBlogs(prevState => prevState.map(blog => {
//                         if (blog._id === blogToUpdate._id) {
//                             return { ...blog, blogtitle: updatedBlogTitle, blogcontent: updatedBlogContent, blogcategory: updatedBlogCategory, blogimage: updatedBlogImage ? updatedBlogImage.name : blog.blogimage };
//                         }
//                         return blog;
//                     }));

//                     setSnackbarSeverity('success');
//                     setSnackbarMessage('Blog updated successfully!');
//                     setSnackbarOpen(true);
//                     setTimeout(() => {
//                         setSnackbarOpen(false);
//                     }, 3000);

//                     handleUpdateDialogClose(); // Close the update dialog
//                 } else {
//                     throw new Error(responseData.message); // Throw error if response is not okay
//                 }
//             } catch (error) {
//                 console.error('Error updating blog:', error);
//                 setSnackbarSeverity('error');
//                 setSnackbarMessage('Failed to update blog. Please try again later.');
//                 setSnackbarOpen(true);
//             }
//         }
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
//                     <div style={{ marginTop: '20px', marginLeft: 'auto', marginRight: 'auto', maxWidth: '800px' }}>
//                         {userBlogs.map(blog => (
//                             <Card key={blog._id} style={{ marginBottom: '20px' }}>
//                                 <CardContent style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                                     <div>
//                                         <Typography variant="h5" style={{ fontWeight: 'bold', color: '#333', marginBottom: '10px' }}>
//                                             {blog.blogtitle}
//                                         </Typography>
//                                     </div>
//                                     {/* Three-dot icon */}
//                                     <div>
//                                         <Button
//                                             aria-label="more"
//                                             aria-controls={`long-menu-${blog._id}`}
//                                             aria-haspopup="true"
//                                             onClick={(event) => handleMenuOpen(event, blog._id)}
//                                         >
//                                             <MoreVertIcon />
//                                         </Button>
//                                     </div>
//                                 </CardContent>
//                                 <CardContent>
//                                     <Typography variant="body2" style={{ backgroundColor: '#f0f0f0', padding: '5px', borderRadius: '3px', marginBottom: '10px', display: 'inline-block' }}>
//                                         {blog.blogcategory}
//                                     </Typography>
//                                     <img src={`https://blog-node-project.vercel.app/${blog.blogimage.replace(/\\/g, '/')}`} alt={blog.blogtitle} style={{ width: '100%', height: 'auto' }} />
//                                     <Typography variant="body1" style={{ fontFamily: 'inherit', fontSize: 'inherit', lineHeight: 'inherit', maxHeight: expandedBlogId === blog._id ? 'none' : '100px', overflow: 'hidden' }}>
//                                         {blog.blogcontent}
//                                     </Typography>
//                                     {expandedBlogId !== blog._id && (
//                                         <Button onClick={() => handleExpandContent(blog._id)} variant="contained" color="primary" size="small" style={{ marginTop: '10px' }}>
//                                             Read more
//                                         </Button>
//                                     )}
//                                     <Menu
//                                         id={`long-menu-${blog._id}`}
//                                         anchorEl={anchorElMap[blog._id]}
//                                         keepMounted
//                                         open={Boolean(anchorElMap[blog._id])}
//                                         onClose={() => handleMenuClose(blog._id)}
//                                     >
//                                         <MenuItem onClick={() => handleEditBlog(blog)}>
//                                             <EditIcon fontSize="small" /> Edit
//                                         </MenuItem>
//                                         <MenuItem onClick={() => handleDeleteConfirmationOpen(blog._id)}>
//                                             <DeleteIcon fontSize="small" /> Delete
//                                         </MenuItem>
//                                     </Menu>
//                                 </CardContent>
//                             </Card>
//                         ))}
//                     </div>
//                 </div>
//             ) : (
//                 <Typography variant="body1">No user profile found.</Typography>
//             )}
//             <Dialog
//                 open={deleteConfirmationOpen}
//                 onClose={handleDeleteConfirmationClose}
//                 aria-labelledby="alert-dialog-title"
//                 aria-describedby="alert-dialog-description"
//             >
//                 <DialogTitle id="alert-dialog-title">{"Confirmation"}</DialogTitle>
//                 <DialogContent>
//                     <DialogContentText id="alert-dialog-description">
//                         Are you sure you want to delete this blog?
//                     </DialogContentText>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleDeleteConfirmationClose} color="primary">
//                         Cancel
//                     </Button>
//                     <Button onClick={handleDeleteBlog} color="primary" autoFocus>
//                         Confirm
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//             {/* Snackbar Component */}
//             <Snackbar
//                 open={snackbarOpen}
//                 autoHideDuration={3000}
//                 onClose={() => setSnackbarOpen(false)}
//                 message={snackbarMessage}
//                 severity={snackbarSeverity}
//             />

//             {/* Update Blog Dialog */}
//             <Dialog
//                 open={updateDialogOpen}
//                 onClose={handleUpdateDialogClose}
//                 aria-labelledby="update-dialog-title"
//                 aria-describedby="update-dialog-description"
//             >
//                 <DialogTitle id="update-dialog-title">Edit Blog</DialogTitle>
//                 <DialogContent>
//                     <TextField
//                         sx={{ mt: 2 }}
//                         fullWidth
//                         multiline
//                         id="updated-blog-title"
//                         label="Title"
//                         value={updatedBlogTitle}
//                         onChange={(e) => setUpdatedBlogTitle(e.target.value)}
//                     />
//                     <TextField
//                         sx={{ mt: 2 }}
//                         fullWidth
//                         multiline
//                         id="updated-blog-content"
//                         label="Content"
//                         value={updatedBlogContent}
//                         onChange={(e) => setUpdatedBlogContent(e.target.value)}
//                     />
//                     <TextField
//                         sx={{ mt: 2 }}
//                         fullWidth
//                         multiline
//                         id="updated-blog-category"
//                         label="Category"
//                         value={updatedBlogCategory}
//                         onChange={(e) => setUpdatedBlogCategory(e.target.value)}
//                     />
//                     <Typography sx={{ mt: 3 }} variant="h6">Update Image</Typography>
//                     {updatedBlogImage && (
//                         <img
//                             src={URL.createObjectURL(updatedBlogImage)} // Create URL for the selected image file
//                             alt="Updated Blog Image"
//                             style={{ maxWidth: '100%', marginTop: '8px' }}
//                         />
//                     )}
//                     <input
//                         type="file"
//                         id="updated-blog-image"
//                         onChange={(e) => setUpdatedBlogImage(e.target.files[0])}
//                         style={{ marginTop: '8px' }}
//                     />
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleUpdateDialogClose} color="primary">
//                         Cancel
//                     </Button>
//                     <Button onClick={handleUpdateBlog} color="primary" autoFocus>
//                         Update
//                     </Button>
//                 </DialogActions>
//             </Dialog>

//         </div>
//     );
// };

// export default UserProfile;


// import React, { useState, useEffect } from 'react';
// import { getUserProfile, getUserBlogs } from '../Services/profileService';
// import { deleteBlog, updateBlog } from '../Services/blogService';
// import { Typography, CircularProgress, Card, CardContent, Button, Menu, MenuItem, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, TextField } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import EditIcon from '@mui/icons-material/Edit';
// import { useAuth } from '../Components/AuthContext';
// import { useNavigate } from 'react-router-dom';
// import '../assets/userprofile.css';

// const UserProfile = () => {
//     const { isLoggedIn } = useAuth();
//     const navigate = useNavigate();

//     const [profile, setProfile] = useState(null);
//     const [userBlogs, setUserBlogs] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [anchorElMap, setAnchorElMap] = useState({});
//     const [expandedBlogId, setExpandedBlogId] = useState(null);
//     const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
//     const [blogToDelete, setBlogToDelete] = useState(null);
//     const [snackbarOpen, setSnackbarOpen] = useState(false);
//     const [snackbarMessage, setSnackbarMessage] = useState('');
//     const [snackbarSeverity, setSnackbarSeverity] = useState('success');
//     const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
//     const [blogToUpdate, setBlogToUpdate] = useState(null);
//     const [updatedBlogTitle, setUpdatedBlogTitle] = useState('');
//     const [updatedBlogContent, setUpdatedBlogContent] = useState('');
//     const [updatedBlogCategory, setUpdatedBlogCategory] = useState('');
//     const [updatedBlogImage, setUpdatedBlogImage] = useState(null);

//     //console.log(isLoggedIn);

//     useEffect(() => {
//         if (!isLoggedIn) {
//             navigate('/login');
//         }
//     }, [isLoggedIn, navigate]);

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

//     const handleDeleteConfirmationOpen = (blogId) => {
//         setBlogToDelete(blogId);
//         setDeleteConfirmationOpen(true);
//     };

//     const handleDeleteConfirmationClose = () => {
//         setDeleteConfirmationOpen(false);
//         setBlogToDelete(null);
//     };

//     const handleDeleteBlog = async () => {
//         if (blogToDelete) {
//             console.log("Deleting blog with ID:", blogToDelete);
//             try {
//                 await deleteBlog(blogToDelete);
//                 setUserBlogs(prevState => prevState.filter(blog => blog._id !== blogToDelete));
//                 setSnackbarSeverity('success');
//                 setSnackbarMessage('Blog deleted successfully!');
//                 setSnackbarOpen(true);
//                 setTimeout(() => {
//                     setSnackbarOpen(false);
//                 }, 3000);
//             } catch (error) {
//                 console.error('Error deleting blog:', error);
//                 setSnackbarSeverity('error');
//                 setSnackbarMessage('Failed to delete blog. Please try again later.');
//                 setSnackbarOpen(true);
//             }
//             handleMenuClose(blogToDelete);
//             handleDeleteConfirmationClose();
//         }
//     };

//     const handleExpandContent = (blogId) => {
//         setExpandedBlogId(blogId === expandedBlogId ? null : blogId);
//     };

//     const handleEditBlog = (blog) => {
//         setBlogToUpdate(blog);
//         setUpdatedBlogTitle(blog.blogtitle);
//         setUpdatedBlogContent(blog.blogcontent);
//         setUpdatedBlogCategory(blog.blogcategory);
//         setUpdateDialogOpen(true);
//     };

//     const handleUpdateDialogClose = () => {
//         setUpdateDialogOpen(false);
//         setBlogToUpdate(null);
//         setUpdatedBlogTitle('');
//         setUpdatedBlogContent('');
//         setUpdatedBlogCategory('');
//     };

//     const handleUpdateBlog = async () => {
//         if (blogToUpdate) {
//             try {
//                 console.log("Updated blog data:", updatedBlogTitle, updatedBlogContent, updatedBlogCategory);

//                 const updatedBlogData = new FormData();
//                 updatedBlogData.append('blogtitle', updatedBlogTitle);
//                 updatedBlogData.append('blogcontent', updatedBlogContent);
//                 updatedBlogData.append('blogcategory', updatedBlogCategory);
//                 if (updatedBlogImage) {
//                     updatedBlogData.append('blogimage', updatedBlogImage);
//                 }

//                 console.log("FormData:", updatedBlogData);

//                 const response = await updateBlog(blogToUpdate._id, updatedBlogData);
//                 const responseData = await response.json();
//                 console.log(responseData);
//                 if (response.ok) { // Check if response is okay
//                     // Update userBlogs state with the updated blog data
//                     setUserBlogs(prevState => prevState.map(blog => {
//                         if (blog._id === blogToUpdate._id) {
//                             return { ...blog, blogtitle: updatedBlogTitle, blogcontent: updatedBlogContent, blogcategory: updatedBlogCategory, blogimage: updatedBlogImage ? updatedBlogImage.name : blog.blogimage };
//                         }
//                         return blog;
//                     }));

//                     setSnackbarSeverity('success');
//                     setSnackbarMessage('Blog updated successfully!');
//                     setSnackbarOpen(true);
//                     setTimeout(() => {
//                         setSnackbarOpen(false);
//                     }, 3000);

//                     handleUpdateDialogClose(); // Close the update dialog
//                 } else {
//                     throw new Error(responseData.message); // Throw error if response is not okay
//                 }
//             } catch (error) {
//                 console.error('Error updating blog:', error);
//                 setSnackbarSeverity('error');
//                 setSnackbarMessage('Failed to update blog. Please try again later.');
//                 setSnackbarOpen(true);
//             }
//         }
//     };

//     return (
//         <div>
//             {loading ? (
//                 <CircularProgress />
//             ) : profile ? (
//                 <div className="user-profile"> {/* Apply the CSS class */}
//                     <Typography variant="h2" className="profile-heading">
//                         User Profile
//                     </Typography>
//                     <div className="profile-info">
//                         <Typography variant="h6">
//                             <strong>Username:</strong> {profile.username}
//                         </Typography>
//                     </div>
//                     <div className="profile-info">
//                         <Typography variant="h6">
//                             <strong>Email:</strong> {profile.email}
//                         </Typography>
//                     </div>
//                     <hr></hr>
//                     <Typography variant="h2" mt={4}>Your Blogs:</Typography>
//                     <div style={{ marginTop: '20px', marginLeft: 'auto', marginRight: 'auto', maxWidth: '800px' }}>
//                         {userBlogs.map(blog => (
//                             <Card key={blog._id} style={{ marginBottom: '20px' }}>
//                                 <CardContent style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                                     <div>
//                                         <Typography variant="h5" style={{ fontWeight: 'bold', color: '#333', marginBottom: '10px' }}>
//                                             {blog.blogtitle}
//                                         </Typography>
//                                     </div>
//                                     {/* Three-dot icon */}
//                                     <div>
//                                         <Button
//                                             aria-label="more"
//                                             aria-controls={`long-menu-${blog._id}`}
//                                             aria-haspopup="true"
//                                             onClick={(event) => handleMenuOpen(event, blog._id)}
//                                         >
//                                             <MoreVertIcon />
//                                         </Button>
//                                     </div>
//                                 </CardContent>
//                                 <CardContent>
//                                     <Typography
//                                         variant="subtitle1"
//                                         className="blog-category"
//                                         style={{ marginBottom: '8px', color: '#ff5722', fontWeight: 'bold' }}
//                                     >
//                                         Category: {blog.blogcategory}
//                                     </Typography>
//                                     <hr></hr>
//                                     <img src={`https://blog-node-project.vercel.app/${blog.blogimage.replace(/\\/g, '/')}`} alt={blog.blogtitle} style={{ width: '100%', height: 'auto' }} />
//                                     <Typography variant="body1" style={{ fontFamily: 'inherit', fontSize: 'inherit', lineHeight: 'inherit', maxHeight: expandedBlogId === blog._id ? 'none' : '100px', overflow: 'hidden' }}>
//                                         {blog.blogcontent}
//                                     </Typography>
//                                     {blog.blogcontent.length > 200 && expandedBlogId !== blog._id && (
//                                         <Button onClick={() => handleExpandContent(blog._id)} variant="contained" color="primary" size="small" style={{ marginTop: '10px' }}>
//                                             Read more
//                                         </Button>
//                                     )}
//                                     <Menu
//                                         id={`long-menu-${blog._id}`}
//                                         anchorEl={anchorElMap[blog._id]}
//                                         keepMounted
//                                         open={Boolean(anchorElMap[blog._id])}
//                                         onClose={() => handleMenuClose(blog._id)}
//                                     >
//                                         <MenuItem onClick={() => handleEditBlog(blog)}>
//                                             <EditIcon fontSize="small" /> Edit
//                                         </MenuItem>
//                                         <MenuItem onClick={() => handleDeleteConfirmationOpen(blog._id)}>
//                                             <DeleteIcon fontSize="small" /> Delete
//                                         </MenuItem>
//                                     </Menu>
//                                 </CardContent>
//                             </Card>
//                         ))}
//                     </div>
//                 </div>
//             ) : (
//                 <Typography variant="body1">No user profile found.</Typography>
//             )}
//             <Dialog
//                 open={deleteConfirmationOpen}
//                 onClose={handleDeleteConfirmationClose}
//                 aria-labelledby="alert-dialog-title"
//                 aria-describedby="alert-dialog-description"
//             >
//                 <DialogTitle id="alert-dialog-title">{"Confirmation"}</DialogTitle>
//                 <DialogContent>
//                     <DialogContentText id="alert-dialog-description">
//                         Are you sure you want to delete this blog?
//                     </DialogContentText>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleDeleteConfirmationClose} color="primary">
//                         Cancel
//                     </Button>
//                     <Button onClick={handleDeleteBlog} color="primary" autoFocus>
//                         Confirm
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//             {/* Snackbar Component */}
//             <Snackbar
//                 open={snackbarOpen}
//                 autoHideDuration={3000}
//                 onClose={() => setSnackbarOpen(false)}
//                 message={snackbarMessage}
//                 severity={snackbarSeverity}
//             />

//             {/* Update Blog Dialog */}
//             <Dialog
//                 open={updateDialogOpen}
//                 onClose={handleUpdateDialogClose}
//                 aria-labelledby="update-dialog-title"
//                 aria-describedby="update-dialog-description"
//             >
//                 <DialogTitle id="update-dialog-title">Edit Blog</DialogTitle>
//                 <DialogContent>
//                     <TextField
//                         sx={{ mt: 2 }}
//                         fullWidth
//                         multiline
//                         id="updated-blog-title"
//                         label="Title"
//                         value={updatedBlogTitle}
//                         onChange={(e) => setUpdatedBlogTitle(e.target.value)}
//                     />
//                     <TextField
//                         sx={{ mt: 2 }}
//                         fullWidth
//                         multiline
//                         id="updated-blog-content"
//                         label="Content"
//                         value={updatedBlogContent}
//                         onChange={(e) => setUpdatedBlogContent(e.target.value)}
//                     />
//                     <TextField
//                         sx={{ mt: 2 }}
//                         fullWidth
//                         multiline
//                         id="updated-blog-category"
//                         label="Category"
//                         value={updatedBlogCategory}
//                         onChange={(e) => setUpdatedBlogCategory(e.target.value)}
//                     />
//                     <Typography sx={{ mt: 3 }} variant="h6">Update Image</Typography>
//                     {updatedBlogImage && (
//                         <img
//                             src={URL.createObjectURL(updatedBlogImage)} // Create URL for the selected image file
//                             alt="Updated Blog Image"
//                             style={{ maxWidth: '100%', marginTop: '8px' }}
//                         />
//                     )}
//                     <input
//                         type="file"
//                         id="updated-blog-image"
//                         onChange={(e) => setUpdatedBlogImage(e.target.files[0])}
//                         style={{ marginTop: '8px' }}
//                     />
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleUpdateDialogClose} color="primary">
//                         Cancel
//                     </Button>
//                     <Button onClick={handleUpdateBlog} color="primary" autoFocus>
//                         Update
//                     </Button>
//                 </DialogActions>
//             </Dialog>

//         </div>
//     );
// };

// export default UserProfile;

import React, { useState, useEffect } from 'react';
import { getUserProfile } from '../Services/profileService';
import { Typography, CircularProgress } from '@mui/material';
import { useAuth } from '../Components/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../assets/userprofile.css';

const UserProfile = () => {
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
        }
    }, [isLoggedIn, navigate]);

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

    return (
        <div>
            {loading ? (
                <CircularProgress />
            ) : profile ? (
                <div className="user-profile"> {/* Apply the CSS class */}
                    <Typography variant="h2" className="profile-heading">
                        User Profile
                    </Typography>
                    <hr></hr>
                    <div className="profile-info">
                        <Typography variant="h6">
                            <strong>Username:</strong> {profile.username}
                        </Typography>
                    </div>
                    <div className="profile-info">
                        <Typography variant="h6">
                            <strong>Email:</strong> {profile.email}
                        </Typography>
                    </div>
                </div>
            ) : (
                <Typography variant="body1">No user profile found.</Typography>
            )}
        </div>
    );
};

export default UserProfile;

