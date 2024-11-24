"use client";

import { Layout as AntLayout } from "antd";
import { ThemedLayoutV2, ThemedSiderV2, ThemedTitleV2 } from "@refinedev/antd";
import Header from "./header";
import pandaIcon from "@config/panda.png"
import Image from "next/image";
import React from "react";


const Layout = ({ children }: React.PropsWithChildren) => {
    return (
      <ThemedLayoutV2
        Sider={() => (
          <ThemedSiderV2 Title={(titleProps) => <ThemedTitleV2 icon={<Image src={pandaIcon} alt="Panda" width={24} height={24} />} {...titleProps} text="Panda" />} />
        )}
        Header={Header}
      >
        {children}
      </ThemedLayoutV2>
    );
  };

export default Layout;