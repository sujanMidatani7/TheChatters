import React, { useState } from 'react';
import '../styles/Section.css';
import ChatRoom from './ChatRoom';

const Section = () => {
    const [showCodeDialog, setShowCodeDialog] = useState(false);
    const [showPasswordDialog, setShowPasswordDialog] = useState(false);
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');
    const [showChatBox, setShowChatBox] = useState(false);

    const handleJoinChatRoom = () => {
        setShowCodeDialog(true);
    };

    const handleCodeSubmit = () => {
        setShowCodeDialog(false);
        setShowPasswordDialog(true);
    };

    const handlePasswordSubmit = () => {
        setShowPasswordDialog(false);
        setShowChatBox(true);
    };

    const toggleChatBox = () => {
        setShowChatBox(!showChatBox);
    };

    return (
        <div className="homesection">
            <div className="recent-chats">
                <input type="text" placeholder="Search chats..." className="search-bar" />
                <div className="chats-list">Chats appear here</div>
            </div>
            {!showChatBox && (
                <div className="new-chats">
                    <button className="chat-button" onClick={handleJoinChatRoom}>Join a ChatRoom</button>
                    <button className="chat-button" onClick={() => alert('Create a ChatRoom button clicked!')}>Create a ChatRoom</button>
                </div>
            )}
            {showCodeDialog && (
                <div className="dialog">
                    <div className="dialog-content">
                        <h2>Enter Code</h2>
                        <input
                            type="text"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            placeholder="Enter chat room code"
                        />
                        <button onClick={handleCodeSubmit}>Submit</button>
                    </div>
                </div>
            )}
            {showPasswordDialog && (
                <div className="dialog">
                    <div className="dialog-content">
                        <h2>Enter Password</h2>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter chat room password"
                        />
                        <button onClick={handlePasswordSubmit}>Submit</button>
                    </div>
                </div>
            )}
            {showChatBox && (
                <div className="chat">
                    <ChatRoom />
                    <button className="chat-button" onClick={toggleChatBox}>Close Chat</button>
                </div>
            )}
        </div>
    );
}

export default Section;
