"use client";

import React, { useState } from "react";
import {
  Button,
  Input,
  Card,
  List,
  Typography,
  Space,
  Divider,
  Badge, Image
} from "antd";
import {
  SearchOutlined,
  CheckCircleFilled,
  RightOutlined,
  HomeOutlined,
  MessageOutlined,
  QuestionCircleOutlined,
  CloseOutlined
} from "@ant-design/icons";

import pandaIcon from '@config/panda2.png'

const { Title, Text } = Typography;

const HelpCenter = () => {
  const [isOpen, setIsOpen] = useState(false);

  const faqItems = [
    { title: "Panda Canvas Integration" },
    { title: "Where can I create my schedule plans?" },
    { title: "Frequently Asked Questions" },
    { title: "What is Panda AI?" }
  ];

  const containerStyle: React.CSSProperties = {
    position: "fixed",
    bottom: "16px",
    right: "16px",
    width: "400px",
    zIndex: 1000,
  };

  const headerStyle: React.CSSProperties = {
    backgroundColor: "#9BA3BF",
    padding: "60px 24px 24px",
    color: "#fff",
    position: "relative",
    borderTopLeftRadius: "24px",
    borderTopRightRadius: "24px"
  };

  const toggleButtonStyle: React.CSSProperties = {
    position: "fixed",
    bottom: "16px",
    right: "16px",
    width: "56px",
    height: "56px",
    borderRadius: "50%",
    backgroundColor: "#9BA3BF",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
  };

  if (!isOpen) {
    return (
        <Button
            type="primary"
            style={toggleButtonStyle}
            onClick={() => setIsOpen(true)}
            icon={<QuestionCircleOutlined style={{ fontSize: "24px" }} />}
        />
    );
  }

  return (
      <Card
          style={containerStyle}
          styles={{body: { padding: 0 }}}
          bordered={true}
      >
        <div style={headerStyle}>
          <Space style={{ position: "absolute", top: "20px", width: "100%", justifyContent: "space-between", paddingRight: "40px" }}>
            <Image
                src={pandaIcon.src}
                alt="Panda"
                width={40}
                height={40}
                preview={false}
                style={{ objectFit: "cover", borderRadius: "50%" }}
            />
            <Button
                type="text"
                icon={<CloseOutlined style={{ color: "#fff", fontSize: "16px" }} />}
                onClick={() => setIsOpen(false)}
            />
          </Space>
          <Title level={2} style={{ color: "#fff", margin: "0 0 8px 0", fontSize: "30px" }}>
            Hi there 👋
          </Title>
          <Title level={2} style={{ color: "#fff", margin: 0, fontSize: "30px" }}>
            How can we help?
          </Title>
        </div>

        <Card bordered={false} styles={{ body: {padding: "10px" }}}>
          <Button
              type="text"
              block
              style={{
                textAlign: "left",
                height: "auto",
                padding: "16px 20px",
                marginBottom: "24px",
                borderRadius: "12px",
                backgroundColor: "#fff",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
              }}
          >
            <Space style={{ width: "100%", justifyContent: "space-between" }}>
              <span>Send us a message</span>
              <RightOutlined style={{ color: "#999" }} />
            </Space>
          </Button>

          <Card style={{ marginBottom: "16px", borderRadius: '12px' }} styles={{ body: { padding: '12px' }}} bordered={true}>
            <Space align="start" style={{ padding: '0 0 0 10px'}}>
              <Badge
                  count={<CheckCircleFilled style={{ color: "#52c41a", fontSize: "28px" }} />}
                  offset={[-1, 13]}
              />
              <div>
                <Text strong style={{ fontSize: "14px" }}>
                  Status: All Systems Operational
                </Text>
                <div style={{ color: "#666", marginTop: "4px", fontWeight: '300', fontSize: '13px' }}>
                  Updated Dec 26, 20:36 UTC
                </div>
              </div>
            </Space>
          </Card>
          <Card styles={{ body: { padding: '10px' }}}>
          <Card
              style={{ marginBottom: "8px", backgroundColor: "#F5F5F5" }}
              bordered={true}
              styles={{body: { padding: "5px" }}}
          >
            <Input
                prefix={<SearchOutlined style={{ color: "#999", height: '10px'}} />}
                placeholder="Search for help"
                variant={"borderless"}
                style={{ backgroundColor: "#F5F5F5" }}
            />
          </Card>
          <List
              dataSource={faqItems}
              renderItem={item => (
                  <List.Item
                      style={{ padding: "14px 14px 8px", cursor: "pointer" }}
                      extra={<RightOutlined style={{ color: "#999" }} />}
                  >
                    <Text>{item.title}</Text>
                  </List.Item>
              )}
          />
          </Card>
        </Card>

        <Divider style={{ margin: 0 }} />

        <Space style={{ width: "100%", justifyContent: "space-around", padding: "14px" }}>
          {[
            { icon: <HomeOutlined />, text: "Home" },
            { icon: <MessageOutlined />, text: "Messages" },
            { icon: <QuestionCircleOutlined />, text: "Help" }
          ].map((item, index) => (
              <Button
                  key={index}
                  type="text"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    color: "#666",
                    height: "auto",
                    padding: "0"
                  }}
              >
                {React.cloneElement(item.icon, { style: { fontSize: "24px" } })}
                <span style={{ marginTop: "-4px", fontSize: "14px", fontWeight: '500' }}>{item.text}</span>
              </Button>
          ))}
        </Space>
      </Card>
  );
};

export default HelpCenter;