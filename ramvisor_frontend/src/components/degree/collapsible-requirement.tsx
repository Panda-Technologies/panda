import {
  CollapsibleRequirement as CollapsibleReq,
  Requirement,
} from "@app/degree/page";
import React from "react";

type Props = {
  requirement: CollapsibleReq;
  onRequirementClick: (requirement: Requirement) => void;
};

const CollapsibleRequirement = ({ requirement, onRequirementClick }: Props) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  return (
    <>
      <h3
        style={{
          fontWeight: 600,
          display: "flex",
          cursor: "pointer",
          justifyContent: "space-between",
          color: "#111827",
          alignItems: "8px",
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{requirement.name}</span>
        <span>{isOpen ? "▲" : "▼"}</span>
      </h3>
      {isOpen && (
        <div style={{ marginLeft: "16px", marginTop: "8px" }}>
          {requirement.subRequirements.map((subReq) => (
            <RequirementItem
              key={subReq.id}
              requirement={subReq}
              onRequirementClick={onRequirementClick}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default CollapsibleRequirement;
