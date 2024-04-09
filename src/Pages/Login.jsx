// // import * as React from 'react';
// // import { useState } from 'react';
// // import { Snackbar, Alert as MuiAlert, Modal, Box, TextField, Button } from '@mui/material';
// // import { useNavigate } from 'react-router-dom';
// // import { useAuth } from '../Components/AuthContext'; //
// // import Container from '@mui/material/Container';
// // import CssBaseline from '@mui/material/CssBaseline';
// // import Avatar from '@mui/material/Avatar';
// // import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// // import Typography from '@mui/material/Typography';
// // import FormControlLabel from '@mui/material/FormControlLabel';
// // import Checkbox from '@mui/material/Checkbox';
// // import '../assets/login.css'; // Import the CSS file for styling

// // const Login = () => {
// //     const [formData, setFormData] = useState({
// //         email: "",
// //         password: ""
// //     });

// //     const [openModal, setOpenModal] = useState(false); // State to control the modal
// //     const [open, setOpen] = useState(false);
// //     const [otp, setOtp] = useState(""); // State to store OTP input
// //     const [errorMessage, setErrorMessage] = useState("");
// //     const navigate = useNavigate();
// //     const { login } = useAuth(); // Use login function from useAuth

// //     const handleChange = (e) => {
// //         const { name, value } = e.target;
// //         setFormData(prevState => ({
// //             ...prevState,
// //             [name]: value
// //         }));
// //     };

// //     const handleOTPVerification = async () => {
// //         try {
// //             const response = await fetch('http://localhost:3000/api/auth/verify-login-otp', {
// //                 method: 'POST',
// //                 headers: {
// //                     'Content-Type': 'application/json',
// //                 },
// //                 body: JSON.stringify({
// //                     email: formData.email,
// //                     otp: otp
// //                 }),
// //             });

// //             if (!response.ok) {
// //                 throw new Error('Failed to verify OTP');
// //             }

// //             const data = await response.json();
// //             console.log(data);
// //             if (data.status === "ok") {
// //                 // Handle successful OTP verification

// //                 setOpenModal(false); // Close the OTP verification modal
// //                 // Handle successful login
// //                 localStorage.setItem('token', data.jwt_token);
// //                 // Set expiration timestamp (adjust expiresIn based on your token expiry logic)
// //                 const expiresIn = 3600; // 1 hour in seconds
// //                 const expirationTime = new Date().getTime() + expiresIn * 1000;
// //                 localStorage.setItem('tokenExpiration', expirationTime);
// //                 localStorage.setItem('isLoggedIn', true);

// //                 // Check if user data exists before accessing its properties
// //                 const user = data.user; // Assuming user data is nested under 'user' property
// //                 if (user && user.id) {
// //                     localStorage.setItem('currentUser', JSON.stringify(user)); // Store user data
// //                     console.log(user); // Log user data
// //                 } else {
// //                     console.error('User data not found or incomplete:', user);
// //                     // Handle missing or incomplete user data
// //                 }
// //                 console.log(data.user);
// //                 login();
// //                 setOpen(true); // Open the Snackbar for successful login
// //                 setTimeout(() => {
// //                     setOpen(false); // Close the Snackbar after 3 seconds
// //                     navigate('/'); // Redirect to '/'
// //                 }, 3000);
// //                 // Clear the form
// //                 setFormData({
// //                     username: "",
// //                     email: "",
// //                     password: ""
// //                 });
// //             } else {
// //                 throw new Error(data.message || 'Failed to verify OTP');
// //             }
// //         } catch (error) {
// //             console.error('Error verifying OTP:', error);
// //             setErrorMessage(error.message || 'An error occurred during OTP verification');
// //         }
// //     };

// //     const handleSubmit = async (e) => {
// //         e.preventDefault();
// //         try {
// //             const trimmedEmail = formData.email.trim(); // Trim email input
// //             const trimmedPassword = formData.password.trim(); // Trim password input

// //             const response = await fetch('http://localhost:3000/api/auth/login', {
// //                 method: 'POST',
// //                 headers: {
// //                     'Content-Type': 'application/json',
// //                 },
// //                 body: JSON.stringify({ email: trimmedEmail, password: trimmedPassword }), // Send trimmed values for authentication
// //             });

