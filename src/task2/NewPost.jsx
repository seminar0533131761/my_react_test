import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import { addPosts } from '../redux/actions/addPosts';
const NewPost = ({ userId }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [error, setError] = useState('');
    const userPosts = useSelector((state) => state.userPosts);
    const handleCreatePost = () => {
        // Validate the input fields
        if (!title || !body) {
            setError('Both title and body are required.');
            return;
        }
        if (userId === null) {
            setError("no id found");
            return;
        }

        const newPost = {
            title,
            body,
            userId: userId,
        };

        createPost(newPost);
        // Clear the input fields and error message
        setTitle('');
        setBody('');
        setError('');
    };

    const createPost = newPost => {
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(newPost),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then(response => response.json())
            .then(createdPost => {
                // Add the newly created post to the userPosts state
                dispatch(addPosts(createdPost))
                navigate_back()
            })
            .catch(error => console.error('Error creating post:', error));
    };
    const navigate_back = () => {
        navigate('/')
    }
    return (
        <div>
            <h1>{userId}</h1>
            <h2>Create a New Post</h2>
            <div>
                <label htmlFor="title">Title:</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="body">Body:</label>
                <textarea
                    id="body"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                />
            </div>
            {error && <p className="error">{error}</p>}
            <button onClick={handleCreatePost}>Create Post</button>
        </div>
    );
};

export default NewPost;
