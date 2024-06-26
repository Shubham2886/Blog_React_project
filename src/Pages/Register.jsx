import React, { useState, useEffect } from 'react';
import '../assets/register.css';
import { Snackbar, Alert as MuiAlert, Modal, Box, TextField, Button, CircularProgress } from '@mui/material';
import { useAuth } from '../Components/AuthContext';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        showPassword: false // State to control password visibility
    });

    const { login } = useAuth(); // Use login function from useAuth
    const [openModal, setOpenModal] = useState(false); // State to control the OTP verification modal
    const [open, setOpen] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false); // State to control Snackbar visibility
    const [snackbarMessage, setSnackbarMessage] = useState(""); // State to store Snackbar message
    const [otp, setOtp] = useState(""); // State to store OTP input
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [otpVerified, setOtpVerified] = useState(false); // State to track OTP verification status
    const [loading, setLoading] = useState(false); // State to control loading spinner
    const [showResendButton, setShowResendButton] = useState(false); // State to control visibility of Resend OTP button
    const [timer, setTimer] = useState(90); // 90 seconds = 1.5 minutes
    const [resendButtonDisabled, setResendButtonDisabled] = useState(false); // State to control resend button disabled state


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleTogglePasswordVisibility = () => {
        setFormData(prevState => ({
            ...prevState,
            showPassword: !prevState.showPassword
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
            setLoading(true); // Set loading state to true
            const trimmedotp = otp.trim();
            const response = await fetch('https://blog-node-project.vercel.app/api/auth/verify-register-otp', {
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
            if (data.status === "ok") {
                // Handle successful OTP verification
                localStorage.setItem('token', data.jwt_token);
                // Set expiration timestamp (adjust expiresIn based on your token expiry logic)
                const expiresIn = 3600; // 1 hour in seconds
                const expirationTime = new Date().getTime() + expiresIn * 1000;
                localStorage.setItem('tokenExpiration', expirationTime);
                localStorage.setItem('isLoggedIn', true);
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
                    password: ""
                });
                setOtpVerified(true); // Set OTP verification status to true
            } else {
                throw new Error(data.message || 'Failed to verify OTP');
            }
        } catch (error) {
            console.error('Error verifying OTP:', error);
            setErrorMessage(error.message || 'An error occurred during OTP verification');
        } finally {
            setLoading(false); // Set loading state to false after OTP verification attempt
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading state to true
        setTimer(15);
        // Perform form validation
        let errors = [];
        if (!formData.username.trim()) {
            errors.push("Username is required");
        }
        if (!formData.email.trim()) {
            errors.push("Email is required");
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            errors.push("Email is invalid");
        }
        if (!formData.password.trim()) {
            errors.push("Password is required");
        } else if (formData.password.length < 8) {
            errors.push("Password should be at least 8 characters long");
        }
        if (errors.length > 0) {
            setErrorMessage(errors.join("\n")); // Join errors into a string
            setLoading(false); // Reset loading state
            return;
        }

        try {
            const response = await fetch('https://blog-node-project.vercel.app/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            console.log(response);

            if (response.status === 200) {
                const data = await response.json();
                if (data.message === "OTP sent to email for verification") {
                    // Handle successful registration
                    setOpenModal(true); // Open the OTP verification modal
                }
            } else if (response.status === 400) {
                const responseData = await response.json(); // Read response body as JSON
                console.log('Error data:', responseData); // Log the error data
                let errorMessage;
                if (responseData.message === "User already exists") {
                    errorMessage = `User with this ${responseData.reason} already exists. Please use a different ${responseData.reason}.`;
                } else {
                    errorMessage = responseData.message || 'Failed to register user';
                }
                setErrorMessage(errorMessage);
            } else {
                throw new Error('Server Error');
            }
        } catch (error) {
            console.error('Error registering user:', error);
            setErrorMessage(error.message || 'An error occurred during registration');
        } finally {
            setLoading(false); // Set loading state to false after registration attempt
        }
    };

    const handleLogin = () => {
        navigate('/login'); // Navigate to the registration page
    };

    const handleResendOTP = async () => {
        try {
            setLoading(true);
            const response = await fetch('https://blog-node-project.vercel.app/api/auth/resend-register-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: formData.email }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data.message); // Log success message
                setOpenSnackbar(true); // Open the Snackbar
                setSnackbarMessage(data.message); // Set Snackbar message
                setResendButtonDisabled(true); // Disable the resend button
            } else {
                throw new Error('Failed to resend OTP');
            }
        } catch (error) {
            console.error('Error resending OTP:', error);
            setErrorMessage('Failed to resend OTP');
        } finally {
            setLoading(false); // Set loading state to false after OTP request is completed
        }
    };


    return (
        <div className="register-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit} className="register-form">
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" placeholder='username' value={formData.username} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" placeholder='email' value={formData.email} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <input type={formData.showPassword ? 'text' : 'password'} id="password" name="password" placeholder='password' value={formData.password} onChange={handleChange} />
                        {formData.showPassword ? (
                            <VisibilityOff onClick={handleTogglePasswordVisibility} />
                        ) : (
                            <Visibility onClick={handleTogglePasswordVisibility} />
                        )}
                    </div>
                </div>
                <button type="submit" disabled={loading}>{loading ? <CircularProgress size={24} /> : 'Register'}</button> {/* Show loading spinner if loading */}
            </form>
            <hr></hr>
            <Typography variant="body2" align="center">
                Already have an account? <Button color="primary" onClick={handleLogin}>Login here</Button>
            </Typography>
            <Modal
                open={openModal}
                onClose={() => { }} // Do nothing on backdrop click
                BackdropProps={{
                    invisible: true // Make backdrop invisible
                }}
                disableBackdropClick // Disable backdrop click
            >
                <Box className="otp-modal-box"
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
                    <h2 style={{ marginBottom: '8px', color: 'black' }}>Please check your email for the OTP.</h2>
                    <h6 style={{ color: 'black' }}>Resend otp in {timer}</h6>
                    <TextField
                        sx={{ mb: 2 }}
                        label="OTP"
                        multiline
                        variant="outlined"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        fullWidth
                    />
                    <div style={{ display: 'flow', justifyContent: 'space-evenly' }}> {/* Space between buttons */}
                        
                        <Button
                            onClick={handleOTPVerification}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 1 }}
                            disabled={loading} // Disable button when loading
                        >
                            {loading ? <CircularProgress size={24} /> : 'Verify OTP'} {/* Show loading spinner if loading */}
                        </Button>
                        <Button variant="outlined" sx={{ mt: 2 }} onClick={() => setOpenModal(false)}>Close</Button> {/* Close button */}
                        {showResendButton && (
                            <Button
                                sx={{ mt: 2 }}
                                variant="outlined"
                                onClick={handleResendOTP}
                                disabled={loading || resendButtonDisabled} // Disable button when loading or resendButtonDisabled is true
                            >
                                {loading ? <CircularProgress size={24} /> : 'Resend OTP'}
                            </Button>
                        )}
                    </div>
                </Box>
            </Modal>

            <Snackbar open={open}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Adjust anchor origin for mobile devices
            >
                <MuiAlert elevation={6} variant="filled" severity="success">
                    Registered Successful
                </MuiAlert>
            </Snackbar>
            <Snackbar open={errorMessage !== ""} onClose={() => setErrorMessage("")}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Adjust anchor origin for mobile devices
            >
                <MuiAlert elevation={6} variant="filled" severity="error">
                    {errorMessage}
                </MuiAlert>
            </Snackbar>
            <Snackbar
                open={openSnackbar}
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Adjust anchor origin for mobile devices
            >
                <MuiAlert elevation={6} variant="filled" severity="success">
                    {snackbarMessage}
                </MuiAlert>
            </Snackbar>

        </div>
    );
};

export default Register;
