import {Course, DraggableCourseCard, Section} from "@components/courses/calendar";
import {useDrag} from "react-dnd";

const DraggableCourse: React.FC<{ course: Course; section: Section }> = ({ course, section }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'course',
        item: { course, section },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    return (
        <DraggableCourseCard ref={drag} color={course.color} style={{ opacity: isDragging ? 0.5 : 1 }}>
            <div style={{ fontWeight: 'bold' }}>{course.id} - {course.name}</div>
            <div>{section.id} - {section.professor}</div>
            <div>{section.days.join(', ')} {section.startTime} - {section.endTime}</div>
        </DraggableCourseCard>
    );
};

export default DraggableCourse;