// Services/blogInteractions.js
const likeBlog = async (blogId) => {
    try {
        const response = await fetch(`/blogs/${blogId}/like`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Add authentication token if required
            },
        });
        if (!response.ok) {
            throw new Error('Failed to like the blog');
        }
        // Handle successful response
    } catch (error) {
        console.error('Error liking blog:', error);
        // Handle error
    }
};

const shareBlog = async (blogId) => {
    try {
        const response = await fetch(`/blogs/${blogId}/share`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Add authentication token if required
            },
        });
        if (!response.ok) {
            throw new Error('Failed to share the blog');
        }
        // Handle successful response
    } catch (error) {
        console.error('Error sharing blog:', error);
        // Handle error
    }
};

const bookmarkBlog = async (blogId) => {
    try {
        const response = await fetch(`/blogs/${blogId}/bookmark`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Add authentication token if required
            },
        });
        if (!response.ok) {
            throw new Error('Failed to bookmark the blog');
        }
        // Handle successful response
    } catch (error) {
        console.error('Error bookmarking blog:', error);
        // Handle error
    }
};

const getLikesForBlog = async (blogId) => {
    try {
        const response = await fetch(`/blogs/${blogId}/like`);
        if (!response.ok) {
            throw new Error('Failed to get likes for the blog');
        }
        const data = await response.json();
        // Handle successful response
        return data.likes; // Assuming the response contains likes count
    } catch (error) {
        console.error('Error getting likes for blog:', error);
        // Handle error
        return 0; // Return default value
    }
};

export { likeBlog, shareBlog, bookmarkBlog, getLikesForBlog };
