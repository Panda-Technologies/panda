"use client";

import { Layout, Space } from 'antd'
import React from "react";

const Header = () => {

  const headerStyles: React.CSSProperties = {
    background: '#fff',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: '0 24px',
    position: 'sticky',
    top: 0,
    zIndex: 999,
    width: '100%',
  };

  return (
    <Layout.Header style={headerStyles}>
        <Space>
        </Space>
        
    </Layout.Header>
  )
}

export default Header