// //             if (response.ok) {
// //                 const data = await response.json();
// //                 if (data.message === "OTP sent to email for login") {
// //                     // Handle successful login

// //                     setOpenModal(true); // Open the OTP verification modal
// //                 } else {
// //                     throw new Error('Unexpected response from server');
// //                 }
// //             } else if (response.status === 400) {
// //                 const responseData = await response.json(); // Read response body as JSON
// //                 let errorMessage;
// //                 if (responseData.message === "User not found") {
// //                     errorMessage = "User not found. Please check your credentials and try again.";
// //                 } else {
// //                     errorMessage = responseData.message || 'Failed to login';
// //                 }
// //                 setErrorMessage(errorMessage);
// //             } else {
// //                 throw new Error('Server Error');
// //             }
// //         } catch (error) {
// //             console.error('Error logging in:', error);
// //             setErrorMessage(error.message || 'An error occurred during login');
// //         }
// //     };

// //     const handleRegister = () => {
// //         navigate('/register'); // Navigate to the registration page
// //     };

// //     return (
// //         <div className="login-container">
// //             <Snackbar open={errorMessage !== ""} onClose={() => setErrorMessage("")}>
// //                 <MuiAlert elevation={6} variant="filled" severity="error">
// //                     {errorMessage}
// //                 </MuiAlert>
// //             </Snackbar>
// //             <Modal open={openModal} onClose={() => setOpenModal(false)}>
// //                 <Box
// //                     sx={{
// //                         position: 'absolute',
// //                         top: '50%',
// //                         left: '50%',
// //                         transform: 'translate(-50%, -50%)',
// //                         width: 400,
// //                         bgcolor: '#f0f0f0',
// //                         borderRadius: '8px',
// //                         boxShadow: 24,
// //                         p: 4,
// //                     }}
// //                 >
// //                     <h2 style={{ marginBottom: '16px' }}>Verify Login OTP</h2>
// //                     <p style={{ marginBottom: '8px' }}>Please check your email for the OTP.</p>
// //                     <TextField
// //                         sx={{ mb: 2 }}
// //                         label="OTP"
// //                         multiline
// //                         variant="outlined"
// //                         value={otp}
// //                         onChange={(e) => setOtp(e.target.value)}
// //                         fullWidth
// //                     />
// //                     <Button variant="contained" onClick={handleOTPVerification}>Verify OTP</Button>
// //                 </Box>
// //             </Modal>

// //             <Container component="main" maxWidth="sm">
// //                 <CssBaseline />
// //                 <Box
// //                     sx={{
// //                         marginTop: 8,
// //                         display: 'flex',
// //                         flexDirection: 'column',
// //                         alignItems: 'center',
// //                     }}
// //                 >
// //                     <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
// //                         <LockOutlinedIcon />
// //                     </Avatar>
// //                     <Typography component="h1" variant="h5">
// //                         Sign in
// //                     </Typography>
// //                     <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
// //                         <TextField
// //                             margin="normal"
// //                             required
// //                             fullWidth
// //                             multiline
// //                             type="email"
// //                             id="email"
// //                             label="Email Address"
// //                             name="email"
// //                             autoComplete="email"
// //                             autoFocus
// //                             variant="standard"
// //                             onChange={handleChange}
// //                             value={formData.email}
// //                         />
// //                         <TextField

