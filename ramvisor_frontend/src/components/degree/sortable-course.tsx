import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import React from "react";
import { CSS } from "@dnd-kit/utilities";
import { getClassColor } from "@utilities/helpers";
import { Class, Degree, DegreeSchedule } from "@graphql/generated/graphql";
import { get } from "http";

type Props = {
  onRemoveFromSemester: (semesterId: String, courseId: number) => void;
  course: Class;
  semesterId?: String;
  DegreeSchedules?: DegreeSchedule[];
  degree: Degree;
};

export const SortableCourse = ({
  course,
  semesterId,
  onRemoveFromSemester,
  DegreeSchedules,
  degree,
}: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: course.id,
    });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    ...getClassColor(course, degree),
    marginBottom: "4px",
    borderRadius: "4px",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
    display: "flex",
    alignItems: "center",
  };

  const handleRemove = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (semesterId) {
      onRemoveFromSemester(semesterId, course.id);
    }
  };

  const getClassStatus = () => {
    if (semesterId && DegreeSchedules) {
      for (const schedule of DegreeSchedules) {
        if (schedule.entries?.find((entry) => entry?.classId === course.id)) {
          return `Already added to ${schedule.semesterId}`;
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
          <span style={{ fontWeight: "bold" }}>{course.id}</span>
        </div>
        <div>
          <button
            onclick={handleRemove}
            style={{
              padding: "0 4px",
              color: "#dc2626",
              cursor: "pointer",
              background: "none",
              border: "none",
            }}
          ></button>
        </div>
      </div>
    );
  }
};
