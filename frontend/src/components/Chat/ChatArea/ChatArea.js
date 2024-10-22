import React from "react";
import "./ChatArea.css"; // Certifique-se de que esse arquivo CSS está importado corretamente

const ChatArea = ({
  messages,
  onSendMessage,
  messageInput,
  setMessageInput,
  currentChatName,
  currentUserPhoto,
  currentUser,
}) => {
  return (
    <main className="chat col-md-9 d-flex1 flex-column" style={{ height: "100%" }}>
      <div className="card shadow-sm flex-grow-1">
        <div className="chat-header">
          <img
            src={currentUserPhoto}
            className="user-photo me-2"
            style={{ width: "30px", height: "30px", borderRadius: "50%" }}
          />
          <div className="chat-about">
            <span className="chat-with">{currentChatName}</span>
            <span className="chat-num-messages">{messages.length} mensagens</span>
          </div>
        </div>
        <div className="chat-history">
          {messages.map((msg, index) => {
            const isCurrentUser = msg.user === currentUser;
            return (
              <div key={index} className={`message ${isCurrentUser ? "my-message" : "other-message"}`}>
                <p className="message-text">{msg.message}</p>
                <span className="message-data-time">{msg.time}</span>
              </div>
            );
          })}
        </div>
        <div className="chat-message">
          <textarea
            rows="3"
            placeholder="Type a message..."
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
          />
          <button onClick={onSendMessage}>Enviar</button>
        </div>
      </div>
    </main>
  );
};

export default ChatArea;
