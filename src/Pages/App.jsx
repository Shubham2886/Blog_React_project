import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../Components/Header';
import Home from '../Pages/Home';
import Register from '../Pages/Register';
import Login from '../Pages/Login';
import AddBlog from '../Pages/AddBlog';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import '../assets/App.css';
import Logout from './Logout';
import UserProfile from './UserProfile';

const App = () => {
    return (
        <Router>
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

                </Routes>
            </div>
        </Router>
    );
};

export default App;
