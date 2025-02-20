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
    checkClassTaken: (classIds: number[]) => number[] | undefined;
};

const RequirementItem = ({
                             requirement,
                             onRequirementClick,
                             getClass,
                             checkClassTaken,
                             getTotalCredits,
                         }: Props) => {
    const calculateTaken = (requirement: Requirement) => {
        const classIds: number[] = requirement.classIds as number[];
        const classTakenResult = checkClassTaken(classIds);

        if (requirement.reqType.toLowerCase() === "elective") {
            let credits = 0;
            classTakenResult?.forEach((result) => {
                credits += getClass(result)!.credits;
            });
            return credits;
        } else {
            return classTakenResult?.length || 0;
        }
    };

    const calculateTotalClasses = (requirement: Requirement) => {
        const categoryParts = requirement.category.split(';');
        if (categoryParts.length < 2) {
            return requirement.classIds.length;
        }

        const chooseText = categoryParts[1].trim().toLowerCase();

        if (chooseText.startsWith('choose')) {
            const matches = chooseText.match(/choose (\d+) of (\d+)/);
            if (matches) {
                return parseInt(matches[1]);
            }
        }

        const upToMatches = chooseText.match(/choose up to (\d+)/);
        if (upToMatches) {
            return parseInt(upToMatches[1]);
        }

        const atLeastMatches = chooseText.match(/choose at least (\d+)/);
        if (atLeastMatches) {
            return parseInt(atLeastMatches[1]);
        }

        return requirement.classIds.length;
    };

    const percentage = (calculateTaken(requirement) / (requirement.reqType === "ELECTIVE" ?
        getTotalCredits(requirement) :
        calculateTotalClasses(requirement))!) * 100;

    return (
        <div
            style={{cursor: "pointer", marginBottom: "8px"}}
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
                <span>{requirement.category.split(";")[0]}</span>
                <span>
          {requirement.reqType === "ELECTIVE"
              ? `${calculateTaken(requirement)}/${getTotalCredits(requirement)} credits`
              : `${calculateTaken(requirement)}/${calculateTotalClasses(requirement)}`}
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
                        width: `${percentage}%`,
                        transition: "all 500ms ease-in-out"
                    }}
                ></div>
            </div>
        </div>
    );
};

export default RequirementItem;