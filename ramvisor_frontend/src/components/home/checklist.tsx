import React from 'react';
import { Card, List, Checkbox, message } from 'antd';
import { ArrowRightOutlined, CheckSquareOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { Text } from '@components/text';
import { useUpdate } from '@refinedev/core';
import { GET_TASKS_QUERY } from '@graphql/queries';
import { UPDATE_TASK_MUTATION } from '@graphql/mutations';
import { useGetIdentity } from '@refinedev/core';
import { useCustom } from '@refinedev/core';
import { useState } from 'react';
import { useEffect } from 'react';

interface Task {
  id: number;
  title: string;
  classCode: string;
  stageId: number;
  class?: {
    color?: string;
  };
  isChecked?: boolean;
}

const cardStyle = {
  width: '100%',
  height: '34%',
  borderRadius: '16px',
  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
  background: 'linear-gradient(135deg, #ffffff, #f0f8ff)',
  border: 'none',
  overflow: 'hidden'
};

const headerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 20px 8px',
  marginTop: '-7px',
  borderBottom: '1px solid #e8e8e8'
};

const titleContainerStyle = {
  display: 'flex',
  alignItems: 'center'
};

const iconStyle = {
  fontSize: '24px',
  color: '#28b34e'
};

const titleStyle = {
  marginLeft: '12px',
  fontWeight: 'bold',
  fontSize: '18px',
  color: '#333'
};

const listItemStyle = {
  padding: '12px 0',
  borderBottom: '1px solid #f0f0f0',
  transition: 'background-color 0.3s ease'
};

const listItemContentStyle = {
  display: 'flex',
  alignItems: 'center',
  width: '100%'
};

const Checklist: React.FC = () => {
  const { data: identity } = useGetIdentity<{ id: string }>();
  const [tasks, setTasks] = useState<Task[]>([]);

  const { data: tasksData, isLoading: tasksLoading, refetch } = useCustom<{ getTasks: Task[] }>({
    url: "",
    method: "get",
    meta: {
      gqlQuery: GET_TASKS_QUERY,
      variables: {
        userId: identity?.id
      }
    }
  });

  const { mutate } = useUpdate();

  useEffect(() => {
    if (tasksData?.data?.getTasks) {
      setTasks(tasksData.data.getTasks);
    }
  }, [tasksData]);

  const handleCheckboxChange = async (taskId: number, checked: boolean) => {
    try {
      mutate({
        resource: 'tasks',
        id: taskId,
        values: {
          id: taskId,
          stageId: checked ? 2 : 1
        },
        mutationMode: 'optimistic',
        meta: {
          gqlMutation: UPDATE_TASK_MUTATION
        }
      });

      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.id === taskId ? { ...task, isChecked: true, stageId: checked ? 2 : 1 } : task
        )
      );

      setTimeout(() => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
      }, 300);

      message.success(`Task ${checked ? 'completed' : 'marked as not started'}`);
    } catch (error) {
      message.error('Failed to update task status');
    }
  };

  return (
      <Card style={cardStyle}>
        <div style={headerStyle}>
          <div style={titleContainerStyle}>
            <CheckSquareOutlined style={iconStyle} />
            <span style={titleStyle}>Pending Assignments</span>
          </div>
          <Link href='/tasks'>
            <ArrowRightOutlined />
          </Link>
        </div>
        <List
            itemLayout="horizontal"
            dataSource={tasks.filter(task => task.stageId === 1)}
            pagination={{ pageSize: 3 }}
            renderItem={(item: Task) => (
                <List.Item
                    key={item.id}
                    style={listItemStyle}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#f9f9f9';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                >
                  <div style={listItemContentStyle}>
                    <Checkbox
                        checked={item.isChecked}
                        onChange={(e) => handleCheckboxChange(item.id, e.target.checked)}
                        style={{ marginRight: '12px', flexShrink: 0 }}
                    />
                    <Text style={{
                      color: item.class?.color || '#4285F4',
                      fontSize: '14px',
                      fontWeight: '600',
                      marginRight: '8px',
                      flexShrink: 0
                    }}>
                      [{item.classCode}]:
                    </Text>
                    <Text ellipsis={{ tooltip: true }} style={{
                      color: '#666',
                      fontSize: '14px',
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