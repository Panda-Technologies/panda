import {
  Class,
  ClassTakenResult,
  Requirement,
} from "@graphql/generated/graphql";
import React from "react";

type Props = {
  requirement: Requirement;
  onRequirementClick: (requirement: Requirement) => void;
  getClass: (classId: number) => Class | undefined;
  getTotalCredits: (requirement: Requirement) => number | null;
  checkClassTaken: (classIds: number[]) => ClassTakenResult[];
};

const RequirementItem = ({
  requirement,
  onRequirementClick,
  getClass,
  checkClassTaken,
  getTotalCredits,
}: Props) => {
  const calculateCreditsTaken = (requirement: Requirement) => {
    const classIds: number[] = requirement.classIds as number[];
    const classTakenResult = checkClassTaken(classIds);

    let credits = 0;
    classTakenResult.forEach((result) => {
      if (result.taken) {
        credits += getClass(result.classId)!.credits;
      }
    });

    return credits;
  };

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
          {requirement.isElective
            ? `${calculateCreditsTaken(requirement)}/${getTotalCredits(
                requirement
              )} credits`
            : `${calculateCreditsTaken(requirement)}/${getTotalCredits(
                requirement
              )}`}
        </span>
      </h3>
      <div
        style={{
          width: "100%",
          backgroundColor: "#e5e7eb",
          borderRadius: "9999px",
          height: "10px",
          marginTop: "4px",
        }}
      >
        <div
          style={{
            backgroundColor: "#2563eb",
            height: "10px",
            borderRadius: "9999px",
            width: `${
              calculateCreditsTaken(requirement) / getTotalCredits(requirement)!
            }`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default RequirementItem;
