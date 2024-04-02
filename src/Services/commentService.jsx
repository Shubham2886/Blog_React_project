// Services/commentService.js

const getAllCommentsForBlog = async (blogId) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Token not found');
        }
        
        const response = await fetch(`http://localhost:3000/api/comment/blogs/${blogId}/comments`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        // if (!response.ok) {
        //     throw new Error('Failed to get comments for the blog');
        // }
        
        // const responseData = await response.json();
        
        // // Check if the response status is not "success"
        // if (responseData.status !== 'success' || !responseData.data || responseData.data.length === 0) {
        //     throw new Error('No comments found for the blog');
        // }
        return response;
        //return responseData.data;
    } catch (error) {
        console.error('Error getting comments for blog:', error);
        throw error;
    }
};

const addComment = async (blogId, commentData) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3000/api/comment/blogs/${blogId}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(commentData),
        });
        if (!response.ok) {
            throw new Error('Failed to add comment');
        }
        return response;
    } catch (error) {
        console.error('Error adding comment:', error);
        throw error;
    }
};

const updateComment = async (blogId, commentId, updatedCommentData) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3000/api/comment/blogs/${blogId}/comments/${commentId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(updatedCommentData),
        });
        if (!response.ok) {
            throw new Error('Failed to update comment');
        }
        return response;
    } catch (error) {
        console.error('Error updating comment:', error);
        throw error;
    }
};

const deleteComment = async (blogId, commentId) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3000/api/comment/blogs/${blogId}/comments/${commentId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            throw new Error('Failed to delete comment');
        }
        return response;
    } catch (error) {
        console.error('Error deleting comment:', error);
        throw error;
    }
};

export { getAllCommentsForBlog, addComment, updateComment, deleteComment };
