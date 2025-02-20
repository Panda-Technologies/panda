'use client';

import {Class, Requirement} from "@graphql/generated/graphql";
import React, {isValidElement, useCallback, useEffect, useMemo, useState} from "react";
import {SortableCourse} from "./sortable-course";
import {Degree, Semester} from "@graphql/generated/graphql";
import styled from "styled-components";

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
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [searchResults, setSearchResults] = useState<Class[]>([]);

    const isCourseTaken = useCallback((courseId: number): boolean => {
        return getSemesters.some((sem: Semester) =>
            sem.entries?.some((entry) => entry?.classId === courseId)
        );
    }, [getSemesters]);

    const takenCourseIds = useMemo(() => {
        const ids = new Set<number>();
        getSemesters.forEach(semester => {
            semester.entries?.forEach(entry => {
                if (entry?.classId) {
                    ids.add(entry.classId);
                }
            });
        });
        return ids;
    }, [getSemesters]);

    useEffect(() => {
        if (searchTerm) {
            setSearchResults(
                getClasses.filter(
                    (course) =>
                        (course.classCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            course.title.toLowerCase().includes(searchTerm.toLowerCase())) &&
                        !takenCourseIds.has(course.id)
                )
            );
        } else {
            setSearchResults([]);
        }
    }, [searchTerm, takenCourseIds, getClasses]);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const term = event.target.value.toLowerCase();
        setSearchTerm(term);

        if (term) {
            console.log(getClasses)
            setSearchResults(
                getClasses.filter(
                    (course) =>
                        (course.classCode.toLowerCase().includes(term) ||
                            course.title.toLowerCase().includes(term)) &&
                        !takenCourseIds.has(course.id)
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
                borderRight: "1px solid #e5e7eb",
                display: "flex",
                flexDirection: "column",
                height: "100vh",
            }}
        >
            <div style={{ flex: "0 0 auto" }}>
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
            </div>

            <ClassListWrapper>
                {searchResults.map((course) => (
                    <SortableCourse
                        Semesters={getSemesters}
                        course={course}
                        degree={getDegree}
                        onRemoveFromSemester={removeFromSemester}
                        semesterId={undefined}
                        key={course.id}
                    />
                ))}
            </ClassListWrapper>
        </div>
    );
};

const ClassListWrapper = styled.div`
    overflow-y: auto;
    height: calc(100vh - 120px); // Subtract header height
    padding-right: 8px;

    &::-webkit-scrollbar {
        width: 0;
    }

    /* Hide scrollbar for IE, Edge and Firefox */
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
`;

export default DegreeSearch;
