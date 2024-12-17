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

export const convertTimeToMinutes = (time: string): number => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
}

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

export const convertScheduleDays = (dayStr: string): string[] => {
    // Handle special combinations first
    if (dayStr === 'MWF') {
        return ['Mon', 'Wed', 'Fri'];
    } else if (dayStr === 'MW') {
        return ['Mon', 'Wed'];
    } else if (dayStr === 'TuTh') {
        return ['Tue', 'Thu'];
    } else if (dayStr === 'Tu') {
        return ['Tue'];
    } else if (dayStr === 'MTuWTh') {
        return ['Mon', 'Tue', 'Wed', 'Thu'];
    } else if (dayStr === 'MTuW') {
        return ['Mon', 'Tue', 'Wed'];
    } else if (dayStr === 'TuWTh') {
        return ['Tue', 'Wed', 'Thu'];
    } else if (dayStr === 'MTh') {
        return ['Mon', 'Thu'];
    } else if (dayStr === 'MWTh') {
        return ['Mon', 'Wed', 'Thu'];
    } else if (dayStr === 'MThF') {
        return ['Mon', 'Thu', 'Fri'];
    } else if (dayStr === 'TuWF') {
        return ['Tue', 'Wed', 'Fri'];
    } else if (dayStr === 'MTuWThF') {
        return ['Mon', 'Wed', 'Fri'];
    }

    // Handle individual days or custom combinations
    const dayMappings: { [key: string]: string } = {
        'M': 'Mon',
        'Tu': 'Tue',
        'W': 'Wed',
        'Th': 'Thu',
        'F': 'Fri'
    };

    // Split into individual days using regex and map them
    const dayMatches = dayStr.match(/Tu|Th|[MWF]/g) || [];
    return dayMatches.map(d => dayMappings[d] || d);
};
