"use client";
import { DegreePlanner } from "@graphql/generated/graphql";
import { Card } from "antd";
import React from "react";

type Props = {
  isPremium: boolean;
  gradSemesterId: number | null | undefined;
  setShowNewPlannerModal: (isActive: boolean) => void;
  setShowAIPlanModal: (isActive: boolean) => void;
  resetPlanner: () => void;
  getPlanners: DegreePlanner[];
  loadPlanner: (selectedPlannerId: number) => void;
  activePlanner: DegreePlanner | null;
  setActivePlanner: (planner: DegreePlanner) => void;
};

const DegreeHeader = ({
  isPremium,
  setShowNewPlannerModal,
  setShowAIPlanModal,
  resetPlanner,
  getPlanners,
  loadPlanner,
  activePlanner,
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
              borderTopRightRadius: "0.375rem",
              borderTopLeftRadius: "0.375rem",
              borderBottomLeftRadius: "0.375rem",
            }}
          >
            New Planner
          </button>
          <button
            onClick={() => setShowAIPlanModal(true)}
            style={{
              marginRight: "8px",
              padding: "4px 8px",
              backgroundColor: "#10B981",
              color: "white",
              borderRadius: "4px",
              borderTopRightRadius: "0.375rem",
              borderTopLeftRadius: "0.375rem",
              borderBottomLeftRadius: "0.375rem",
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
              borderTopRightRadius: "0.375rem",
              borderTopLeftRadius: "0.375rem",
              borderBottomLeftRadius: "0.375rem",
            }}
          >
            Reset
          </button>
          <select
            value={activePlanner ? activePlanner.id.toString() : ""}
            onChange={(queryObj) => {
              loadPlanner(Number(queryObj.target.value));
            }}
            style={{
              marginRight: "8px",
              padding: "4px 8px",
              backgroundColor: "white",
              color: "#1F2937",
              borderRadius: "4px",
            }}
            aria-label="Select a planner"
          >
            <option value="">Select a planner</option>
            {getPlanners.map((planner) => (
              <option key={planner.id} value={planner.id.toString()}>
                {planner.title.toString()}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default DegreeHeader;
