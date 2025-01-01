"use client";

import React, { useState, useCallback } from "react";
import MessageCard from "@components/chat/message-card";
import {Typography} from "antd";

const { Title, Text } = Typography;

type Props = {
    sessions: { id: number; messages: { content: string, role: "user" | "asssistant"}[]}[]
}

const MessageWindow = () => {

    return (
        <div>
            <div style={{ height: '65px', backgroundColor: '#9BA3BF', borderRadius: '16px 16px 0 0'}}>
                <Title level={4} style={{ color: '#fff', textAlign: 'center', paddingTop: '20px'}}>Messages</Title>
            </div>
            <div style={{ backgroundColor: 'white' }}>
            <MessageCard content={"Hello I am your assistant. How can I help?"} role={"assistant"}/>
            </div>
        </div>
    );
}

export default MessageWindow;