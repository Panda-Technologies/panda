import { Class } from "@app/degree/page";
import React from "react";
import { SortableCourse } from "./sortable-course";
import { BaseKey, useDelete } from "@refinedev/core";
import { REMOVE_CLASS_FROM_DEGREE_SCHEDULE_MUTATION } from "@graphql/mutations";
import { Degree, DegreeSchedule } from "@graphql/generated/graphql";

type Props = {
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  getDegreeSchedules: () => DegreeSchedule[];
};

const DegreeSearch = ({ handleSearch, getDegreeSchedules }: Props) => {
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [searchResults, setSearchResults] = React.useState<Class[]>([]);

  const { mutate: removeClassFromSemester } = useDelete();

  const getDegreeScheduleEntryId = (courseId: number) => {
    const degreeSchedules: DegreeSchedule[] = getDegreeSchedules();
    if (degreeSchedules) {
    const entry = degreeSchedules.flatMap(schedule => schedule.entries).find(entry => entry?.classId === courseId);
    return entry?.id;
  }
  };

  const removeFromSemester = (semesterId: string, courseId: number) => {
    removeClassFromSemester({
      resource: "degree",
      id: getDegreeScheduleEntryId(courseId) ?? "" as BaseKey,
      values: {
        id: getDegreeScheduleEntryId(courseId) ?? "" as BaseKey
      },
      meta: {
        gqlMutation: REMOVE_CLASS_FROM_DEGREE_SCHEDULE_MUTATION
      }
    });
  };

  return (
    <div
      style={{
        width: "20%",
        padding: "16px",
        backgroundColor: "white",
        overflowY: "auto",
        borderRight: "1px solid #e5e7eb",
      }}
    >
      <input
        type="text"
        placeholder="Search for courses"
        value={searchTerm}
        onChange={handleSearch}
        style={{
          width: "100%",
          padding: "8px",
          marginBottom: "16px",
          borderRadius: "4px",
          border: "1px solid #d1d5db",
          backgroundColor: "white",
          color: "#111827",
        }}
      />
      <div style={{ marginBottom: '8px', color: '#4B5563' }}>
        Total items: {searchResults.length}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column'}}>
        {searchResults.map((course) => (
            <SortableCourse />
        ))}
      </div>
    </div>
  );
};

export default DegreeSearch;
