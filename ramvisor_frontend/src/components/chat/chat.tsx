"use client";

import React, { useState } from "react";
import { Button } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import MainContainer from "./chat-container";
import HomeContent from "@components/chat/home-window";
import MessagesWindow from "@components/chat/messages-window";
import HelpWindow from "@components/chat/help-window";
import ArticleWindow from "@components/chat/article-window";

// Types for the help content
type Collection = {
    id: string;
    title: string;
    description: string;
    articleCount: number;
    articles: Article[];
};

type Article = {
    id: string;
    title: string;
    description: string;
    content: string;
    author: string;
    lastUpdated: string;
    tableOfContents: Array<{
        title: string;
        level: number;
        id: string;
    }>;
};

type TableOfContentsItem = {
    title: string;
    level: number;
    id: string;
};

const Chat = () => {
    // Main state
    const [currentTab, setCurrentTab] = useState<"Home" | "Messages" | "Help">("Home");
    const [isOpen, setIsOpen] = useState(false);

    // UI interaction states
    const [isStatusHovered, setIsStatusHovered] = useState(false);
    const [isMessageHovered, setIsMessageHovered] = useState(false);
    const [hoveredItem, setHoveredItem] = useState<number | null>(null);

    // Window states
    const [isMessageOpen, setIsMessageOpen] = useState(false);
    const [isArticleOpen, setIsArticleOpen] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

    // FAQ items for home window
    const faqItems = [
        { title: "Panda Canvas Integration" },
        { title: "Where can I create my schedule plans?" },
        { title: "Frequently Asked Questions" },
        { title: "What is Panda AI?" }
    ];

    // Help collections with articles
    const collections: Collection[] = [
        {
            id: "getting-started",
            title: "Getting started",
            description: "Getting started with Panda Canvas.",
            articleCount: 6,
            articles: [
                {
                    id: "what-is-panda",
                    title: "What is Panda?",
                    description: "Learn about Panda's core features and capabilities",
                    content: `
                    <h1>What is Panda?</h1>
                    <p>Panda is your intelligent design assistant, helping you create and manage your digital workspace...</p>
                    <h2>Key Features</h2>
                    <p>Our AI-powered platform offers several unique capabilities...</p>
                `,
                    author: "Ramvisor",
                    lastUpdated: "2 days ago",
                    tableOfContents: [
                        { title: "What is Panda?", level: 1, id: "what-is-panda" },
                        { title: "Key Features", level: 2, id: "key-features" }
                    ]
                },
                {
                    id: "panda-canvas",
                    title: "Panda Canvas Integration",
                    description: "Everything you need to know about Panda Canvas",
                    content: `
                    <h1>Panda Canvas Integration</h1>
                    <p>Learn how to effectively use Panda Canvas for your design needs...</p>
                    <h2>Getting Started with Canvas</h2>
                    <p>Start by accessing your Canvas workspace...</p>
                `,
                    author: "Ramvisor",
                    lastUpdated: "1 week ago",
                    tableOfContents: [
                        { title: "Panda Canvas Integration", level: 1, id: "panda-canvas" },
                        { title: "Getting Started with Canvas", level: 2, id: "canvas-start" }
                    ]
                }
            ]
        },
        {
            id: "schedule-plans",
            title: "Schedule Plans",
            description: "Learn how to create and manage your schedule plans.",
            articleCount: 4,
            articles: [
                {
                    id: "create-schedule",
                    title: "Creating Your Schedule",
                    description: "Step-by-step guide to creating your first schedule",
                    content: `
                    <h1>Creating Your Schedule</h1>
                    <p>Learn how to create effective schedules using Panda's planning tools...</p>
                    <h2>Schedule Creation Basics</h2>
                    <p>Follow these steps to create your first schedule...</p>
                `,
                    author: "Ramvisor",
                    lastUpdated: "3 days ago",
                    tableOfContents: [
                        { title: "Creating Your Schedule", level: 1, id: "create-schedule" },
                        { title: "Schedule Creation Basics", level: 2, id: "schedule-basics" }
                    ]
                },
                {
                    id: "manage-schedule",
                    title: "Managing Your Schedule",
                    description: "Tips and tricks for effective schedule management",
                    content: `
                    <h1>Managing Your Schedule</h1>
                    <p>Discover how to manage and optimize your schedules effectively...</p>
                    <h2>Best Practices</h2>
                    <p>Here are some recommended practices for schedule management...</p>
                `,
                    author: "Ramvisor",
                    lastUpdated: "5 days ago",
                    tableOfContents: [
                        { title: "Managing Your Schedule", level: 1, id: "manage-schedule" },
                        { title: "Best Practices", level: 2, id: "best-practices" }
                    ]
                }
            ]
        }
    ];

    // Handle article selection
    const handleArticleSelect = (article: Article) => {
        setSelectedArticle(article);
        setIsArticleOpen(true);
    };


    // Handle back navigation from article
    const handleArticleBack = () => {
        setSelectedArticle(null);
        setIsArticleOpen(false);
    };

    // Floating button when chat is closed
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
                icon={<QuestionCircleOutlined style={{ fontSize: "24px" }} />}
            />
        );
    }

    return (
        <MainContainer
            setIsOpen={setIsOpen}
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            isMessageOpen={isMessageOpen}
            isArticleOpen={isArticleOpen}
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

            {currentTab === "Messages" && (
                <MessagesWindow
                    setIsMessageOpen={setIsMessageOpen}
                />
            )}

            {currentTab === "Help" && (
                <>
                    {selectedArticle ? (
                        <ArticleWindow
                            {...selectedArticle}
                            onBack={handleArticleBack}
                        />
                    ) : (
                        <HelpWindow
                            collections={collections}
                            onArticleSelect={handleArticleSelect}
                        />
                    )}
                </>
            )}
        </MainContainer>
    );
};

export default Chat;