import {IoChevronForwardSharp} from "react-icons/io5";
import {Image, Typography} from "antd";
import pandaIcon from "@config/panda2.png";
import React from "react";
import {DotIcon} from "lucide-react";

const { Text, Title } = Typography;

type MessageCardProps = {
    content: string;
    role: "user" | "assistant";
}

const MessageCard = ({ content, role }: MessageCardProps) => {
    return (
        <div>
            {role === "user" ? (
                <button style={{ padding: "10px", backgroundColor: "white" }}>
                    {content}
                </button>
            ) : (
                <button
                    style={{
                        padding: "10px 16px",
                        backgroundColor: "white",
                        width: '100%',
                        height: 'auto',
                        minHeight: '50px',
                        maxHeight: '75px',
                        display: 'flex',
                        alignItems: 'center',
                        border: 'none',
                        position: 'relative',
                        cursor: 'pointer',
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = '#f9f9f9';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'white';
                    }}
                >
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                        gap: '12px'
                    }}>
                        <Image
                            src={pandaIcon.src}
                            alt="Panda"
                            width={36}
                            height={36}
                            preview={false}
                            style={{
                                objectFit: "cover",
                                borderRadius: "50%",
                                flexShrink: 0,
                            }}
                        />
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            flex: 1,
                            minWidth: 0
                        }}>
                            <Text style={{
                                fontWeight: '325',
                                color: '#333',
                                textAlign: 'left',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                maxWidth: '100%',
                                display: 'block',
                            }}>
                                {content}
                            </Text>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                            }}>
                                <Text style={{
                                    color: '#666',
                                    fontSize: '14px',
                                    flexShrink: 0,
                                    fontWeight: 325,
                                }}>
                                    Ramvisor
                                </Text>
                                <DotIcon size={20} style={{color: '#666'}}/>
                                <Text style={{
                                    color: '#666',
                                    fontSize: '14px',
                                    flexShrink: 0,
                                    fontWeight: 325,
                                }}>
                                    2h ago
                                </Text>
                            </div>
                        </div>
                        <IoChevronForwardSharp color="#D3D3D3" size={18}/>
                    </div>
                    <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: '5%',
                        right: '5%',
                        height: '1px',
                        backgroundColor: '#f0f0f0',
                    }}/>
                </button>
            )}
        </div>
    );
}

export default MessageCard;