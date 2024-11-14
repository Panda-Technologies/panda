import {Course, DraggableCourseCard, Section} from "@components/courses/calendar";
import {useDrag} from "react-dnd";
import {useRef} from "react";

const DraggableCourse: React.FC<{ course: Course; section: Section }> = ({ course, section }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'course',
        item: { course, section },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    const ref = useRef<HTMLDivElement>(null);
    drag(ref);

    return (
        <DraggableCourseCard ref={ref} color={course.color} style={{ opacity: isDragging ? 0.5 : 1 }}>
            <div style={{ fontWeight: 'bold' }}>{course.id}<br />{course.name}</div>
            <div>{section.professor}</div>
            <div>{section.days} {section.startTime} - {section.endTime}</div>
        </DraggableCourseCard>
    );
};

export default DraggableCourse;