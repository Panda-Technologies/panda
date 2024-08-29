"use client";

import { Card } from "antd";
import React, { PropsWithChildren } from "react";

type Props = {
  isPremium: boolean;
  setShowNewPlannerModal: (isActive: boolean) => void;
  saveCurrentPlanner: () => void;
  setShowAIPlanModal: (isActive: boolean) => void;
  resetPlanner: () => void;
  findPlanner: () => void;
};

const DegreeHeader = ({
  isPremium,
  setShowNewPlannerModal,
  saveCurrentPlanner,
  setShowAIPlanModal,
  resetPlanner,
  findPlanner,
}: Props) => {
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
        <Card
          styles={{
            body: {
              padding: "0.5rem 1rem",
              backgroundColor: isPremium ? "#3B82F6" : "white",
              borderTopRightRadius: "0.375rem",
              borderTopLeftRadius: "0.375rem",
              fontWeight: 500,
            },
          }}
          size="small"
        >
          {isPremium ? "Premium" : "Basic"}
        </Card>
      </div>
      {!isPremium && (
        <div
          style={{
            fontSize: "14px",
            color: "#1F2937",
            display: "flex",
            alignItems: "center",
          }}
        >
          <button
            onClick={() => setShowNewPlannerModal(true)}
            style={{
              marginRight: "8px",
              padding: "4px 8px",
              backgroundColor: "#3B82F6",
              color: "white",
              borderRadius: "4px",
              fontWeight: 500,
            }}
          >
            New Planner
          </button>
          <button
            onClick={saveCurrentPlanner}
            style={{
              marginRight: "8px",
              padding: "4px 8px",
              backgroundColor: "#10B981",
              color: "white",
              borderRadius: "4px",
            }}
          >
            Save Planner
          </button>
          <button
            onClick={() => setShowAIPlanModal(true)}
            style={{
              marginRight: "8px",
              padding: "4px 8px",
              backgroundColor: "#10B981",
              color: "white",
              borderRadius: "4px",
            }}
          >
            Generate AI Plan
          </button>
          <button
            onClick={resetPlanner}
            style={{
              marginRight: "8px",
              padding: "4px 8px",
              backgroundColor: "#EF4444",
              color: "white",
              borderRadius: "4px",
            }}
          >
            Reset
          </button>
          <select>

          </select>
        </div>
      )}
    </div>
  );
};

export default DegreeHeader;
