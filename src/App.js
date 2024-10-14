import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserList from './components/UserList';
import ClaimButton from './components/ClaimButton';
import Leaderboard from './components/Leaderboard';
import { io } from 'socket.io-client';
import './App.css'; // Importing the CSS file

const socket = io('https://leaderboard-backend-oa7n.onrender.com/');

const App = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchUsers(); // Initial fetch of users

        // Listen for real-time updates when points are claimed
        socket.on('pointsClaimed', (updatedUsers) => {
            setUsers(updatedUsers); // Update the users list with real-time data
        });

        return () => {
            socket.off('pointsClaimed'); // Clean up the event listener
        };
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await axios.get('https://leaderboard-backend-oa7n.onrender.com/');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleClaim = async (userId) => {
        try {
            await axios.post('https://leaderboard-backend-oa7n.onrender.com/', { userId });
            // No need to manually refresh as the socket will update in real-time
        } catch (error) {
            console.error('Error claiming points:', error);
        }
    };

    return (
        <div className="app-container">
            <h1 className="app-title">Leaderboard System</h1>
            <div className="user-controls">
                <UserList 
                    users={users} 
                    setSelectedUser={setSelectedUser} 
                />
                {selectedUser && <ClaimButton userId={selectedUser} handleClaim={handleClaim} />}
            </div>
            {loading ? (
                <p className="loading">Loading users...</p>
            ) : (
                <Leaderboard users={users} />
            )}
        </div>
    );
};

export default App;
