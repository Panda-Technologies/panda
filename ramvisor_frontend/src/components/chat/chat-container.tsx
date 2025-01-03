import {Card, Space, Button} from "antd";
import React, {SetStateAction} from "react";
import NavigationBar from "@components/chat/navigation-bar";

type MainContainerProps = {
    children: React.ReactNode;
    setIsOpen: React.Dispatch<SetStateAction<boolean>>;
    currentTab: "Home" | "Messages" | "Help";
    setCurrentTab: React.Dispatch<SetStateAction<"Home" | "Messages" | "Help">>;
    isMessageOpen: boolean;
    isArticleOpen: boolean;
};

const MainContainer = ({
                           children,
                           setIsOpen,
                           currentTab,
                           setCurrentTab,
                           isMessageOpen,
                           isArticleOpen,
                       }: MainContainerProps) => {

    return (
        <Card
            style={{
                position: "fixed",
                bottom: "10%",
                right: "24px",
                width: isArticleOpen ? "800px" : "400px",
                height: isArticleOpen ? "min(85vh, 800px)" : "min(78vh, 720px)",
                maxHeight: isArticleOpen ? "80vh" : "78vh",
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
                borderRadius: (isMessageOpen || isArticleOpen) ? '0 0 16px 16px' : '',
                paddingBottom: (isMessageOpen || isArticleOpen) ? '0px' : '60px'
            }}>
                {children}
            </div>
            {(!isMessageOpen && !isArticleOpen) && (
                <NavigationBar currentTab={currentTab} setCurrentTab={setCurrentTab}/>
            )}
        </Card>
    );
};

export default MainContainer;