// //                             margin="normal"
// //                             required
// //                             fullWidth
// //                             multiline
// //                             id="standard-password-input"
// //                             label="Password"
// //                             type="password"
// //                             autoComplete="current-password"
// //                             name="password"
// //                             variant="standard"
// //                             onChange={handleChange}
// //                             value={formData.password}
// //                             InputProps={{
// //                                 style: { fontSize: 15 }, // Increase font size for password
// //                             }}
// //                         />
// //                         <FormControlLabel
// //                             control={<Checkbox value="remember" color="primary" />}
// //                             label="Remember me"
// //                         />
// //                         <Button
// //                             type="submit"
// //                             fullWidth
// //                             variant="contained"
// //                             sx={{ mt: 3, mb: 1 }}
// //                         >
// //                             Sign In
// //                         </Button>
// //                         <Typography variant="body2" align="center">
// //                             Don't have an account? <Button color="primary" onClick={handleRegister}>Register here</Button>
// //                         </Typography>
// //                     </Box>
// //                 </Box>
// //             </Container>
// //             <Snackbar open={open}>
// //                 <MuiAlert elevation={6} variant="filled" severity="success">
// //                     Login Successful
// //                 </MuiAlert>
// //             </Snackbar>
// //             <Snackbar open={errorMessage !== ""} onClose={() => setErrorMessage("")}>
// //                 <MuiAlert elevation={6} variant="filled" severity="error">
// //                     {errorMessage}
// //                 </MuiAlert>
// //             </Snackbar>
// //         </div>
// //     );
// // };

// // export default Login;


// import * as React from 'react';
// import { useState } from 'react';
// import { Snackbar, Alert as MuiAlert, Modal, Box, TextField, Button, IconButton, InputAdornment } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../Components/AuthContext'; 
// import Container from '@mui/material/Container';
// import CssBaseline from '@mui/material/CssBaseline';
// import Avatar from '@mui/material/Avatar';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import Typography from '@mui/material/Typography';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import '../assets/login.css'; // Import the CSS file for styling

// const Login = () => {
//     const [formData, setFormData] = useState({
//         email: "",
//         password: "",
//         showPassword: false // State to toggle password visibility
//     });

//     const [openModal, setOpenModal] = useState(false); // State to control the modal
//     const [open, setOpen] = useState(false);
//     const [otp, setOtp] = useState(""); // State to store OTP input
//     const [errorMessage, setErrorMessage] = useState("");
//     const navigate = useNavigate();
//     const { login } = useAuth(); // Use login function from useAuth
//     // Inside your functional component:
//     const [showPassword, setShowPassword] = useState(false);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prevState => ({
//             ...prevState,
//             [name]: value
//         }));
//     };


//     const handleOTPVerification = async () => {
//         try {
//             const trimmedotp = otp.trim();
//             const response = await fetch('http://localhost:3000/api/auth/verify-login-otp', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     email: formData.email,
//                     otp: trimmedotp
//                 }),
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to verify OTP');
//             }

//             const data = await response.json();
//             console.log(data);
//             if (data.status === "ok") {
//                 // Handle successful OTP verification

//                 setOpenModal(false); // Close the OTP verification modal
//                 // Handle successful login
//                 localStorage.setItem('token', data.jwt_token);
//                 // Set expiration timestamp (adjust expiresIn based on your token expiry logic)
//                 const expiresIn = 3600; // 1 hour in seconds
//                 const expirationTime = new Date().getTime() + expiresIn * 1000;
//                 localStorage.setItem('tokenExpiration', expirationTime);
//                 localStorage.setItem('isLoggedIn', true);

//                 // Check if user data exists before accessing its properties
//                 const user = data.user; // Assuming user data is nested under 'user' property
//                 if (user && user.id) {
//                     localStorage.setItem('currentUser', JSON.stringify(user)); // Store user data
//                     console.log(user); // Log user data
//                 } else {
//                     console.error('User data not found or incomplete:', user);
//                     // Handle missing or incomplete user data
//                 }
//                 console.log(data.user);
//                 login();
//                 setOpen(true); // Open the Snackbar for successful login
//                 setTimeout(() => {
//                     setOpen(false); // Close the Snackbar after 3 seconds
//                     navigate('/'); // Redirect to '/'
//                 }, 3000);
//                 // Clear the form
//                 setFormData({
//                     username: "",
//                     email: "",
//                     password: "",
//                     showPassword: false // Reset password visibility state
//                 });
//             } else {
//                 throw new Error(data.message || 'Failed to verify OTP');
//             }
//         } catch (error) {
//             console.error('Error verifying OTP:', error);
//             setErrorMessage(error.message || 'An error occurred during OTP verification');
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const trimmedEmail = formData.email.trim(); // Trim email input
//             const trimmedPassword = formData.password.trim(); // Trim password input

