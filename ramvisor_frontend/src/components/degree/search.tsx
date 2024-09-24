import { Class } from "@graphql/generated/graphql";
import React from "react";
import { SortableCourse } from "./sortable-course";
import { BaseKey, useDelete } from "@refinedev/core";
import { REMOVE_CLASS_FROM_SEMESTER_MUTATION } from "@graphql/mutations";
import { Degree, Semester } from "@graphql/generated/graphql";

type Props = {
  getSemesters: Semester[];
  getClasses: Class[];
  getClass: (classId: number) => Class | undefined;
  removeFromSemester: (semesterId: string, courseId: number) => void;
  getDegreeScheduleEntryId: (courseId: number) => number | undefined;
};

const DegreeSearch = ({ getClasses, getSemesters, getClass }: Props) => {
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [searchResults, setSearchResults] = React.useState<Class[]>([]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    if (term) {
      setSearchResults(
        getClasses.filter(
          (course) =>
            course.classCode.toLowerCase().includes(term) ||
            course.description.toLowerCase().includes(term) &&
            !isCourseTaken(course.id)
        )
      );
    } else {
      setSearchResults([]);
    }
  };

  const isCourseTaken = (courseId: number): boolean => {
    return (
    getSemesters.some((sem: Semester) => 
      sem.entries?.some((entry) => entry?.classId === courseId)
  ));
  }

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
