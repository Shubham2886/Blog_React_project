import React, { useState } from 'react';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../assets/register.css'; // Import the CSS file for styling

const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const responseBody = await response.json();
                if (response.status === 400 && responseBody.message) {
                    // Handle specific error for duplicate username or email
                    const errorMessage = responseBody.message;
                    const reason = responseBody.reason; // Assuming the reason is provided by the backend
                    toast.error(`${errorMessage}: ${reason}`);
                } else {
                    // Handle other errors
                    toast.error('Failed to register user');
                }
                return;
            }
            

            const data = await response.json();
            // Handle successful registration
            toast.success(data.message);
            // Clear the form
            setFormData({
                username: "",
                email: "",
                password: ""
            });
            // Store JWT token in local storage
            localStorage.setItem('token', data.jwt_token);
        } catch (error) {
            console.error('Error registering user:', error);
            toast.error('An error occurred during registration. Please try again later.');
        }
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit} className="register-form">
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" placeholder='username' value={formData.username} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" placeholder='email' value={formData.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" placeholder='password' value={formData.password} onChange={handleChange} required />
                </div>
                <button type="submit">Register</button>
            </form>
            <ToastContainer /> {/* Toastify container for notifications */}
        </div>
    );
};

export default Register;
