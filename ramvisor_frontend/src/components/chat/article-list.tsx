import React from 'react';
import { Typography, List, Image } from 'antd';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import pandaIcon from "@config/panda2.png";

const { Text, Title } = Typography;

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

type ArticlesListProps = {
    collectionTitle: string;
    articles: Article[];
    onArticleClick: (article: Article) => void;
    onBack: () => void;
};

const ArticlesList = ({
                          collectionTitle,
                          articles,
                          onArticleClick,
                          onBack
                      }: ArticlesListProps) => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            backgroundColor: '#fff',
        }}>
            {/* Header */}
            <div style={{
                padding: '16px',
                backgroundColor: '#9BA3BF',
                borderRadius: '16px 16px 0 0',
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
                        e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                >
                    <ChevronLeft size={20} color="#fff" />
                </button>
                <Title level={4} style={{
                    color: '#fff',
                    margin: 0,
                    flex: 1,
                    textAlign: 'center',
                    paddingRight: '40px' // Compensate for back button
                }}>
                    {collectionTitle}
                </Title>
            </div>

            {/* Articles List */}
            <div style={{
                flex: 1,
                overflowY: 'auto',
                padding: '16px'
            }}>
                <List
                    dataSource={articles}
                    renderItem={(article) => (
                        <List.Item
                            onClick={() => onArticleClick(article)}
                            style={{
                                padding: '16px',
                                cursor: 'pointer',
                                borderRadius: '8px',
                                marginBottom: '8px',
                                border: '1px solid #f0f0f0'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#f9f9f9';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                            }}
                        >
                            <div style={{ width: '100%' }}>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginBottom: '8px'
                                }}>
                                    <Text strong style={{ fontSize: '16px' }}>
                                        {article.title}
                                    </Text>
                                    <ChevronRight size={16} color="#666" />
                                </div>
                                <Text style={{
                                    color: '#666',
                                    display: 'block',
                                    marginBottom: '8px'
                                }}>
                                    {article.description}
                                </Text>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px'
                                }}>
                                    <Image
                                        src={pandaIcon.src}
                                        alt={article.author}
                                        width={24}
                                        height={24}
                                        style={{
                                            borderRadius: '50%',
                                            objectFit: 'cover'
                                        }}
                                        preview={false}
                                    />
                                    <Text type="secondary" style={{ fontSize: '13px' }}>
                                        {article.author} · Updated {article.lastUpdated}
                                    </Text>
                                </div>
                            </div>
                        </List.Item>
                    )}
                />
            </div>
        </div>
    );
};

export default ArticlesList;