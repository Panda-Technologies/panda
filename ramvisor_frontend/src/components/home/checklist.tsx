import React from 'react';
import { Card, List, Checkbox } from 'antd';
import { ArrowRightOutlined, CheckSquareOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { Text } from '@components/text';

type TodoItem = {
  classCode: string;
  assignment: string;
  id: string;
  color: string;
};

const Checklist: React.FC = () => {
  const data: TodoItem[] = [
    { classCode: 'COMP 283', assignment: 'Binary Tree Implementation', id: '1', color: '#4285F4' },
    { classCode: 'ECON 101', assignment: 'Supply and Demand Analysis', id: '2', color: '#0F9D58' },
    { classCode: 'HIST 201', assignment: 'Essay on Industrial Revolution', id: '3', color: '#DB4437' },
    { classCode: 'MATH 231', assignment: 'Differential Equations Problem Set', id: '4', color: '#F4B400' },
    { classCode: 'PHYS 118', assignment: 'Lab Report on Circular Motion', id: '5', color: '#4285F4' },
  ];

  return (
    <Card
      style={{
        height: "100%",
        boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        borderRadius: "16px",
        background: "linear-gradient(135deg, #ffffff, #f0f8ff)",
        border: "none",
        overflow: "hidden",
        width: '65%',
        left: '106%',
        top: '-643px'
      }}
      styles={{ 
        header: { padding: "16px 24px" }, 
        body: { padding: "0 1.5rem" } 
      }}
      title={
        <div style={{ display: "flex", alignItems: "center" }}>
          <CheckSquareOutlined style={{ fontSize: "24px", color: "#28b34e" }} />
          <span style={{
            marginLeft: "12px",
            fontWeight: "bold",
            fontSize: "18px",
            color: "#333",
          }}>
            Pending Assignments
          </span>
          <Link href='/login'><ArrowRightOutlined style={{ marginLeft: '60px' }} /></Link>
        </div>
      }
    >
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item
            style={{
              padding: "12px 0",
              borderBottom: "1px solid #f0f0f0",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f9f9f9"}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
          >
            <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              <Checkbox style={{ marginRight: "12px", flexShrink: 0 }} />
              <Text style={{ 
                color: item.color, 
                fontSize: "14px", 
                fontWeight: "600",
                marginRight: "8px",
                flexShrink: 0
              }}>
                [{item.classCode}]:
              </Text>
              <Text ellipsis={{ tooltip: true }} style={{ 
                color: "#666", 
                fontSize: "14px", 
                flex: 1,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}>
                {item.assignment}
              </Text>
            </div>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default Checklist;