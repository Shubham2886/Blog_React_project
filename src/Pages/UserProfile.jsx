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

