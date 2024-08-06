"use client";

import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faTimes,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { Image } from "antd";
import pandaIcon from "@config/panda2.png";

interface Message {
  text: string;
  sender: "user" | "agent";
}

const ChatWindow: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [conversationId, setConversationId] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chatAPI = "ragflow-NmODM3ZDg4NTJiMjExZWZhNTg4MDI0Mm";

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      createNewConversation();
    }
  }, [isOpen]);

  const createNewConversation = async () => {
    try {
      const response = await fetch("http://127.0.0.1/v1/api/new_conversation", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${chatAPI}`,
        },
      });
      const data = await response.json();
      setConversationId(data.data.id);
      setMessages([{ text: data.data.message[0].content, sender: "agent" }]);
    } catch (error) {
      console.error("Error creating new conversation:", error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (inputMessage.trim()) {
      const userMessage: Message = { text: inputMessage, sender: "user" };
      setMessages((prev) => [...prev, userMessage]);
      setInputMessage("");
      setIsThinking(true);

      try {
        const response = await fetch("http://127.0.0.1/v1/api/completion", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${chatAPI}`,
          },
          body: JSON.stringify({
            conversation_id: conversationId,
            messages: [{ role: "user", content: inputMessage }],
            quote: false,
            stream: false,
          }),
        });

        const data = await response.json();
        if (data.retcode === 0 && data.data && data.data.answer) {
          const agentMessage: Message = {
            text: data.data.answer,
            sender: "agent",
          };
          setMessages((prev) => [...prev, agentMessage]);
        } else {
          console.error("Unexpected response format:", data);
          // You might want to set an error message here
        }
      } catch (error) {
        console.error("Error getting response:", error);
        // You might want to set an error message here
      } finally {
        setIsThinking(false);
      }
    }
  };

  const buttonStyle: React.CSSProperties = {
    position: "fixed",
    bottom: "16px",
    right: "16px",
    width: "52px",
    height: "52px",
    borderRadius: "50%",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    boxShadow: "12px 15px 20px 0 rgba(46, 61, 73, 0.15)",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const chatboxStyle: React.CSSProperties = {
    position: "fixed",
    bottom: "84px",
    right: "16px",
    width: "300px",
    height: "400px",
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "5px 5px 25px 0 rgba(46, 61, 73, 0.2)",
    display: "flex",
    flexDirection: "column",
  };

  const headerStyle: React.CSSProperties = {
    display: "flex",
    padding: "12px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    borderTopLeftRadius: "12px",
    borderTopRightRadius: "12px",
    alignItems: "center",
  };

  const mainStyle: React.CSSProperties = {
    flex: 1,
    overflowY: "auto",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
  };

  const footerStyle: React.CSSProperties = {
    display: "flex",
    padding: "12px",
    borderTop: "1px solid #ddd",
    alignItems: "center",
  };

  const inputStyle: React.CSSProperties = {
    flex: 1,
    border: "none",
    outline: "none",
    fontSize: "14px",
    lineHeight: "20px",
    color: "#888",
  };

  const iconButtonStyle: React.CSSProperties = {
    background: "none",
    border: "none",
    color: "#fff",
    cursor: "pointer",
    padding: "4px",
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={buttonStyle}
          type="button"
          aria-label="Open chat with Panda AI"
        >
          <FontAwesomeIcon icon={faComment} size="2x" />
        </button>
      )}
      {isOpen && (
        <div style={chatboxStyle}>
          <div style={headerStyle}>
            <div style={{ flex: 1, marginRight: "8px" }}>
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: "2px solid #ffffff",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#ffffff",
                }}
              >
                <Image
                  src={pandaIcon.src}
                  alt="Panda"
                  width={27}
                  height={27}
                  preview={false}
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
            <div style={{ flex: 4 }}>
              <h1 style={{ margin: 0, fontSize: "16px" }}>Panda</h1>
              <div style={{ fontSize: "12px" }}>AI Academic Advisor</div>
            </div>
            <div style={{ flex: 1, textAlign: "right" }}>
              <button
                onClick={() => setIsOpen(false)}
                style={iconButtonStyle}
                type="button"
                aria-label="Close chat"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
          </div>
          <div style={mainStyle}>
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                  marginBottom: "8px",
                  maxWidth: "80%",
                }}
              >
                <span
                  style={{
                    backgroundColor:
                      msg.sender === "user" ? "#4CAF50" : "#f1f0f0",
                    color: msg.sender === "user" ? "#fff" : "#000",
                    padding: "8px 12px",
                    borderRadius: "16px",
                    display: "inline-block",
                    wordWrap: "break-word",
                    fontSize: "14px",
                  }}
                >
                  {msg.text}
                </span>
              </div>
            ))}
            {isThinking && (
              <div style={{ alignSelf: "flex-start", marginBottom: "8px" }}>
                <span
                  style={{
                    backgroundColor: "#f1f0f0",
                    color: "#000",
                    padding: "8px 12px",
                    borderRadius: "16px",
                    display: "inline-block",
                    fontSize: "14px",
                  }}
                >
                  ...
                </span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div style={footerStyle}>
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your message here..."
              style={inputStyle}
              aria-label="Message input"
            />
            <button
              onClick={handleSend}
              style={{ ...iconButtonStyle, color: "#888" }}
              type="button"
              aria-label="Send message"
            >
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWindow;
