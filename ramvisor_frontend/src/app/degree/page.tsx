"use client";

import DegreeHeader from "@components/degree/header";
import DegreeSearch from "@components/degree/search";
import { DegreeSchedule } from "@graphql/generated/graphql";
import React from "react";

type Props = {};

export interface Degree {
  id: number;
  name: String;
  numberOfCores: number;
  numberOfElectives: number;
}
export interface DegreeScheduleEntry {
  id: number;
  degreeScheduleId: number;
  classId: number;
  degreeSchedule: DegreeSchedule;
  class: Class;
}

export interface Class {
  id: number;
  classCode: String;
  courseType: String;
  title: String;
  dayOfWeek: String;
  startTime: Date;
  endTime: Date;
  color: String;
  professor: String;
  rateMyProfessorRating: number;
  coreDegreeId: number;
  electiveDegreeId: number[];
}

const DegreePage = (props: Props) => {
  const getPlanners = (): DegreeSchedule[] => {
    const planners: DegreeSchedule[] = [];
    return planners;
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          backgroundColor: "#f3f4f6",
        }}
      >
        <DegreeHeader getPlanners={getPlanners} />
      </div>
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <DegreeSearch getDegreeSchedules={getPlanners}/>
      </div>
    </>
  );
};

export default DegreePage;
