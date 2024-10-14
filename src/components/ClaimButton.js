import React from 'react';
import './../App.css';

const ClaimButton = ({ userId, handleClaim }) => {
    const handleClick = () => {
        handleClaim(userId); // Trigger claim points
        // No need to refresh, socket will handle real-time updates
    };

    return (
        <button className="claim-button" onClick={handleClick}>
            Claim Points
        </button>
    );
};

export default ClaimButton;
