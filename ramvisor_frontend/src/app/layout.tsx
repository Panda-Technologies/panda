import { DevtoolsProvider } from "@providers/devtools";
import { useNotificationProvider } from "@refinedev/antd";
import { GitHubBanner, Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import routerProvider from "@refinedev/nextjs-router";
import { Metadata } from "next";
import { cookies } from "next/headers";
import React, { Suspense } from "react";
import Head from 'next/head';

import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ColorModeContextProvider } from "@contexts/color-mode";
import { authProvider } from "@providers/auth-provider";
import { dataProvider, liveProvider } from "@providers/data-provider";
import "@refinedev/antd/dist/reset.css";
import "@styles/global.css";
import Layout from "@components/layout";
import { BookOutlined, CalendarOutlined, DashboardOutlined, ProjectOutlined } from "@ant-design/icons";
import ChatWindow from "@components/chat/window";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const theme = cookieStore.get("theme");
  const defaultMode = theme?.value === "dark" ? "dark" : "light";

  return (
    <html lang="en">
      <Head>
    <link href="https://cdn.syncfusion.com/ej2/26.1.35/ej2-base/styles/material.css" rel="stylesheet" />
    <link href="https://cdn.syncfusion.com/ej2/26.1.35/ej2-react-buttons/styles/material.css" rel="stylesheet" />
    <link href="https://cdn.syncfusion.com/ej2/26.1.35/ej2-react-calendars/styles/material.css" rel="stylesheet" />
    <link href="https://cdn.syncfusion.com/ej2/26.1.35/ej2-react-dropdowns/styles/material.css" rel="stylesheet" />
    <link href="https://cdn.syncfusion.com/ej2/26.1.35/ej2-react-inputs/styles/material.css" rel="stylesheet" />
    <link href="https://cdn.syncfusion.com/ej2/26.1.35/ej2-react-navigations/styles/material.css" rel="stylesheet" />
    <link href="https://cdn.syncfusion.com/ej2/26.1.35/ej2-react-popups/styles/material.css" rel="stylesheet" />
    <link href="https://cdn.syncfusion.com/ej2/26.1.35/ej2-react-schedule/styles/material.css" rel="stylesheet" />
      </Head>
      <body>
          <RefineKbarProvider>
            <AntdRegistry>
              <ColorModeContextProvider defaultMode={defaultMode}>
              
                  <Refine
                    routerProvider={routerProvider}
                    dataProvider={dataProvider}
                    liveProvider={liveProvider}
                    notificationProvider={useNotificationProvider}
                    authProvider={authProvider}
                    resources = {[ // Path definitions that will help refine the available actions for our resources at specific paths. Actions are basically paths that u can use to perform crud operations under a single name
                      {
                          name: 'Dashboard',
                          list: '/',
                          meta: {
                              label: 'Dashboard',
                              icon: <DashboardOutlined />
                          } // Store additional meta information about the resource
                      },

                      {
                          name: 'courses',
                          list: '/course',
                          meta: {
                              label: 'Course Scheduler',
                              icon: <BookOutlined />
                          }
                      },
                  
                      {
                          name: 'degree planner',
                          list: '/degree',
                          meta: {
                              label: 'Degree Planner',
                              icon: <CalendarOutlined />
                          }
                      },
                  
                      {
                          name: 'tasks',
                          list: '/tasks',
                          show: 'tasks/:id',
                          create: 'tasks/new',
                          edit: '/tasks/edit/:id',
                          meta: {
                              label: 'Tasks',
                              icon: <ProjectOutlined />
                          }
                      },
    
                  ]}
                    options={{
                      syncWithLocation: true,
                      warnWhenUnsavedChanges: true,
                      useNewQueryKeys: true,
                      projectId: "mrBuj1-0X8B8V-AEWw5N",
                      liveMode: "auto",
                    }}
                  >
                    <Layout>
                      {children}
                      <ChatWindow />
                    </Layout>
                    <RefineKbar />
                  </Refine>
              </ColorModeContextProvider>
            </AntdRegistry>
          </RefineKbarProvider>
      </body>
    </html>
  );
}
