import React, { useState, useEffect } from 'react';
import './MessageBoard.css';

const STORAGE_KEY = 'birthday.messages';

const MessageBoard = () => {
  const [messages, setMessages] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
        return [];
      }
    } catch (e) {
      console.error('Failed to read messages from localStorage during init', e);
    }
    // default initial messages when nothing is in storage
    return [
      { id: Date.now() - 2, text: "Happy Birthday! You mean the world to me.", author: "Your Love" },
      { id: Date.now() - 1, text: "Here's to many more adventures together!", author: "Forever Yours" },
    ];
  });

  const [newMessage, setNewMessage] = useState('');

  // Persist messages whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch (e) {
      console.error('Failed to save messages to localStorage', e);
    }
  }, [messages]);

  const addMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: Date.now() + Math.floor(Math.random() * 1000),
        text: newMessage.trim(),
        author: 'Anonymous',
      };
      setMessages((prev) => [...prev, message]);
      setNewMessage('');
    }
  };

  const deleteMessage = (id) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <section className="message-board">
      <h2>Leave a Message</h2>
      <div className="messages">
        {messages.length === 0 ? (
          <p className="empty">No messages yet — be the first!</p>
        ) : (
          messages.map((message, idx) => (
            <div
              key={message.id}
              className="message card-glow"
              style={{ animationDelay: `${idx * 80}ms` }}
              role="article"
              tabIndex={0}
            >
              <p>"{message.text}"</p>
              <div className="meta">
                <span>- {message.author}</span>
                <button
                  type="button"
                  className="delete"
                  title="Delete message"
                  aria-label={`Delete message by ${message.author}`}
                  onClick={() => deleteMessage(message.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="add-message">
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Write your birthday message..."
          rows={3}
        />
        <div className="controls">
          <button onClick={addMessage} disabled={!newMessage.trim()}>
            Add Message
          </button>
        </div>
      </div>
    </section>
  );
};

export default MessageBoard;
