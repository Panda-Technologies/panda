"use client";

import React from 'react';
import { Typography, Image } from 'antd';
import { ChevronLeft, ChevronDown } from 'lucide-react';
import pandaIcon from "@config/panda2.png";

const { Title, Text } = Typography;

type TableOfContentsItem = {
    title: string;
    level: number;
    id: string;
};

type ArticleWindowProps = {
    title: string;
    content: string;
    author: string;
    lastUpdated: string;
    tableOfContents: TableOfContentsItem[];
    onBack: () => void;
};

const ArticleWindow = ({
                           title,
                           content,
                           author,
                           lastUpdated,
                           tableOfContents,
                           onBack
                       }: ArticleWindowProps) => {
    const [showTOC, setShowTOC] = React.useState(false);

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            backgroundColor: '#fff',
            borderRadius: '16px',
            overflow: 'hidden'
        }}>
            {/* Header with back button */}
            <div style={{
                padding: '16px',
                borderBottom: '1px solid #f0f0f0',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
            }}>
                <button
                    onClick={onBack}
                    style={{
                        border: 'none',
                        background: 'none',
                        padding: '8px',
                        cursor: 'pointer',
                        borderRadius: '4px'
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.05)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                >
                    <ChevronLeft size={20} color="#666" />
                </button>
            </div>

            {/* Article content */}
            <div style={{
                flex: 1,
                overflowY: 'auto',
                padding: '24px'
            }}>
                <Title level={1} style={{ fontSize: '32px', marginBottom: '24px' }}>
                    {title}
                </Title>

                {/* Author info */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '24px'
                }}>
                    <Image
                        src={pandaIcon.src}
                        alt={author}
                        width={40}
                        height={40}
                        style={{
                            borderRadius: '50%',
                            objectFit: 'cover'
                        }}
                        preview={false}
                    />
                    <div>
                        <Text strong style={{ display: 'block' }}>Written by {author}</Text>
                        <Text type="secondary">Updated {lastUpdated}</Text>
                    </div>
                </div>

                {/* Table of Contents */}
                <div style={{
                    marginBottom: '24px',
                    border: '1px solid #f0f0f0',
                    borderRadius: '8px',
                    overflow: 'hidden'
                }}>
                    <button
                        onClick={() => setShowTOC(!showTOC)}
                        style={{
                            width: '100%',
                            padding: '16px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            border: 'none',
                            background: '#fff',
                            cursor: 'pointer'
                        }}
                    >
                        <Text strong>Table of contents</Text>
                        <ChevronDown
                            size={20}
                            style={{
                                transform: showTOC ? 'rotate(180deg)' : 'none',
                                transition: 'transform 0.2s ease'
                            }}
                        />
                    </button>
                    {showTOC && (
                        <div style={{ padding: '0 16px 16px' }}>
                            {tableOfContents.map((item, index) => (
                                <div
                                    key={index}
                                    style={{
                                        padding: '8px 0',
                                        paddingLeft: `${item.level * 16}px`
                                    }}
                                >
                                    <Text>
                                        <a
                                            href={`#${item.id}`}
                                            style={{
                                                color: '#666',
                                                textDecoration: 'none'
                                            }}
                                        >
                                            {item.title}
                                        </a>
                                    </Text>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Main content */}
                <div className="markdown-content">
                    <div dangerouslySetInnerHTML={{ __html: content }} />
                </div>
            </div>
        </div>
    );
};

export default ArticleWindow;