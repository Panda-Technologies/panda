import React from 'react';
import { Card, List, Checkbox, Spin, message } from 'antd';
import { ArrowRightOutlined, CheckSquareOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { Text } from '@components/text';
import { useList, useOne, useUpdate } from '@refinedev/core';
import { GET_TASKS_QUERY, GET_USER_QUERY } from '../../graphql/queries';
import { UPDATE_TASK_MUTATION } from '../../graphql/mutations';

interface User {
  id: string;
  // Add other user properties as needed
}

interface Task {
  id: string;
  title: string;
  classCode: string;
  stageId: string;
  class?: {
    color?: string;
  };
  // Add other task properties as needed
}

const Checklist: React.FC = () => {
  const { data: userData, isLoading: isUserLoading } = useOne<User>({
    resource: 'users',
    id: 1, // Assuming we have the user ID, replace with actual user ID
    meta: {
      gqlQuery: GET_USER_QUERY
    }
  });

  const { data, isLoading, refetch } = useList<Task>({
    resource: 'tasks',
    meta: {
      gqlQuery: GET_TASKS_QUERY
    },
    filters: [
      {
        field: 'userId',
        operator: 'eq',
        value: userData?.data?.id
      }
    ]
  });

  const { mutate } = useUpdate();

  const handleCheckboxChange = async (taskId: string, checked: boolean) => {
    try {
      await mutate({
        resource: 'tasks',
        id: taskId,
        values: {
          stageId: checked ? 'in_progress' : 'not_started'
        },
        mutationMode: 'optimistic',
        meta: {
          gqlMutation: UPDATE_TASK_MUTATION
        }
      });
      message.success(`Task ${checked ? 'started' : 'marked as not started'}`);
      refetch();
    } catch (error) {
      message.error('Failed to update task status');
    }
  };

  const tasks = data?.data || [];

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
          <Link href='/tasks'><ArrowRightOutlined style={{ marginLeft: '60px' }} /></Link>
        </div>
      }
    >
      <List
        itemLayout="horizontal"
        dataSource={tasks}
        renderItem={(item: Task) => (
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
              <Checkbox 
                checked={item.stageId === 'in_progress'}
                onChange={(e) => handleCheckboxChange(item.id, e.target.checked)}
                style={{ marginRight: "12px", flexShrink: 0 }}
              />
              <Text style={{ 
                color: item.class?.color || '#4285F4', 
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
                {item.title}
              </Text>
            </div>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default Checklist;