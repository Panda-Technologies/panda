import { Class, Requirement } from "@graphql/generated/graphql";
import React from "react";

type Props = {
  requirement: Requirement;
  onRequirementClick: (requirement: Requirement) => void;
  getClass: (classId: number) => Class;
  getTotalCredits: (requirement: Requirement) => number;
};

const RequirementItem = ({ requirement, onRequirementClick, getClass }: Props) => {
  return (
    <div
      style={{ cursor: "pointer", marginBottom: "8px" }}
      onClick={() => onRequirementClick(requirement)}
    >
      <h3
        style={{
          fontWeight: 600,
          display: "flex",
          justifyContent: "space-between",
          color: "#1f2937",
        }}
      >
        <span>{requirement.category}</span>
        <span>
          {requirement.isElective ? `${getClass().credits} credits` : }
        </span>
      </h3>
    </div>
  );
};

export default RequirementItem;