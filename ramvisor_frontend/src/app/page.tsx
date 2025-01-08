"use client";
import React from "react";
import { Layout as AntLayout, Row, Col } from "antd";
import {
  UserOutlined,
  BookOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import TrendChart from "@components/home/total-count-card";
import { registerLicense } from "@syncfusion/ej2-base";
import UpcomingEvents from "@components/home/upcoming-events";
import Checklist from "@components/home/checklist";
import { useGetIdentity } from "@refinedev/core";
import dynamic from "next/dynamic";

const Calendar = dynamic(() => import("@components/home/calendar"), { ssr: false });

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
  const { data: identity } = useGetIdentity<{ id: string }>();
  const userId = identity?.id;


  return (
      <AntLayout
          style={{
            background: '#f5f5f5',
            padding: '2px 14px',
            maxWidth: '1600px',
            margin: '0 auto',
          }}
      >
          {/* Top Stats Row */}
          <Row gutter={[16, 16]} style={{marginBottom: '12px'}}>
            <Col xs={24} sm={24} md={8}>
              <TrendChart
                  title="Attendance"
                  data={bounceRateData}
                  color="#4285F4"
                  icon={<UserOutlined/>}
                  isLoading={false}
                  totalCount="97%"
                  changePercent={18}
              />
            </Col>
            <Col xs={24} sm={24} md={8}>
              <TrendChart
                  title="Grade Point Average"
                  data={pageViewsData}
                  color="#0F9D58"
                  icon={<BookOutlined/>}
                  isLoading={false}
                  totalCount="3.286"
                  changePercent={22}
              />
            </Col>
            <Col xs={24} sm={24} md={8}>
              <TrendChart
                  title="Sleep"
                  data={timeOnSiteData}
                  color="#DB4437"
                  icon={<ClockCircleOutlined/>}
                  isLoading={false}
                  totalCount="6.2 hrs"
                  changePercent={-8}
              />
            </Col>
          </Row>

          {/* Main Content Area */}
          <Row gutter={[16, 16]} style={{flex: 1, maxHeight: '695px'}}>
            <Col xs={24} lg={16} style={{height: '100%'}}>
              <div style={{height: '750px'}}>
                <Calendar
                    title="Spring 2024"
                    credits={12}
                    userId={userId ? userId : "null"}
                />
              </div>
            </Col>

            {/* Sidebar Section */}
            <Col xs={24} lg={8} style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
              <UpcomingEvents/>
              <Checklist/>
            </Col>
          </Row>
      </AntLayout>
        );
        };

        export default IndexPage;
