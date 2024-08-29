import React, { PropsWithChildren } from "react";

type Props = {
  isPremium: boolean;
};

const DegreeHeader = ({ isPremium }: Props) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px",
        backgroundColor: "white",
        borderBottom: "1px solid #e5e7eb",
      }}
    >
      <div
        style={{
          display: "inline-flex",
          borderRadius: "0.375rem",
          boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        }}
      >
        <button
          style={{
            padding: "8px 16px",
            fontSize: "14px",
            fontWeight: 500,
            borderBottomLeftRadius: "0.375rem",
            borderBottomRightRadius: "0.375rem",
            backgroundColor: isPremium ? '#3B82F6' : 'white',
            
          }}
        >
          {isPremium ? "Premium" : "Basic"}
        </button>
      </div>
    </div>
  );
};

export default DegreeHeader;
