// Services/blogInteractions.jsx

const likeBlog = async (blogId) => {
    try {
        const token = localStorage.getItem('token');

        // if (!token) {
        //     console.error('Token not found in local storage');
        //     return null;
        // }

        const response = await fetch(`https://blog-node-project.vercel.app/api/int/blogs/${blogId}/like`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });
        //console.log('Response Status:', response.status);


        // if (!response) {
        //     throw new Error('Failed to like the blog');
        // }

        return response;
    } catch (error) {
        console.error('Error liking blog:', error);
        // Handle error
    }
};

const checkLikedBlog = async (blogId) => {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            console.error('Token not found in local storage');
            return null;
        }

        const response = await fetch(`https://blog-node-project.vercel.app/api/int/blogs/${blogId}/like`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });

        return response;
    } catch (error) {
        console.error('Error checking liked blog:', error);
        // Handle error
    }
};




const shareBlog = async (blogId) => {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            console.error('Token not found in local storage');
            return null;
        }
        const response = await fetch(`https://blog-node-project.vercel.app/api/int/blogs/${blogId}/share`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });
        if (!response.ok) {
            throw new Error('Failed to share the blog');
        }
        return response;
    } catch (error) {
        console.error('Error sharing blog:', error);
        // Handle error
    }
};

const bookmarkBlog = async (blogId) => {
    try {

        const token = localStorage.getItem('token');

        if (!token) {
            console.error('Token not found in local storage');
            return null;
        }
        const response = await fetch(`https://blog-node-project.vercel.app/api/int/blogs/${blogId}/bookmark`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });
        if (!response.ok) {
            throw new Error('Failed to bookmark the blog');
        }
        return response;
    } catch (error) {
        console.error('Error bookmarking blog:', error);
        // Handle error
    }
};

const getLikesForBlog = async (blogId) => {
    try {
        const response = await fetch(`https://blog-node-project.vercel.app/api/int/blogs/${blogId}/all-like`);
        if (!response.ok) {
            throw new Error('Failed to get likes for the blog');
        }
        const data = await response.json();
        // Handle successful response
        return data.likesCount; // Assuming the response contains likes count
    } catch (error) {
        console.error('Error getting likes for blog:', error);
        // Handle error
        return 0; // Return default value
    }
};

export { likeBlog, checkLikedBlog, shareBlog, bookmarkBlog, getLikesForBlog };
