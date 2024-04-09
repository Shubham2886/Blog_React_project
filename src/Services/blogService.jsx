// Services/blogService.jsx

const createBlog = async (blogData) => {
    try {
        // Retrieve token from local storage
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('Token not found in local storage');
            return null;
        }

        // Proceed with creating the blog post
        const response = await fetch(`http://localhost:3000/api/blogs/createBlog`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: blogData, // Directly pass the FormData object
        });

        if (!response.ok) {
            throw new Error('Failed to create the blog');
        }


        // Handle successful response
        const data = await response.json();
        console.log('Blog created successfully:', data);
        // You might want to return the created blog data or perform other actions here
    } catch (error) {
        console.error('Error creating blog:', error);
        // Handle error
    }
};

const updateBlog = async (blogId, updatedBlogData) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('Token not found in local storage');
            return null;
        }
        const response = await fetch(`http://localhost:3000/api/blogs/updateBlog/${blogId}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json' // Specify content type as JSON
            },
            body: JSON.stringify(updatedBlogData), // Convert updatedBlogData to JSON string
        });
        if (!response.ok) {
            throw new Error('Failed to update the blog');
        }
        return response;
    } catch (error) {
        console.error('Error updating blog:', error);
        // Handle error
    }
};

//updateimage 
const updateImage = async (blogId, imageFile) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('Token not found in local storage');
            return null;
        }

        const formData = new FormData();
        formData.append('blogimage', imageFile);

        const response = await fetch(`http://localhost:3000/api/blogs/updateImage/${blogId}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Failed to update the image');
        }

        return response;
    } catch (error) {
        console.error('Error updating image:', error);
        // Handle error
    }
};


const deleteBlog = async (blogId) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('Token not found in local storage');
            return null;
        }

        const response = await fetch(`http://localhost:3000/api/blogs/deleteBlog/${blogId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to delete the blog');
        }

        const responseData = await response.json();
        console.log(blogId);
        console.log(responseData);

        // Handle successful response
        return responseData;
    } catch (error) {
        console.error('Error deleting blog:', error);
        // Handle error
        return null;
    }
};


const getAllBlogs = async () => {
    try {
        const response = await fetch(`/getAllBlogs`);
        if (!response.ok) {
            throw new Error('Failed to get all blogs');
        }
        const data = await response.json();
        // Handle successful response
        return data.blogs; // Assuming the response contains an array of blogs
    } catch (error) {
        console.error('Error getting all blogs:', error);
        // Handle error
        return []; // Return default value
    }
};

const getBlogById = async (blogId) => {
    try {
        const response = await fetch(`/getBlogById/${blogId}`);
        if (!response.ok) {
            throw new Error('Failed to get the blog');
        }
        const data = await response.json();
        // Handle successful response
        return data.blog; // Assuming the response contains the blog object
    } catch (error) {
        console.error('Error getting blog by ID:', error);
        // Handle error
        return null; // Return default value
    }
};

const getUserBlogs = async () => {
    try {
        const response = await fetch(`/getUserBlog`);
        if (!response.ok) {
            throw new Error('Failed to get user blogs');
        }
        const data = await response.json();
        // Handle successful response
        return data.userBlogs; // Assuming the response contains an array of user blogs
    } catch (error) {
        console.error('Error getting user blogs:', error);
        // Handle error
        return []; // Return default value
    }
};

export { createBlog, updateBlog, updateImage, deleteBlog, getAllBlogs, getBlogById, getUserBlogs };
