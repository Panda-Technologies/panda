import React, { useRef, useState, useEffect } from 'react';
import { Typography } from 'antd';
import { ChevronDown, ChevronLeft, Paperclip, Smile, ArrowUp } from 'lucide-react';
import pandaIcon from "@config/panda2.png";

const { Title, Text } = Typography;

type Message = {
    content: string;
    role: "user" | "assistant";
};

type ConversationWindowProps = {
    messages: Message[];
    goBack: () => void;
};

const ConversationWindow = ({ messages = [], goBack }: ConversationWindowProps) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [showScrollButton, setShowScrollButton] = useState(false);
    const [message, setMessage] = useState('');

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleScroll = () => {
        if (!containerRef.current) return;
        const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
        const isNotAtBottom = scrollHeight - scrollTop - clientHeight > 100;
        setShowScrollButton(isNotAtBottom);
    };

    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
            return () => container.removeEventListener('scroll', handleScroll);
        }
    }, []);

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            backgroundColor: 'white',
            borderRadius: '16px 16px 0 0',
            overflow: 'hidden',
            position: 'relative'
        }}>
            {/* Header */}
            <div style={{
                height: '64px',
                backgroundColor: 'white',
                display: 'flex',
                alignItems: 'center',
                padding: '0 16px',
                borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
                gap: '12px'
            }}>
                <button
                    onClick={goBack}
                    style={{
                        width: '32px',
                        height: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: 'none',
                        background: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        padding: 0,
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                >
                    <ChevronLeft size={20} color="#666" />
                </button>
                <img
                    src={pandaIcon.src}
                    alt="Ramvisor"
                    style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        objectFit: 'cover'
                    }}
                />
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    <Text style={{
                        fontSize: '15px',
                        fontWeight: 500,
                        color: '#000',
                        lineHeight: '20px'
                    }}>Ramvisor</Text>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                    }}>
                        <Text style={{
                            fontSize: '13px',
                            color: '#666',
                            lineHeight: '18px',
                            backgroundColor: '#e9e9e9',
                            padding: '0 4px',
                            borderRadius: '4px'
                        }}>AI</Text>
                        <Text style={{
                            fontSize: '13px',
                            color: '#666',
                            lineHeight: '18px'
                        }}>Agent</Text>
                    </div>
                </div>
            </div>

            {/* Messages Container */}
            <div
                ref={containerRef}
                style={{
                    flex: 1,
                    overflowY: 'auto',
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    backgroundColor: '#fff',
                    paddingBottom: '80px'
                }}
            >
                {messages.map((message, index) => (
                    <div
                        key={index}
                        style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '8px',
                            flexDirection: message.role === 'user' ? 'row-reverse' : 'row',
                        }}
                    >
                        {message.role === 'assistant' && (
                            <img
                                src={pandaIcon.src}
                                alt="Ramvisor"
                                style={{
                                    width: '28px',
                                    height: '28px',
                                    borderRadius: '50%',
                                    objectFit: 'cover',
                                    flexShrink: 0
                                }}
                            />
                        )}
                        <div style={{
                            maxWidth: '70%',
                            padding: '12px 16px',
                            backgroundColor: message.role === 'user' ? '#0084ff' : '#f0f0f0',
                            color: message.role === 'user' ? 'white' : '#000',
                            borderRadius: '20px',
                        }}>
                            <Text style={{
                                color: message.role === 'user' ? 'white' : '#000',
                                margin: 0,
                                fontSize: '14px',
                                lineHeight: '20px'
                            }}>
                                {message.content}
                            </Text>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Scroll to Bottom Button */}
            {showScrollButton && (
                <button
                    onClick={scrollToBottom}
                    style={{
                        position: 'absolute',
                        bottom: '80px',
                        right: '16px',
                        backgroundColor: 'white',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                        borderRadius: '50%',
                        padding: '8px',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <ChevronDown size={20} color="#666" />
                </button>
            )}

            {/* Message Input */}
            <div style={{
                padding: '16px',
                backgroundColor: '#fff',
                position: 'relative',
                bottom: 0,
                left: 0,
                right: 0
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    backgroundColor: '#fff',
                    borderRadius: '24px',
                    padding: '12px 16px',
                    border: '1px solid rgba(0, 0, 0, 0.1)'
                }}>
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Message..."
                        style={{
                            flex: 1,
                            backgroundColor: 'transparent',
                            border: 'none',
                            outline: 'none',
                            fontSize: '14px',
                            color: '#000',
                            padding: '0',
                        }}
                    />
                    <div style={{
                        display: 'flex',
                        gap: '12px',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <div style={{
                            opacity: message ? 0 : 1,
                            visibility: message ? 'hidden' : 'visible',
                            display: 'flex',
                            gap: '12px',
                            transition: 'all 0.2s ease',
                            position: 'relative',
                        }}>
                            <button
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    padding: 0,
                                    cursor: 'pointer',
                                    display: 'flex',
                                }}
                            >
                                <Smile size={20} color="#666" />
                            </button>
                            <button
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    padding: 0,
                                    cursor: 'pointer',
                                    display: 'flex',
                                }}
                            >
                                <Paperclip size={20} color="#666" />
                            </button>
                        </div>
                        <div style={{
                            opacity: message ? 1 : 0,
                            visibility: message ? 'visible' : 'hidden',
                            transition: 'all 0.2s ease',
                            position: 'absolute',
                            right: '28px',
                        }}>
                            <button
                                style={{
                                    width: '32px',
                                    height: '32px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: '#0084ff',
                                    border: 'none',
                                    borderRadius: '50%',
                                    cursor: 'pointer',
                                    padding: 0,
                                }}
                            >
                                <ArrowUp size={18} color="white" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConversationWindow;