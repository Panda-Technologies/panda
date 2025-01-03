import React, { useState } from 'react';
import { Input, Typography, List } from 'antd';
import { Search } from 'lucide-react';
import ArticlesList from './article-list';

const { Text, Title } = Typography;

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

type HelpWindowProps = {
    collections: Collection[];
    onArticleSelect: (article: Article) => void;
};

const HelpWindow = ({ collections, onArticleSelect }: HelpWindowProps) => {
    const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null);

    const handleCollectionClick = (collection: Collection) => {
        setSelectedCollection(collection);
    };

    const handleBack = () => {
        setSelectedCollection(null);
    };

    if (selectedCollection) {
        return (
            <ArticlesList
                collectionTitle={selectedCollection.title}
                articles={selectedCollection.articles}
                onArticleClick={onArticleSelect}
                onBack={handleBack}
            />
        );
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
        }}>
            {/* Header */}
            <div style={{
                padding: '20px 24px',
                backgroundColor: '#9BA3BF',
                borderRadius: '16px 16px 0 0',
            }}>
                <Title level={4} style={{
                    color: '#fff',
                    textAlign: 'center',
                    margin: '0 0 16px 0'
                }}>
                    Help
                </Title>
                <div style={{
                    position: 'relative',
                    marginBottom: '8px'
                }}>
                    <Input
                        placeholder="Search for help"
                        prefix={<Search size={18} color="#999" />}
                        style={{
                            borderRadius: '12px',
                            padding: '8px 12px',
                            backgroundColor: '#fff'
                        }}
                    />
                </div>
            </div>

            {/* Collections List */}
            <div style={{
                flex: 1,
                backgroundColor: '#fff',
                padding: '16px 24px',
                overflowY: 'auto'
            }}>
                <Text style={{
                    display: 'block',
                    marginBottom: '16px',
                    fontSize: '16px',
                    fontWeight: 500
                }}>
                    {collections.length} collections
                </Text>
                <List
                    dataSource={collections}
                    renderItem={(collection) => (
                        <List.Item
                            onClick={() => handleCollectionClick(collection)}
                            style={{
                                padding: '16px 0',
                                cursor: 'pointer',
                                borderBottom: '1px solid #f0f0f0'
                            }}
                        >
                            <div>
                                <Text strong style={{ fontSize: '16px', display: 'block' }}>
                                    {collection.title}
                                </Text>
                                <Text style={{ color: '#666' }}>
                                    {collection.description}
                                </Text>
                                <Text style={{
                                    color: '#999',
                                    display: 'block',
                                    marginTop: '4px'
                                }}>
                                    {collection.articleCount} article{collection.articleCount !== 1 ? 's' : ''}
                                </Text>
                            </div>
                        </List.Item>
                    )}
                />
            </div>
        </div>
    );
};

export default HelpWindow;