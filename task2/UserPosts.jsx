import React from 'react';

const UserPosts = ({ userPosts }) => {
  return (
    <div>
      <ul>
        {userPosts.map(post => (
          <li key={post.id}>
            <strong>{post.title}</strong>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserPosts;
