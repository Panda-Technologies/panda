import { Card, Space, Button } from "antd";
import React, { SetStateAction } from "react";
import NavigationBar from "@components/chat/navigation-bar";

type MainContainerProps = {
    children: React.ReactNode;
    setIsOpen: React.Dispatch<SetStateAction<boolean>>;
    currentTab: "Home" | "Messages" | "Help";
    setCurrentTab: React.Dispatch<SetStateAction<"Home" | "Messages" | "Help">>;
};

const MainContainer = ({
                           children,
                           setIsOpen,
                           currentTab,
                           setCurrentTab
                       }: MainContainerProps) => {
    return (
        <Card
            style={{
                position: "fixed",
                bottom: "10%",
                right: "24px",
                width: "400px",
                height: "min(78vh, 720px)",
                maxHeight: "78vh",
                zIndex: 1,
                borderRadius: '16px',
                background: currentTab == 'Home' ? 'linear-gradient(180deg, #9BA3BF 150px, #FCFCFC 400px)' : 'white',
            }}
            styles={{
                body: {
                    height: '100%',
                    padding: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                }
            }}
            bordered={false}
        >
            {/* Main scrollable area */}
            <div style={{
                height: '100%',
                overflow: 'auto',
                paddingBottom: '60px'
            }}>
                {children}
            </div>

            <NavigationBar currentTab={currentTab} setCurrentTab={setCurrentTab} />
        </Card>
    );
};

export default MainContainer;