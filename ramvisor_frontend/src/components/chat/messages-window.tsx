"use client";

import React, { useState } from "react";
import MessageCard from "@components/chat/message-card";
import ConversationWindow from "./conversation-window";
import {List, message, Typography} from "antd";
import { ArrowLeft } from "lucide-react";

const { Title } = Typography;

type Props = {
    sessions: { id: number; messages: { content: string, role: "user" | "assistant"}[]}[]
    setIsMessageOpen: (value: boolean) => void;
}

const sessions: Props["sessions"] = [
    {
        id: 1,
        messages: [
            {
                content: "Hi there, We're thrilled to announce exciting updates to our platform. Check out the new features in your dashboard!",
                role: "assistant"
            },
            {
                content: "Your monthly analytics report is ready. Notable growth in user engagement across all metrics.",
                role: "assistant"
            },
            {
                content: "Scheduled maintenance will occur this Saturday at 2am PST. Expected downtime: 30 minutes.",
                role: "assistant"
            }
        ]
    },
    {
        id: 2,
        messages: [
            {
                content: "New security features have been enabled for your account. Review your settings to customize them.",
                role: "assistant"
            },
            {
                content: "Thanks for being a valued customer! Here's a preview of upcoming features we're working on.",
                role: "assistant"
            },
            {
                content: "Your latest backup was completed successfully. All systems operating normally.",
                role: "assistant"
            }
        ]
    },
    {
        id: 3,
        messages: [
            {
                content: "Quick reminder: Your team meeting is scheduled for tomorrow at 10am. Agenda has been updated.",
                role: "assistant"
            },
            {
                content: "We've detected unusual activity on your account. Please verify recent logins for security.",
                role: "assistant"
            },
            {
                content: "Your subscription will renew in 7 days. Review your plan details in account settings.",
                role: "assistant"
            }
        ]
    }
];

const MessageWindow = ({setIsMessageOpen}: Props) => {
    const [selectedSession, setSelectedSession] = useState<number | null>(null);

    const selectedMessages = selectedSession
        ? sessions.find(s => s.id === selectedSession)?.messages || []
        : [];

    const goBack = () => {
        if (selectedSession !== null) {
            setSelectedSession(null);
            setIsMessageOpen(false)
        }
        else {
            message.error("Cannot go back from this screen");
        }
    }

    if (selectedSession !== null) {
        return (
            <div style={{
                position: 'relative',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <div style={{
                    flex: 1,
                    overflow: 'hidden'
                }}>
                    <ConversationWindow goBack={goBack} messages={selectedMessages} />
                </div>
            </div>
        );
    }

    return (
        <div style={{
            position: 'relative',
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
        }}>
            {/* Fixed header */}
            <div style={{
                height: '65px',
                backgroundColor: '#9BA3BF',
                borderRadius: '16px 16px 0 0',
                position: 'sticky',
                top: 0,
                zIndex: 1
            }}>
                <Title level={4} style={{
                    color: '#fff',
                    textAlign: 'center',
                    paddingTop: '20px'
                }}>
                    Messages
                </Title>
            </div>

            <div style={{
                backgroundColor: 'white',
                flex: 1,
                overflowY: 'auto',
                height: 'calc(100% - 65px)'
            }}>
                <List
                    dataSource={[...sessions].reverse()}
                    renderItem={(item) => (
                        <List.Item
                            onClick={() => {
                                setSelectedSession(item.id)
                                setIsMessageOpen(true)
                            }}
                            style={{
                                border: 'none',
                                padding: 0,
                                width: '100%'
                            }}
                        >
                            <div style={{
                                width: '100%',
                                overflow: 'hidden'
                            }}>
                                <MessageCard
                                    content={item.messages[item.messages.length - 1].content}
                                    role={item.messages[item.messages.length - 1].role as "user" | "assistant"}
                                />
                            </div>
                        </List.Item>
                    )}
                />
            </div>
        </div>
    );

}

export default MessageWindow;