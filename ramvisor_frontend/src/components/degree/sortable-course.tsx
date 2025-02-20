import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import React from "react";
import { CSS } from "@dnd-kit/utilities";
import {getAlphabetColor, getClassColor} from "@utilities/helpers";
import { Class, Degree, Semester } from "@graphql/generated/graphql";

type Props = {
  course: Class;
  semesterId: number | undefined;
  Semesters: Semester[];
  degree: Degree | null;
  onRemoveFromSemester: (semesterId: number, courseId: number) => void;
};

export const SortableCourse = ({
  course,
  Semesters,
  onRemoveFromSemester,
}: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: course.id,
    });

  const getSemesterId = () => {
    if (Semesters) {
      for (const schedule of Semesters) {
        if (schedule.entries?.find((entry) => entry?.classId === course.id)) {
          return schedule.id;
        }
      }
    }
    return null;
  };
  

  const semesterId = getSemesterId();

// Add this function at the top of the file
    const toTitleCase = (str: string) => {
        return str.toLowerCase().split(' ').map(word =>
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    };


    const style: React.CSSProperties = {
        transform: CSS.Transform.toString(transform),
        transition,
        marginBottom: "4px",
        borderRadius: "4px",
        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
        display: "flex",
        alignItems: "center",
        backgroundColor: getAlphabetColor(course.classCode).bg,
        color: getAlphabetColor(course.classCode).text
    };

  const handleRemove = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (semesterId) {
      onRemoveFromSemester(semesterId, course.id);
    }
  };

  const getClassStatus = () => {
    if (Semesters) {
      for (const schedule of Semesters) {
        if (schedule.entries?.find((entry) => entry?.classId === course.id)) {
          return `Already added to ${schedule.id}`;
        }
      }
    }
    return null;
  };

  const status = getClassStatus();

  if (semesterId) {
    return (
      <div style={style}>
        <div
          ref={setNodeRef}
          {...attributes}
          {...listeners}
          style={{
            flexGrow: 1,
            padding: "4px",
            cursor: "move",
            fontSize: "12px",
          }}
        >
          <span style={{ fontWeight: "bold" }}>{course.classCode}</span>
        </div>
        <div>
          <button
            onClick={handleRemove}
            style={{
                padding: "0 4px",
                color: "#dc2626",
                cursor: "pointer",
                background: "none",
                border: "none"
            }}
          >
            ×
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        marginBottom: "8px",
        borderRadius: "8px",
        overflow: "hidden",
        boxShadow: "0 5px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
        <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            style={{...style, padding: "8px", cursor: "move"}}
        >
            <span style={{fontWeight: 'bold'}}>{course.classCode}</span>
        </div>
        <div style={{padding: '8px', backgroundColor: 'white', color: '#374151'}}>
        <div style={{fontSize: '14px', fontWeight: 600, marginBottom: '4px'}}>
            {toTitleCase(course.title)}
        </div>
        <div style={{fontSize: '12px', color: '#2563eb'}}>
            {course.courseType}
        </div>
        {status && (
            <div style={{fontSize: '12px', color: '#d97706', marginTop: '4px'}}>
                {status}
            </div>
            )}
        </div>
    </div>
  );
};
