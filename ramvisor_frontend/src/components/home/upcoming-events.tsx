import {
  BookOutlined,
  CalendarOutlined,
  CameraOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  FileOutlined,
} from "@ant-design/icons";
import { Badge, Card, List } from "antd";
import React, { PropsWithChildren, useState } from "react";
import { Text } from "../text";
import UpcomingEventsSkeleton from "@skeleton/upcoming-events";
import { getDate } from "@/utilities/helpers";
import { useList } from "@refinedev/core";
import dayjs from "dayjs";
import Link from "next/link";

type Props = {
  isLoading?: boolean;
};

const listData = [
  {
    id: 1,
    badge: <BookOutlined />,
    color: "blue",
    title: "Tip of the Day",
    description: "Explore 14 open study spots on campus!",
    link: "/calendar"
  },
  {
    id: 2,
    badge: <FileOutlined />,
    color: "yellow",
    title: "Academic Progress",
    description:
      "On track to complete General Education requirements.",
    link: '/academics'
  },
  {
    id: 3,
    badge: <CheckCircleOutlined />,
    color: "purple",
    title: "Assignment Progress",
    description: "3 assignments due this week that are not started.",
    link: '/assignments'
  },
  {
    id: 4,
    badge: <CalendarOutlined />,
    color: "orange",
    title: "Campus Life Events",
    description: "14 opportunities for CLE credit on campus this week.",
    link: '/events'
  },
  {
    id: 5,
    badge: <ClockCircleOutlined />,
    color: "red",
    title: "Upcoming Deadlines",
    description: "Next assignment is due in: 3h 53m! Status: In Progress.",
    link: '/calendar'
  },
];

const UpcomingEvents = ({ isLoading }: Props) => {
  return (
    <Card
      style={{
        boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        borderRadius: "16px",
        background: "linear-gradient(135deg, #ffffff, #f0f8ff)",
        border: "none",
        overflow: "hidden",
        position: 'relative',
        zIndex: 1,
      }}
      styles={{ 
        header: { padding: "16px 24px" }, 
        body: { padding: "0 1.5rem" } 
      }}
      title={
        <div style={{ display: "flex", alignItems: "center" }}>
          <CheckCircleOutlined style={{ fontSize: "24px", color: "#28b34e" }} />{" "}
          <Text
            style={{
              marginLeft: "12px",
              fontWeight: "bold",
              fontSize: "18px",
              color: "#333",
            }}
          >
            Important Information
          </Text>{" "}
        </div>
      }
    >
      {isLoading ? (
        <List
          itemLayout="horizontal"
          dataSource={Array.from({ length: 5 }).map((_, index) => ({
            id: index,
          }))}
          renderItem={() => <UpcomingEventsSkeleton />}
        />
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={listData || []}
          renderItem={(item) => {
            return (
              <List.Item
                style={{
                  padding: "12px 0",
                  borderBottom: "1px solid #f0f0f0",
                  transition: "background-color 0.3s ease",
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f9f9f9"}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
              >
                <List.Item.Meta
                  avatar={
                    <Badge 
                      color={item.color} 
                      style={{ 
                        width: "10px", 
                        height: "10px", 
                        borderRadius: "50%",
                        marginRight: "12px"
                      }} 
                    />
                  }
                  title={
                    <Text size="sm" style={{ color: "#666", fontWeight: "500" }}>
                      <Link href={item.link}>{item.title}</Link>
                    </Text>
                  }
                  description={
                    <Text ellipsis={{ tooltip: true }} strong size="md" style={{ color: "#333" }}>
                      {item.description}
                    </Text>
                  }
                />
              </List.Item>
            );
          }}
        />
      )}
      {!isLoading && listData?.length === 0 && (
        <span
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "220px",
            color: "#999",
            fontSize: "16px",
          }}
        >
          No upcoming events!
        </span>
      )}
    </Card>
  );
};

export default UpcomingEvents;
