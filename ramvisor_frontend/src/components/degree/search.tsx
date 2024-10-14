'use client';

import {Class, Requirement} from "@graphql/generated/graphql";
import React, {isValidElement, useCallback, useMemo} from "react";
import {SortableCourse} from "./sortable-course";
import {BaseKey, useDelete} from "@refinedev/core";
import {REMOVE_CLASS_FROM_SEMESTER_MUTATION} from "@graphql/mutations";
import {Degree, Semester} from "@graphql/generated/graphql";
import {ExceptionMap} from "antd/es/result";
import {get} from "http";

type Props = {
    getSemesters: Semester[];
    getDegree: Degree | null;
    getClasses: Class[];
    getClass: (classId: number) => Class | undefined;
    removeFromSemester: (semesterId: number, courseId: number) => void;
    getDegreeScheduleEntryId: (courseId: number) => number | undefined;
    requirement: Requirement | null;
    setShowRequirementDetails: (show: boolean) => void;
};

const DegreeSearch = ({
                          getClasses,
                          getSemesters,
                          getClass,
                          requirement,
                          setShowRequirementDetails,
                          removeFromSemester,
                          getDegree
                      }: Props) => {
    const [searchTerm, setSearchTerm] = React.useState<string>("");
    const [searchResults, setSearchResults] = React.useState<Class[]>([]);

    const isCourseTaken = React.useCallback((courseId: number): boolean => {
        return getSemesters.some((sem: Semester) =>
            sem.entries?.some((entry) => entry?.classId === courseId)
        );
    }, [getSemesters]);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const term = event.target.value.toLowerCase();
        setSearchTerm(term);

        if (term) {
            setSearchResults(
                getClasses.filter(
                    (course) =>
                        course.classCode.toLowerCase().includes(term) ||
                        (course.description.toLowerCase().includes(term) &&
                            !isCourseTaken(course.id))
                )
            );
        } else {
            setSearchResults([]);
        }
    };

    const getUniqueFilteredCourses = React.useCallback((requirement: Requirement): Class[] => {
        if (!requirement || !requirement.classIds) {
            throw new Error("Invalid requirement object: " + JSON.stringify(requirement));
        }
        const uniqueCoursesMap = new Map<number, Class>();
        requirement.classIds.forEach((req) => {
            if (req && !isCourseTaken(req)) {
                const course = getClass(req);
                if (course) {
                    uniqueCoursesMap.set(course.id, course);
                }
            }
        });
        return Array.from(uniqueCoursesMap.values());
    }, [getClass, isCourseTaken]);

    const uniqueFilteredCourses = React.useMemo(
        () => requirement ? getUniqueFilteredCourses(requirement) : [],
        [requirement, getUniqueFilteredCourses]
    );

    const handleFindCourses = (requirement: Requirement) => {
        if (!requirement || !requirement.classIds) {
            throw new Error("Invalid requirement object: " + JSON.stringify(requirement));
        }
        setSearchResults(uniqueFilteredCourses);
        setShowRequirementDetails(false);
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
            <div style={{ marginBottom: "8px", color: "#4B5563" }}>
                Total items: {searchResults.length}
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
                {searchResults.map((course) => (
                    <SortableCourse
                        Semesters={getSemesters}
                        course={course}
                        degree={getDegree}
                        onRemoveFromSemester={removeFromSemester}
                        semesterId={getSemesters.find((semester) =>
                            semester.entries?.some((entry) => entry?.classId === course.id)
                        )?.id}
                        key={course.id}
                    />
                ))}
            </div>
        </div>
    );
};

export default DegreeSearch;