//             const response = await fetch('http://localhost:3000/api/auth/login', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ email: trimmedEmail, password: trimmedPassword }), // Send trimmed values for authentication
//             });

//             if (response.ok) {
//                 const data = await response.json();
//                 if (data.message === "OTP sent to email for login") {
//                     // Handle successful login

//                     setOpenModal(true); // Open the OTP verification modal
//                 } else {
//                     throw new Error('Unexpected response from server');
//                 }
//             } else if (response.status === 400) {
//                 const responseData = await response.json(); // Read response body as JSON
//                 let errorMessage;
//                 if (responseData.message === "User not found") {
//                     errorMessage = "User not found. Please check your credentials and try again.";
//                 } else {
//                     errorMessage = responseData.message || 'Failed to login';
//                 }
//                 setErrorMessage(errorMessage);
//             } else {
//                 throw new Error('Server Error');
//             }
//         } catch (error) {
//             console.error('Error logging in:', error);
//             setErrorMessage(error.message || 'An error occurred during login');
//         }
//     };

//     const handleRegister = () => {
//         navigate('/register'); // Navigate to the registration page
//     };

//     // Function to toggle password visibility
//     const handleClickShowPassword = () => {
//         setShowPassword(!showPassword);
//     };

//     // Function to prevent focus event
//     const handleMouseDownPassword = (event) => {
//         event.preventDefault();
//     };

//     return (
//         <div className="login-container">
//             <Snackbar open={errorMessage !== ""} onClose={() => setErrorMessage("")}>
//                 <MuiAlert elevation={6} variant="filled" severity="error">
//                     {errorMessage}
//                 </MuiAlert>
//             </Snackbar>
//             <Modal open={openModal} onClose={() => setOpenModal(false)}>
//                 <Box
//                     sx={{
//                         position: 'absolute',
//                         top: '50%',
//                         left: '50%',
//                         transform: 'translate(-50%, -50%)',
//                         width: 400,
//                         bgcolor: '#f0f0f0',
//                         borderRadius: '8px',
//                         boxShadow: 24,
//                         p: 4,
//                     }}
//                 >
//                     <h2 style={{ marginBottom: '16px' }}>Verify Login OTP</h2>
//                     <p style={{ marginBottom: '8px' }}>Please check your email for the OTP.</p>
//                     <TextField
//                         sx={{ mb: 2 }}
//                         label="OTP"
//                         multiline
//                         variant="outlined"
//                         value={otp}
//                         onChange={(e) => setOtp(e.target.value)}
//                         fullWidth
//                     />
//                     <Button variant="contained" onClick={handleOTPVerification}>Verify OTP</Button>
//                 </Box>
//             </Modal>

//             <Container component="main" maxWidth="sm">
//                 <CssBaseline />
//                 <Box
//                     sx={{
//                         marginTop: 8,
//                         display: 'flex',
//                         flexDirection: 'column',
//                         alignItems: 'center',
//                     }}
//                 >
//                     <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
//                         <LockOutlinedIcon />
//                     </Avatar>
//                     <Typography component="h1" variant="h5">
//                         Sign in
//                     </Typography>
//                     <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
//                         <TextField
//                             className="input-field"
//                             fullWidth
//                             type="email"
//                             id="email"
//                             label="Email Address"
//                             name="email"
//                             autoComplete="email"
//                             autoFocus
//                             variant="standard"
//                             onChange={handleChange}
//                             value={formData.email}
//                         />

