import CustomAvatar from "@/components/custom-avatar";
import { Text } from "@/components/text";
import { TextIcon } from "@components/text-icon";
import { getDateColor } from "@/utilities";
import {
  ClockCircleOutlined,
  DeleteOutlined,
  EyeOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { useDelete, useNavigation } from "@refinedev/core";
import {
  Button,
  Card,
  ConfigProvider,
  Dropdown,
  MenuProps,
  Space,
  Tag,
  theme,
  Tooltip,
} from "antd";
import dayjs from "dayjs";
import React, { memo, useMemo } from "react";

type ProjectCardProps = {
  id: string;
  title: string;
  updatedAt: string;
  dueDate?: string;
  classes: {
    code: string;
    color: string;
  };
  onClick?: () => void;
};

const ProjectCard = ({ id, title, dueDate, classes, onClick }: ProjectCardProps) => {
  const { token } = theme.useToken();

  const { edit } = useNavigation();

  const { mutate: del } = useDelete();

  const dropdownItems = useMemo(() => {
    const dropdownItems: MenuProps["items"] = [
      {
        label: "View card",
        key: "1",
        icon: <EyeOutlined />,
        onClick: (e) => {
          e.domEvent.stopPropagation();
          onClick ? onClick() : edit("tasks", id, "replace");
        },
      },
      {
        danger: true,
        label: "Delete card",
        icon: <DeleteOutlined />,
        key: "2",
        onClick: (e) => {
          e.domEvent.stopPropagation();
          del({
            resource: "tasks",
            id,
            meta: {
              operation: "task",
            },
          });
        },
      },
    ];

    return dropdownItems;
  }, [onClick]);

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
        title={title.length > 35 ? (<Text ellipsis={{ tooltip: title }}>{title.slice(0, 35) + '...'}</Text>) : (
          <Text>{title}</Text>
        )}
        onClick={onClick || (() => edit("tasks", id, "replace"))}
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
              onPointerDown={(e) => {
                e.stopPropagation();
              }}
              onClick={(e) => {
                e.stopPropagation();
              }}
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
          <TextIcon style={{ marginRight: "4px" }} />
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
          {!!classes && (
            <Space
              size={4}
              wrap
              direction="horizontal"
              align="center"
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginLeft: "auto",
                marginRight: "0",
              }}
            >
                <Tooltip title={classes.code}>
                  <Text style={{ 
                color: classes.color, 
                fontSize: "14px", 
                fontWeight: "600",
                marginRight: "8px",
                flexShrink: 0 }}>{classes.code}</Text>
                </Tooltip>
            </Space>
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
    prev.updatedAt === next.updatedAt &&
    prev.dueDate === next.dueDate &&
    prev.classes === next.classes &&
    prev.onClick === next.onClick
  );
});