import { Badge, List, Skeleton } from "antd";

const UpcomingEventsSkeleton = () => {
  return (
    <List.Item>
      <List.Item.Meta
        avatar={<Badge color="transparent" />}
        title={
          <Skeleton.Button
            active
            style={{
              height: "14px",
              position: "relative",
              left: "-20px"
            }}
          />
        }
        description={
          <Skeleton.Button
            active
            style={{
              width: "250px",
              marginTop: "10px",
              height: "16px",
              position: "relative",
              left: "-20px"
            }}
          />
        }
      />
    </List.Item>
  );
};

export default UpcomingEventsSkeleton;