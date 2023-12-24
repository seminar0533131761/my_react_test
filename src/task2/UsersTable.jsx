import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserPosts from './UserPosts';

const UsersTable = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [nameFilter, setNameFilter] = useState('');
    const [emailFilter, setEmailFilter] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [userPosts, setUserPosts] = useState([]);
    const [showPosts, setShowPosts] = useState(true); // Added state to control post display
    const [isCreatingPost, setIsCreatingPost] = useState(false); // State to control post creation
    // The purpose of this variable is because the real post fetch request work but the server does not really update
    // I think becuase it is only a demo site so to get over the problem I decided to use redux to save to updated user posts array 
    const my_userPosts = useSelector((state) => state.userPosts);
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error('Error fetching data:', error));
    }, [setUsers, setUserPosts]);
    // Filter the users based on name filter
    // Filter the users based on name and email filters
    const filteredUsers = users.filter(user => {
        const nameMatch = user.name.toLowerCase().includes(nameFilter.toLowerCase());
        const emailMatch = user.email.toLowerCase().includes(emailFilter.toLowerCase());
        return nameMatch && emailMatch;
    });

    useEffect(() => {
        setUserPosts([...userPosts, ...my_userPosts]);
        if (selectedUser) {
            fetch(`https://jsonplaceholder.typicode.com/posts?userId=${selectedUser.id}`)
                .then(response => response.json())
                .then(data => {
                    setUserPosts([...data, ...my_userPosts]);
                })
                .catch(error => console.error('Error fetching posts:', error));
            
        } else {
            // Reset userPosts when no user is selected
            setUserPosts([]);
        }
    }, [selectedUser]);

    const handleUserClick = user => {
        setSelectedUser(user);
    };

    useEffect(() => {
        // Check if nameFilter has a value; if yes, hide the posts
        setShowPosts(nameFilter === '' || !selectedUser);
        setShowPosts(emailFilter === '' || !selectedUser);
    }, [nameFilter, emailFilter, selectedUser]);


    const handleNewPost = user => {
        setSelectedUser(user); // Select the user for post creation
        setIsCreatingPost(true); // Set post creation state to true
        navigate(`/new-post/${user.id}`)
    };
    return (
        <div>
            <div className="user-table">
                <div>
                    <label htmlFor="nameFilter">Filter by Name:</label>
                    <input
                        type="text"
                        id="nameFilter"
                        value={nameFilter}
                        onChange={e => setNameFilter(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="emailFilter">Filter by Email:</label>
                    <input
                        type="text"
                        id="emailFilter"
                        value={emailFilter}
                        onChange={e => setEmailFilter(e.target.value)}
                    />
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Company Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map(user => (
                            <tr key={user.id} onClick={() => handleUserClick(user)}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.company.name}</td>
                                <td>
                                    <button onClick={() => { handleNewPost(user); }}>Post New Post</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredUsers.length === 0 && (
                    <p>No matching users found.</p>
                )}
            </div>

            <div className="user-posts">
                {showPosts && selectedUser && (
                    <UserPosts userPosts={userPosts} />
                )}
            </div>
        </div>
    );
};

export default UsersTable;