//                         <TextField
//                         sx={{ mt: 4}}
//                             className="input-field"
//                             fullWidth
//                             id="standard-password-input"
//                             label="Password"
//                             type={showPassword ? 'text' : 'password'}
//                             autoComplete="current-password"
//                             name="password"
//                             variant="standard"
//                             onChange={handleChange}
//                             value={formData.password}
//                             InputProps={{
//                                 endAdornment: (
//                                     <InputAdornment position="end">
//                                         <IconButton
//                                         sx={{ mb: 1}}
//                                             aria-label="toggle password visibility"
//                                             onClick={handleClickShowPassword}
//                                             onMouseDown={handleMouseDownPassword}
//                                         >
//                                             {showPassword ? <VisibilityOff /> : <Visibility />}
//                                         </IconButton>
//                                     </InputAdornment>
//                                 )
//                             }}
//                         />
//                         <FormControlLabel
//                             control={<Checkbox value="remember" color="primary" />}
//                             label="Remember me"
//                         />
//                         <Button
//                             type="submit"
//                             fullWidth
//                             variant="contained"
//                             sx={{ mt: 3, mb: 1 }}
//                         >
//                             Sign In
//                         </Button>
//                         <Typography variant="body2" align="center">
//                             Don't have an account? <Button color="primary" onClick={handleRegister}>Register here</Button>
//                         </Typography>
//                     </Box>
//                 </Box>
//             </Container>
//             <Snackbar open={open}>
//                 <MuiAlert elevation={6} variant="filled" severity="success">
//                     Login Successful
//                 </MuiAlert>
//             </Snackbar>
//             <Snackbar open={errorMessage !== ""} onClose={() => setErrorMessage("")}>
//                 <MuiAlert elevation={6} variant="filled" severity="error">
//                     {errorMessage}
//                 </MuiAlert>
//             </Snackbar>
//         </div>
//     );
// };

// export default Login;


