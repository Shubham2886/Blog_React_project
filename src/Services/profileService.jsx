// Services/profileService.js

const getUserProfile = async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('Token not found in local storage');
            return null;
        }

        const response = await fetch(`http://localhost:3000/api/userprofile/profile`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to get user profile');
        }
        const data = await response.json();
        console.log('User profile data:', data); // Log the data received from the server
        return data; // Corrected to return the data directly
    } catch (error) {
        console.error('Error getting user profile:', error);
        // Handle error
        return null; // Return default value
    }
};

const updateUserProfile = async (updatedProfileData) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('Token not found in local storage');
            return;
        }

        const response = await fetch(`http://localhost:3000/api/userprofile/profile`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedProfileData),
        });
        if (!response.ok) {
            throw new Error('Failed to update user profile');
        }
        // Handle successful response
    } catch (error) {
        console.error('Error updating user profile:', error);
        // Handle error
    }
};

const deleteUserProfile = async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('Token not found in local storage');
            return;
        }

        const response = await fetch(`http://localhost:3000/api/userprofile/profile`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error('Failed to delete user profile');
        }
        // Handle successful response
    } catch (error) {
        console.error('Error deleting user profile:', error);
        // Handle error
    }
};

const getUserBlogs = async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('Token not found in local storage');
            return [];
        }

        const response = await fetch(`http://localhost:3000/api/userprofile/profile/blogs`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error('Failed to get user blogs');
        }
        const data = await response.json();
        console.log(data.data);
        // Handle successful response
        return data; // Assuming the response contains an array of user blogs
    } catch (error) {
        console.error('Error getting user blogs:', error);
        // Handle error
        return []; // Return default value
    }
};

const getUserActivity = async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('Token not found in local storage');
            return [];
        }

        const response = await fetch(`http://localhost:3000/api/userprofile/profile/activity`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error('Failed to get user activity');
        }
        const data = await response.json();
        // Handle successful response
        return data.userActivity; // Assuming the response contains user activity data
    } catch (error) {
        console.error('Error getting user activity:', error);
        // Handle error
        return []; // Return default value
    }
};

export { getUserProfile, updateUserProfile, deleteUserProfile, getUserBlogs, getUserActivity };
