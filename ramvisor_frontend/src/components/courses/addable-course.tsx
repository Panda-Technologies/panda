import {Course, AddableCourseCard, Section} from "@components/courses/calendar";
import React from "react";

const AddableCourse: React.FC<{ course: Course; section: Section }> = ({ course, section }) => {


    return (
        <AddableCourseCard color={course.color}>
            <div style={{ fontWeight: 'bold' }}>{course.id}<br />{course.name}</div>
            <div>{section.professor}</div>
            <div>{section.days} {section.startTime} - {section.endTime}</div>
        </AddableCourseCard>
    );
};

export default AddableCourse;