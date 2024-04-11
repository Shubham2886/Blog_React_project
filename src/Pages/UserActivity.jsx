import React, { useState, useEffect } from 'react';
import { getUserActivity } from '../Services/profileService';
import { Typography, CircularProgress, List, ListItem, ListItemText } from '@mui/material';
import '../assets/useractivity.css'; // Importing the CSS file

const UserActivity = () => {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response = await getUserActivity();
                if (!response.ok) {
                    throw new Error('Failed to get user activities');
                }
                const data = await response.json();
                if (data && data.status === 'success') {
                    setActivities(data.data);
                } else {
                    console.error('Failed to get user activities:', data ? data.error : 'Response is undefined');
                }
            } catch (error) {
                console.error('Error fetching user activities:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchActivities();
    }, []);

    return (
        <div className="userActivityContainer">
            <Typography variant="h4" className="activityHeading" gutterBottom>User Activity</Typography>
            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <CircularProgress />
                </div>
            ) : activities.length > 0 ? (
                <List className="activityList">
                    {activities.map(activity => (
                        <ListItem key={activity._id} className="activityListItem" alignItems="flex-start">
                            <ListItemText
                                primary={`${activity.username} ${activity.action}`}
                                secondary={new Date(activity.timestamp).toLocaleString()}
                                classes={{
                                    primary: 'activityListItemTextPrimary',
                                    secondary: 'activityListItemTextSecondary'
                                }}
                            />
                        </ListItem>
                    ))}
                </List>
            ) : (
                <Typography variant="body1">No user activity found.</Typography>
            )}
        </div>
    );
};

export default UserActivity;
