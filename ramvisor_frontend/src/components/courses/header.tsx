import styled from "styled-components";
import {ClassSchedule} from "@graphql/generated/graphql";
import React from "react";
import {Card} from "antd";

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px;
    margin-top: 75px;
    margin-bottom: 0;
    z-index: 2;
    width: 100%;
`;

type Props = {
    activeSchedule: ClassSchedule | undefined;
    handleNewSchedule: (name: string, semesterId: string) => void;
    handleResetSchedule: (name: string, semesterId: string) => void;
    scheduleList: ClassSchedule[] | undefined;
    handleLoadPlanner: (scheduleId: string) => void;
}

const CalendarHeader: React.FC<Props> = ({activeSchedule}) => {

    return (
        <Header>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "0.4rem 0.6rem",
                    backgroundColor: "orange",
                    borderRadius: "1rem",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                    margin: "0",
                    border: "0.07rem solid black",
                    position: "relative",
                    overflow: "hidden"
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        marginTop: '-5px',
                        marginBottom: '-5px'
                    }}
                >
        <span
            style={{
                fontSize: "11px",
                color: "black",
                marginBottom: "0.15rem",
                fontWeight: 500
            }}
        >
            Current Semester
        </span>
                    <span
                        style={{
                            fontSize: "12px",
                            color: "#111827",
                            fontWeight: 600,
                            letterSpacing: "0.025em",
                        }}
                    >
            {activeSchedule?.semesterId || "No Semester Selected"}
        </span>
                </div>
            </div>
            <div
                style={{
                    fontSize: "14px",
                    color: "#1F2937",
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <button
                    style={{
                        marginRight: "8px",
                        padding: "4px 8px",
                        backgroundColor: "#6599f6",
                        color: "white",
                        borderRadius: "4px",
                        fontWeight: 500,
                        borderTopRightRadius: "0.375rem",
                        borderTopLeftRadius: "0.375rem",
                        borderBottomLeftRadius: "0.375rem",
                    }}
                >
                    New Schedule
                </button>
                <button
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
                    style={{
                        marginRight: "8px",
                        padding: "4px 8px",
                        backgroundColor: "white",
                        color: "#1F2937",
                        borderRadius: "4px",
                    }}
                    aria-label="Select a planner"
                >
                    <option value="">Select a schedule</option>
                </select>
            </div>
        </Header>
    )
}

export default CalendarHeader;
