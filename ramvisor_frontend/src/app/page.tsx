"use client";

import React from "react";
import { Layout as AntLayout, Row, Col } from "antd";
import { UserOutlined, BookOutlined, ClockCircleOutlined } from "@ant-design/icons";
import TrendChart from "@components/home/total-count-card";
import Calendar from "@components/home/calendar";
import { registerLicense } from "@syncfusion/ej2-base";
import UpcomingEvents from "@components/home/upcoming-events";

// Register Syncfusion license
registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NCaF5cXmZCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdnWXhfeHVcRGdeWE1wV0c="
);

// Sample data for charts
const bounceRateData = [
  { x: new Date(2023, 0, 1), y: 30 },
  { x: new Date(2023, 1, 1), y: 45 },
  { x: new Date(2023, 2, 1), y: 28 },
  { x: new Date(2023, 3, 1), y: 52 },
  { x: new Date(2023, 4, 1), y: 38 },
  { x: new Date(2023, 5, 1), y: 60 },
  { x: new Date(2023, 6, 1), y: 41 },
  { x: new Date(2023, 7, 1), y: 55 },
  { x: new Date(2023, 8, 1), y: 33 },
  { x: new Date(2023, 9, 1), y: 48 },
  { x: new Date(2023, 10, 1), y: 62 },
  { x: new Date(2023, 11, 1), y: 39 },
];

const pageViewsData = [
  { x: new Date(2023, 0, 1), y: 20 },
  { x: new Date(2023, 1, 1), y: 35 },
  { x: new Date(2023, 2, 1), y: 22 },
  { x: new Date(2023, 3, 1), y: 48 },
  { x: new Date(2023, 4, 1), y: 30 },
  { x: new Date(2023, 5, 1), y: 55 },
  { x: new Date(2023, 6, 1), y: 38 },
  { x: new Date(2023, 7, 1), y: 50 },
  { x: new Date(2023, 8, 1), y: 28 },
  { x: new Date(2023, 9, 1), y: 42 },
  { x: new Date(2023, 10, 1), y: 58 },
  { x: new Date(2023, 11, 1), y: 33 },
];

const timeOnSiteData = [
  { x: new Date(2023, 0, 1), y: 40 },
  { x: new Date(2023, 1, 1), y: 55 },
  { x: new Date(2023, 2, 1), y: 38 },
  { x: new Date(2023, 3, 1), y: 68 },
  { x: new Date(2023, 4, 1), y: 50 },
  { x: new Date(2023, 5, 1), y: 75 },
  { x: new Date(2023, 6, 1), y: 58 },
  { x: new Date(2023, 7, 1), y: 70 },
  { x: new Date(2023, 8, 1), y: 48 },
  { x: new Date(2023, 9, 1), y: 62 },
  { x: new Date(2023, 10, 1), y: 78 },
  { x: new Date(2023, 11, 1), y: 53 },
];

const IndexPage: React.FC = () => {
  return (
    <AntLayout style={{ minHeight: '80vh', padding: '24px', maxHeight: '80vh' }}>
      <Row gutter={[32, 32]}>
        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          <TrendChart
            title="Attendance"
            data={bounceRateData}
            color="#4285F4"
            icon={<UserOutlined />}
            isLoading={false}
            totalCount="97%"
            changePercent={18}
          />
        </Col>
        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          <TrendChart
            title="Grade Point Average"
            data={pageViewsData}
            color="#0F9D58"
            icon={<BookOutlined />}
            isLoading={false}
            totalCount="3.286"
            changePercent={22}
          />
        </Col>
        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          <TrendChart
            title="Sleep"
            data={timeOnSiteData}
            color="#DB4437"
            icon={<ClockCircleOutlined />}
            isLoading={false}
            totalCount="6.2 hrs"
            changePercent={-8}
          />
        </Col>
      </Row>
      <Row gutter={[32, 32]} style={{ marginTop: "25px" }}>
        <Col xs={24} sm={15} xl={8} style={{ height: '1px' }} >
          <UpcomingEvents />
        </Col>
      </Row>
      <Row gutter={[32, 32]} style={{ marginTop: "25px", flex: 1 }}>
        <Col xs={24} md={24} lg={24} xl={24} style={{ height: '618px' }}>
          <Calendar title="Spring 2024" credits={12} />
        </Col>
      </Row>
    </AntLayout>
  );
};

export default IndexPage;