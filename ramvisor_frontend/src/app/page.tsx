"use client";

import { Suspense } from "react";

import { WelcomePage } from "@refinedev/core";
import { Authenticated } from "@refinedev/core";
import Login from "./login/page";
import Calendar from "@components/home/calendar";
import React from "react";
import '../styles/global.css';
import DashboardTotalCountCard from "@components/home/total-count-card";
import { Row, Col } from "antd";
import TrendChart from "@components/home/total-count-card";
import { registerLicense } from "@syncfusion/ej2-base";
import { BarChartOutlined, BookOutlined, ClockCircleOutlined, EyeOutlined, UserOutlined } from "@ant-design/icons";

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
  { x: new Date(2023, 11, 1), y: 39 }
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
  { x: new Date(2023, 11, 1), y: 33 }
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
  { x: new Date(2023, 11, 1), y: 53 }
];

registerLicense('Ngo9BigBOggjHTQxAR8/V1NCaF5cXmZCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdnWXhfeHVcRGdeWE1wV0c=')

export default function IndexPage() {
  return (
    <div>
<div style={{
  padding: '24px',
  borderRadius: '16px',
  display: 'flex',
  justifyContent: 'space-between',
}}>
  <TrendChart
    title="Attendance"
    data={bounceRateData}
    color="#4285F4"
    icon={<UserOutlined />}
    isLoading={false}
    totalCount="97%"
    changePercent={18}
  />
  <TrendChart
    title="Grade Point Average"
    data={pageViewsData}
    color="#0F9D58"
    icon={<BookOutlined />}
    isLoading={false}
    totalCount="3.286"
    changePercent={22}
  />
  <TrendChart
    title="Sleep"
    data={timeOnSiteData}
    color="#DB4437"
    icon={<ClockCircleOutlined />}
    isLoading={false}
    totalCount="6.2 hrs"
    changePercent={-8}
  />
</div>
  


      <Calendar />
    </div>  
  );
}
