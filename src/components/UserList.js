import React from 'react';
import './../App.css';

const UserList = ({ users, setSelectedUser, handleAddUser }) => {
    return (
        <div>
            <select onChange={(e) => setSelectedUser(e.target.value)}>
                <option value="">Select User</option>
                {users.map(user => (
                    <option key={user._id} value={user._id}>{user.name}</option>
                ))}
            </select>
            <button onClick={handleAddUser}>Add User</button>
        </div>
    );
};

export default UserList;
