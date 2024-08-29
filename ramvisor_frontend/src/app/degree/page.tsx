import DegreeHeader from "@components/degree/header";
import React from "react";

type Props = {};

const DegreePage = (props: Props) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        backgroundColor: "#f3f4f6",
      }}
    >
      <DegreeHeader />
    </div>
  );
};

export default DegreePage;
