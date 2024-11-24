import dayjs from "dayjs";
import {GetFieldsFromList} from "@refinedev/nestjs-query";

import nookies from "nookies";
import {Class, Degree} from "@graphql/generated/graphql";
import {useGetIdentity} from "@refinedev/core";
import React from "react";

interface MappedDealData {
    timeUnix: number;
    timeText: string;
    value: number;
    state: string;
}

// Get the date in the format "MMM DD, YYYY - HH:mm"
export const getDate = (startDate: string, endDate: string) => {
    const start = dayjs(startDate).format("MMM DD, YYYY - HH:mm");
    const end = dayjs(endDate).format("MMM DD, YYYY - HH:mm");

    return `${start} - ${end}`;
};

export const getClassColor = (course: Class, degree: Degree | null): React.CSSProperties | null => {
    if (degree) {
        const colors: { [key: string]: React.CSSProperties } = {
            core: {backgroundColor: "#e9d5ff", color: "#581c87"},
            prerequisite: {backgroundColor: "#fce7f3", color: "#831843"},
            elective: {backgroundColor: "#dbeafe", color: "#1e3a8a"},
            default: {backgroundColor: "#e0e7ff", color: "#312e81"},
        };

        if (!course.electiveDegreeId || course.electiveDegreeId.length === 0) return colors.default;
        if (course.category.includes('core')) return colors.core;
        if (course.category.includes('elective')) return colors.elective;

        return colors.default;
    }
    return null;
};