import * as React from 'react';
import { useState,useEffect } from 'react';
import { Snackbar, Alert as MuiAlert, Modal, Box, TextField, Button, IconButton, InputAdornment, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Components/AuthContext';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import '../assets/login.css'; // Import the CSS file for styling

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        showPassword: false // State to toggle password visibility
    });

    const [openModal, setOpenModal] = useState(false); // State to control the modal
    const [open, setOpen] = useState(false);
    const [otp, setOtp] = useState(""); // State to store OTP input
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false); // State to control loading spinner
    const navigate = useNavigate();
    const { login } = useAuth(); // Use login function from useAuth
    // Inside your functional component:
    const [showPassword, setShowPassword] = useState(false);
    const [showResendButton, setShowResendButton] = useState(false); // State to control visibility of Resend OTP button
    const [timer, setTimer] = useState(90); // 90 seconds = 1.5 minutes

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer(prevTimer => {
                if (prevTimer > 0) {
                    return prevTimer - 1;
                } else {
                    clearInterval(interval); // Stop the interval if timer reaches 0
                    return 0; // Return 0 to prevent negative values
                }
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    

    useEffect(() => {
        if (timer === 0) {
            setShowResendButton(true);
        }
    }, [timer]);

    const handleOTPVerification = async () => {
        try {
            const trimmedotp = otp.trim();
            const response = await fetch('http://localhost:3000/api/auth/verify-login-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    otp: trimmedotp
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to verify OTP');
            }

            const data = await response.json();
            console.log(data);
            if (data.status === "ok") {
                // Handle successful OTP verification

                setOpenModal(false); // Close the OTP verification modal
                // Handle successful login
                localStorage.setItem('token', data.jwt_token);
                // Set expiration timestamp (adjust expiresIn based on your token expiry logic)
                const expiresIn = 3600; // 1 hour in seconds
                const expirationTime = new Date().getTime() + expiresIn * 1000;
                localStorage.setItem('tokenExpiration', expirationTime);
                localStorage.setItem('isLoggedIn', true);

                // Check if user data exists before accessing its properties
                const user = data.user; // Assuming user data is nested under 'user' property
                if (user && user.id) {
                    localStorage.setItem('currentUser', JSON.stringify(user)); // Store user data
                    console.log(user); // Log user data
                } else {
                    console.error('User data not found or incomplete:', user);
                    // Handle missing or incomplete user data
                }
                console.log(data.user);
                login();
                setOpen(true); // Open the Snackbar for successful login
                setTimeout(() => {
                    setOpen(false); // Close the Snackbar after 3 seconds
                    navigate('/'); // Redirect to '/'
                }, 3000);
                // Clear the form
                setFormData({
                    username: "",
                    email: "",
                    password: "",
                    showPassword: false // Reset password visibility state
                });
            } else {
                throw new Error(data.message || 'Failed to verify OTP');
            }
        } catch (error) {
            console.error('Error verifying OTP:', error);
            setErrorMessage(error.message || 'An error occurred during OTP verification');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading state to true
        setTimer(90); // Reset the timer to 90 seconds
        try {
            const trimmedEmail = formData.email.trim(); // Trim email input
            const trimmedPassword = formData.password.trim(); // Trim password input

            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: trimmedEmail, password: trimmedPassword }), // Send trimmed values for authentication
            });

            if (response.ok) {
                const data = await response.json();
                if (data.message === "OTP sent to email for login") {
                    // Handle successful login

                    setOpenModal(true); // Open the OTP verification modal
                } else {
                    throw new Error('Unexpected response from server');
                }
            } else if (response.status === 400) {
                const responseData = await response.json(); // Read response body as JSON
                let errorMessage;
                if (responseData.message === "User not found") {
                    errorMessage = "User not found. Please check your credentials and try again.";
                } else {
                    errorMessage = responseData.message || 'Failed to login';
                }
                setErrorMessage(errorMessage);
            } else {
                throw new Error('Server Error');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setErrorMessage(error.message || 'An error occurred during login');
        } finally {
            setLoading(false); // Set loading state to false after login attempt
        }
    };

    const handleRegister = () => {
        navigate('/register'); // Navigate to the registration page
    };

    // Function to toggle password visibility
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    // Function to prevent focus event
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleResendOTP = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/auth/resend-login-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: formData.email }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data.message); // Log success message
            } else {
                throw new Error('Failed to resend OTP');
            }
        } catch (error) {
            console.error('Error resending OTP:', error);
            setErrorMessage('Failed to resend OTP');
        }
    };


    return (
        <div className="login-container">
            <Snackbar open={errorMessage !== ""} onClose={() => setErrorMessage("")}>
                <MuiAlert elevation={6} variant="filled" severity="error">
                    {errorMessage}
                </MuiAlert>
            </Snackbar>
            <Modal
                open={openModal}
                BackdropProps={{
                    invisible: true // Make backdrop invisible
                }}
                disableBackdropClick // Disable backdrop click
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: '#f0f0f0',
                        borderRadius: '8px',
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <h2 style={{ marginBottom: '16px' }}>Verify Login OTP</h2>
                    <p style={{ marginBottom: '8px' }}>Please check your email for the OTP. {timer} seconds remaining.</p>
                    <TextField
                        sx={{ mb: 2 }}
                        label="OTP"
                        multiline
                        variant="outlined"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        fullWidth
                    />
                    <Button variant="contained" onClick={handleOTPVerification}>Verify OTP</Button>
                    <Button variant="outlined" sx={{ mt: 2 }} onClick={() => setOpenModal(false)}>Close</Button> {/* Close button */}
                    {showResendButton && (
                        <Button sx={{ mt: 2 }} variant="outlined" onClick={handleResendOTP}>
                            Resend OTP
                        </Button>
                    )}

                </Box>
            </Modal>

            <Container component="main" maxWidth="sm">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
                        <TextField
                            className="input-field"
                            fullWidth
                            type="email"
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            variant="standard"
                            onChange={handleChange}
                            value={formData.email}
                        />

                        <TextField
                            sx={{ mt: 4 }}
                            className="input-field"
                            fullWidth
                            id="standard-password-input"
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            autoComplete="current-password"
                            name="password"
                            variant="standard"
                            onChange={handleChange}
                            value={formData.password}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            sx={{ mb: 1 }}
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 1 }}
                            disabled={loading} // Disable button when loading
                        >
                            {loading ? <CircularProgress size={24} /> : 'Sign In'} {/* Show loading spinner if loading */}
                        </Button>
                        <Typography variant="body2" align="center">
                            Don't have an account? <Button color="primary" onClick={handleRegister}>Register here</Button>
                        </Typography>
                    </Box>
                </Box>
            </Container>
            <Snackbar open={open}>
                <MuiAlert elevation={6} variant="filled" severity="success">
                    Login Successful
                </MuiAlert>
            </Snackbar>
            <Snackbar open={errorMessage !== ""} onClose={() => setErrorMessage("")}>
                <MuiAlert elevation={6} variant="filled" severity="error">
                    {errorMessage}
                </MuiAlert>
            </Snackbar>
        </div>
    );
};

export default Login;
