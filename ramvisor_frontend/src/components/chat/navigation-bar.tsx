import {Button, Space} from "antd";
import React, {SetStateAction} from "react";
import {
    HomeFilled,
    HomeOutlined,
    MessageFilled,
    MessageOutlined,
    QuestionCircleFilled,
    QuestionCircleOutlined
} from "@ant-design/icons";

type NavigationBarProps = {
    currentTab: "Home" | "Messages" | "Help";
    setCurrentTab: React.Dispatch<SetStateAction<"Home" | "Messages" | "Help">>;
};

const NavigationBar = ({ currentTab, setCurrentTab }: {
    currentTab: "Home" | "Messages" | "Help";
    setCurrentTab: React.Dispatch<SetStateAction<"Home" | "Messages" | "Help">>;
}) => {
    return (
        <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: '#fff',
            borderTop: '1px solid #f0f0f0',
            borderBottomLeftRadius: '16px',
            borderBottomRightRadius: '16px',
            padding: '14px',
            zIndex: 2
        }}>
            <Space style={{width: "100%", justifyContent: "space-around"}}>
                {[
                    {
                        icon: currentTab === "Home" ? <HomeFilled/> : <HomeOutlined/>,
                        text: "Home"
                    },
                    {
                        icon: currentTab === "Messages" ? <MessageFilled/> : <MessageOutlined/>,
                        text: "Messages"
                    },
                    {
                        icon: currentTab === "Help" ? <QuestionCircleFilled/> : <QuestionCircleOutlined/>,
                        text: "Help"
                    }
                ].map((item) => (
                    <Button
                        key={item.text}
                        type="text"
                        onClick={() => setCurrentTab(item.text as "Home" | "Messages" | "Help")}
                        onMouseEnter={(e) => e.currentTarget.style.opacity = '0.6'}
                        onMouseLeave={(e) => item.text !== currentTab && (e.currentTarget.style.opacity = '1')}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            color: item.text === currentTab ? "#999" : "#000",
                            opacity: item.text === currentTab ? 0.6 : 1,
                            height: "auto",
                            padding: "0",
                            background: 'none',
                        }}
                    >
                        {React.cloneElement(item.icon, {
                            style: {
                                fontSize: "22px",
                                color: item.text === currentTab ? "#999" : "#000",
                            }
                        })}
                        <span style={{
                            marginTop: "-2px",
                            fontSize: "14px",
                            fontWeight: '500',
                            opacity: item.text === currentTab ? 1 : 0.6
                        }}>
                            {item.text}
                        </span>
                    </Button>
                ))}
            </Space>
        </div>
    );
};

export default NavigationBar