"use client";

import React, {useState} from "react";
import {
    Button,
} from "antd";
import {
    QuestionCircleOutlined,
} from "@ant-design/icons";
import MainContainer from "./chat-container";
import HomeContent from "@components/chat/home-window";
import MessagesWindow from "@components/chat/messages-window";

const Chat = () => {
    const [currentTab, setCurrentTab] = useState<"Home" | "Messages" | "Help">("Home");
    const [isOpen, setIsOpen] = useState(false);
    const [isStatusHovered, setIsStatusHovered] = useState(false);
    const [isMessageHovered, setIsMessageHovered] = useState(false);
    const [hoveredItem, setHoveredItem] = useState<number | null>(null);

    const faqItems = [
        {title: "Panda Canvas Integration"},
        {title: "Where can I create my schedule plans?"},
        {title: "Frequently Asked Questions"},
        {title: "What is Panda AI?"}
    ];

    if (!isOpen) {
        return (
            <Button
                type="primary"
                style={{
                    position: "fixed",
                    bottom: "16px",
                    right: "16px",
                    width: "56px",
                    height: "56px",
                    borderRadius: "50%",
                    backgroundColor: "#9BA3BF",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
                }}
                onClick={() => setIsOpen(true)}
                icon={<QuestionCircleOutlined style={{fontSize: "24px"}}/>}
            />
        );
    }

    return (
        <MainContainer
            setIsOpen={setIsOpen}
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
        >
            {currentTab === "Home" && (
                <HomeContent
                    faqItems={faqItems}
                    isStatusHovered={isStatusHovered}
                    setIsStatusHovered={setIsStatusHovered}
                    isMessageHovered={isMessageHovered}
                    setIsMessageHovered={setIsMessageHovered}
                    hoveredItem={hoveredItem}
                    setHoveredItem={setHoveredItem}
                    setIsOpen={setIsOpen}
                />
            )}
            {currentTab === "Messages" && <MessagesWindow />}
            {/*{currentTab === "Help" && <HelpContent />}*/}
        </MainContainer>
    );
};

export default Chat;