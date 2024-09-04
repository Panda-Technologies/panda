import {
    SortableContext,
    arrayMove,
    verticalListSortingStrategy,
    useSortable,
  } from "@dnd-kit/sortable";
import React from "react";
import { CSS } from "@dnd-kit/utilities";
import { getClassColor } from "@utilities/helpers";
import { Class, Degree } from "@graphql/generated/graphql";

type Props = {
    onRemoveFromSemester: (semesterId: string, courseId: string) => void;
    course: Class;
    semesterId?: string;
    semesters: string[];
    degree: Degree;
}

export const SortableCourse = ({ course, semesterId, onRemoveFromSemester, semesters, degree }: Props) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: course.id,
    });

    const style: React.CSSProperties = {
        transform: CSS.Transform.toString(transform),
        transition,
        ...getClassColor(course, degree),
        marginBottom: '4px',
        borderRadius: '4px',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
        display: 'flex',
        alignItems: 'center',
    };

    const handleRemove = (event: React.MouseEvent) => {
        event.preventDefault();
    }
};