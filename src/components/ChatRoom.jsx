import React, { useState, useEffect, useRef } from 'react';
import '../styles/ChatRoom.css';

const ChatRoom = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const chatEndRef = useRef(null);

    const handleSend = () => {
        if (input.trim()) {
            const newMessages = [...messages, { type: 'mine', text: input }];
            setMessages(newMessages);
            setInput('');
            setTimeout(() => {
                setMessages(prevMessages => [...prevMessages, { type: 'notmine', text: 'This is my reply for your message' }]);
            }, 500);
        }
    };

    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    return (
        <div className="chat-room">
            <div className="chats">
                {messages.map((msg, index) => (
                    <div key={index} className={msg.type === 'mine' ? 'mine' : 'notmine'}>
                        {msg.text}
                    </div>
                ))}
                <div ref={chatEndRef} />
            </div>
            <div className="input-container">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message"
                />
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    );
}

export default ChatRoom;
