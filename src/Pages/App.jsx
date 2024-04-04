import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header, Footer } from '../Components/Header';
import Home from '../Pages/Home';
import Register from '../Pages/Register';
import Login from '../Pages/Login';
import AddBlog from '../Pages/AddBlog';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../assets/App.css';
import Logout from './Logout';
import UserProfile from './UserProfile';
import PrivacyPolicy from './PrivacyPolicy';
import TermsOfService from './TermsOfService';
import CircularProgress from '@mui/material/CircularProgress'; // Import CircularProgress from Material-UI
import UserBlog from './UserBlogs';
import UserActivity from './UserActivity';

const App = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate some asynchronous initialization tasks
        setTimeout(() => {
            setLoading(false);
        }, 2000); // Simulate a 2-second loading time
    }, []);

    return (
        <Router>
            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <CircularProgress />
                </div>
            ) : (
                <div>
                    <Header />
                    <ToastContainer />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/addblog" element={<AddBlog />} />
                        <Route path="/logout" element={<Logout />} />
                        <Route path="/user-profile" element={<UserProfile />} />
                        <Route path="/user-blogs" element={<UserBlog />} />
                        <Route path="/user-activity" element={<UserActivity />} />
                        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                        <Route path="/terms-of-service" element={<TermsOfService />} />
                    </Routes>
                    <Footer />
                </div>
            )}
        </Router>
    );
};

export default App;
