import React from 'react';
import { Card } from 'antd';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, DateTime, SplineSeries, AxisModel, ValueType, SplineAreaSeries } from '@syncfusion/ej2-react-charts';
import { Text } from '../text'; // Assuming you have a Text component

interface DataPoint {
  x: Date;
  y: number;
}

interface TrendChartProps {
  title: string;
  data: DataPoint[];
  color: string;
  icon: React.ReactNode;
  isLoading: boolean;
  totalCount?: string;
  changePercent?: number;
  unit?: string;
}

const TrendChart: React.FC<TrendChartProps> = ({ title, data, color, icon, isLoading, totalCount, changePercent, unit }) => {
  const primaryxAxis: AxisModel = {
    valueType: 'DateTime' as ValueType,
    labelFormat: 'MMM',
    majorGridLines: { width: 0 },
    majorTickLines: { width: 0 },
    lineStyle: { width: 0 },
    visible: false
  };
  
  const primaryyAxis: AxisModel = {
    majorGridLines: { width: 0 },
    majorTickLines: { width: 0 },
    lineStyle: { width: 0 },
    visible: false
  };

  const chartArea = { border: { width: 0 } };

  return (
    <Card
      style={{
        height: "140px",
        padding: 0,
        width: '28%',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        background: `linear-gradient(to bottom right, ${color}10, ${color}05)`,
        border: 'none',
      }}
      bodyStyle={{
        padding: "20px",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%'
      }}
      size="small"
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {React.cloneElement(icon as React.ReactElement, { style: { fontSize: '24px', color: color } })}
        <Text size="md" style={{ color: '#555', fontWeight: 500 }}>{title}</Text>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <Text size="xxl" strong style={{ fontSize: '32px', lineHeight: '1', color: '#333' }}>
            {isLoading ? '-' : totalCount}
          </Text>
          <Text size="sm" style={{ 
            color: changePercent! > 0 ? '#4CAF50' : changePercent! < 0 ? '#F44336' : '#666',
            marginTop: '8px',
            display: 'block',
            fontWeight: 500
          }}>
            {isLoading ? '-' : `${changePercent! > 0 ? '↑' : changePercent! < 0 ? '↓' : ''} ${Math.abs(changePercent!)}% /month`}
          </Text>
        </div>
        <div style={{ width: "60%", height: "80px" }}>
          <ChartComponent
            id={`chart-${title}`}
            primaryXAxis={primaryxAxis}
            primaryYAxis={primaryyAxis}
            chartArea={chartArea}
            tooltip={{ enable: false }}
            height="100%"
            background="transparent"
          >
            <Inject services={[SplineAreaSeries, DateTime]} />
            <SeriesCollectionDirective>
              <SeriesDirective
                dataSource={data}
                xName='x'
                yName='y'
                type='SplineArea'
                fill={`${color}20`}
                border={{ color: color, width: 2 }}
                opacity={0.5}
              />
            </SeriesCollectionDirective>
          </ChartComponent>
        </div>
      </div>
    </Card>
  );
};

export default TrendChart;