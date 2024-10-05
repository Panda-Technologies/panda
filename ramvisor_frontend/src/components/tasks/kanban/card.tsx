import React, { memo, useMemo } from "react";
import { Card, ConfigProvider, Dropdown, MenuProps, Button, Tag, Space, Tooltip, theme } from "antd";
import { ClockCircleOutlined, DeleteOutlined, EyeOutlined, MoreOutlined } from "@ant-design/icons";
import { useDelete, useNavigation } from "@refinedev/core";
import dayjs from "dayjs";

import CustomAvatar from "@/components/custom-avatar";
import { Text } from "@/components/text";
import { TextIcon } from "@components/text-icon";
import { getDateColor } from "@/utilities";
import { getClassColor } from "@/utilities/helpers";
import { useCallback } from "react";
import { DELETE_TASK_MUTATION } from "@graphql/mutations";

interface Task {
  id: number;
  title: string;
  description?: string;
  dueDate: string;
  classCode: string;
  stageId: number;
}

type ProjectCardProps = Task & {
  onClick?: () => void;
  onDeleteSuccess: (taskId: number) => void;
};

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  id, 
  title, 
  description, 
  dueDate, 
  classCode, 
  stageId, 
  onClick,
  onDeleteSuccess 
}) => {
  const { token } = theme.useToken();
  const { edit } = useNavigation();
  const { mutate: deleteTask } = useDelete();

  const handleTaskDelete = useCallback(() => {
    deleteTask(
      {
        resource: "tasks",
        id,
        values: { id },
        meta: {
          gqlMutation: DELETE_TASK_MUTATION
        }
      },
      {
        onSuccess: () => {
          onDeleteSuccess(id);
        },
        onError: (error) => {
          console.error('Error deleting task:', error);
        }
      }
    );
  }, [deleteTask, id, onDeleteSuccess]);

  const dropdownItems = useMemo(() => {
    const dropdownItems: MenuProps["items"] = [
      {
        label: "View card",
        key: "1",
        icon: <EyeOutlined />,
        onClick: (e) => {
          e.domEvent.stopPropagation();
          onClick ? onClick() : edit("tasks", id.toString(), "replace");
        },
      },
      {
        danger: true,
        label: "Delete card",
        icon: <DeleteOutlined />,
        key: "2",
        onClick: (e) => {
          e.domEvent.stopPropagation();
          handleTaskDelete();
        },
      },
    ];

    return dropdownItems;
  }, [onClick, edit, id, handleTaskDelete]);

  const dueDateOptions = useMemo(() => {
    if (!dueDate) return null;

    const date = dayjs(dueDate);

    return {
      color: getDateColor({ date: dueDate }) as string,
      text: date.format("MMM DD"),
    };
  }, [dueDate]);

  return (
    <ConfigProvider
      theme={{
        components: {
          Tag: {
            colorText: token.colorTextSecondary,
          },
          Card: {
            headerBg: "transparent",
          },
        },
      }}
    >
      <Card
        size="small"
        title={
          <Tooltip title={title}>
            <Text ellipsis={{ tooltip: title }}>{title}</Text>
          </Tooltip>
        }
        onClick={onClick || (() => edit("tasks", id.toString(), "replace"))}
        extra={
          <Dropdown
            trigger={["click"]}
            menu={{
              items: dropdownItems,
              onPointerDown: (e) => e.stopPropagation(),
              onClick: (e) => e.domEvent.stopPropagation(),
            }}
            placement="bottom"
            arrow={{ pointAtCenter: true }}
          >
            <Button
              type="text"
              shape="circle"
              icon={<MoreOutlined />}
              style={{ transform: "rotate(90deg)" }}
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => e.stopPropagation()}
            />
          </Dropdown>
        }
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "8px",
          }}
        >
          {description && <TextIcon style={{ marginRight: "4px" }} />}
          {dueDateOptions && (
            <Tag
              icon={<ClockCircleOutlined style={{ fontSize: "12px" }} />}
              style={{
                padding: "0 4px",
                marginInlineEnd: "0",
                backgroundColor:
                  dueDateOptions.color === "default" ? "transparent" : "unset",
              }}
              color={dueDateOptions.color}
              bordered={dueDateOptions.color !== "default"}
            >
              {dueDateOptions.text}
            </Tag>
          )}
          {classCode && (
            <Tooltip title={classCode}>
              <Text style={{ 
                color: 'orange',
                fontSize: "14px", 
                fontWeight: "600",
                marginRight: "8px",
                flexShrink: 0 
              }}>
                {classCode}
              </Text>
            </Tooltip>
          )}
        </div>
      </Card>
    </ConfigProvider>
  );
};

export default ProjectCard;

export const ProjectCardMemo = memo(ProjectCard, (prev, next) => {
  return (
    prev.id === next.id &&
    prev.title === next.title &&
    prev.description === next.description &&
    prev.dueDate === next.dueDate &&
    prev.classCode === next.classCode &&
    prev.stageId === next.stageId &&
    prev.onClick === next.onClick
  );
});