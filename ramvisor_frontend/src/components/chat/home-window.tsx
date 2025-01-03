import { Badge, Button, Card, Image, List, Space, Typography } from "antd";
import pandaIcon from "@config/panda2.png";
import {
    CheckCircleFilled,
    CloseOutlined,
    RightOutlined,
    SearchOutlined
} from "@ant-design/icons";
import React, { SetStateAction } from "react";

const { Title, Text } = Typography;

type HomeContentProps = {
    faqItems: { title: string }[];
    isStatusHovered: boolean;
    setIsStatusHovered: React.Dispatch<SetStateAction<boolean>>;
    isMessageHovered: boolean;
    setIsMessageHovered: React.Dispatch<SetStateAction<boolean>>;
    hoveredItem: number | null;
    setHoveredItem: React.Dispatch<SetStateAction<number | null>>;
    setIsOpen: React.Dispatch<SetStateAction<boolean>>;
};

const HomeContent = ({
                         faqItems,
                         isStatusHovered,
                         setIsStatusHovered,
                         isMessageHovered,
                         setIsMessageHovered,
                         hoveredItem,
                         setHoveredItem,
                         setIsOpen
                     }: HomeContentProps) => {
    return (
        <>
            {/* Header */}
            <div style={{
                padding: "60px 38px 24px",
                color: "#fff",
                position: "relative",
            }}>
                <div style={{
                    position: "absolute",
                    top: "20px",
                    left: "24px",
                    right: "24px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}>
                    <Image
                        src={pandaIcon.src}
                        alt="Panda"
                        width={48}
                        height={48}
                        preview={false}
                        style={{
                            objectFit: "cover",
                            borderRadius: "50%"
                        }}
                    />
                    <Button
                        type="text"
                        icon={<CloseOutlined style={{color: "#fff", fontSize: "16px"}}/>}
                        onClick={() => setIsOpen(false)}
                    />
                </div>
                <Title level={2} style={{
                    color: "#fff",
                    marginTop: '40px',
                    marginBottom: '26px',
                    fontSize: "30px",
                    position: 'relative',
                    top: '58px'
                }}>
                    Welcome to Panda!
                </Title>
            </div>

            {/* Content area */}
            <div style={{padding: "18px"}}>
                {/* Chat button */}
                <Button
                    type="text"
                    block
                    onMouseEnter={() => setIsMessageHovered(true)}
                    onMouseLeave={() => setIsMessageHovered(false)}
                    style={{
                        textAlign: "left",
                        height: "auto",
                        padding: "14px 20px",
                        marginBottom: "10px",
                        border: '1px solid #bfbfbf',
                        borderRadius: "12px",
                        backgroundColor: isMessageHovered ? 'rgba(248,248,248,0.84)' : '#fff',
                        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                        transition: 'background-color 0.2s ease'
                    }}
                >
                    <Space style={{
                        width: "100%",
                        justifyContent: "space-between"
                    }}>
                        <span style={{fontWeight: "500"}}>Start chatting with Ramvisor</span>
                        <RightOutlined style={{color: "#999"}}/>
                    </Space>
                </Button>

                {/* Status card */}
                <Card
                    onClick={() => console.log('hi')}
                    onMouseEnter={() => setIsStatusHovered(true)}
                    onMouseLeave={() => setIsStatusHovered(false)}
                    style={{
                        marginBottom: "10px",
                        borderRadius: '12px',
                        backgroundColor: isStatusHovered ? 'rgba(248,248,248,0.84)' : '#fff',
                        cursor: 'pointer',
                        border: '1px solid #d6d6d6',
                        transition: 'background-color 0.2s ease'
                    }}
                    styles={{
                        body: {padding: '12px'}
                    }}
                    bordered={true}
                >
                    <Space align="start" style={{padding: '0 0 0 10px'}}>
                        <Badge
                            count={<CheckCircleFilled style={{color: "#52c41a", fontSize: "28px"}}/>}
                            offset={[-1, 10]}
                        />
                        <div>
                            <Text
                                strong={isStatusHovered}
                                style={{
                                    fontSize: "14px",
                                    fontWeight: "500",
                                    transition: 'color 0.2s ease',
                                    color: isStatusHovered ? '#000' : 'inherit'
                                }}
                            >
                                Status: All Systems Operational
                            </Text>
                            <div style={{
                                color: isStatusHovered ? "#444" : "#666",
                                marginTop: "2px",
                                fontWeight: '300',
                                fontSize: '13px',
                                transition: 'color 0.2s ease'
                            }}>
                                Updated Dec 26, 20:36 UTC
                            </div>
                        </div>
                    </Space>
                </Card>

                {/* Search and FAQ section */}
                <Card
                    style={{backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e9e9e9',}}
                    styles={{body: {padding: '16px'}}}
                >
                    <Button
                        icon={<SearchOutlined style={{color: "#999"}}/>}
                        type="text"
                        style={{
                            backgroundColor: "#F5F5F5",
                            marginBottom: "16px",
                            borderRadius: "12px",
                            padding: "8px 12px",
                            width: "100%",
                            textAlign: "left",
                            height: "auto",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "#fbfbfb";
                            e.currentTarget.style.fontWeight = "570";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "#F5F5F5";
                            e.currentTarget.style.fontWeight = "500";
                        }}
                    >
                        <span style={{color: "rgba(60,60,60,0.87)"}}>Search for help</span>
                    </Button>
                    <List
                        dataSource={faqItems}
                        renderItem={(item, index) => (
                            <List.Item
                                onMouseEnter={() => setHoveredItem(index)}
                                onMouseLeave={() => setHoveredItem(null)}
                                style={{
                                    padding: "8px 16px",
                                    cursor: "pointer",
                                    borderRadius: '5px 5px 0 0',
                                    backgroundColor: hoveredItem === index ? 'rgba(248,248,248,0.84)' : 'transparent',
                                    transition: "background-color 0.2s ease",
                                }}
                                extra={<RightOutlined style={{color: "#999"}}/>}
                            >
                                <Text>{item.title}</Text>
                            </List.Item>
                        )}
                    />
                </Card>
            </div>
        </>
    );
};

export default HomeContent;