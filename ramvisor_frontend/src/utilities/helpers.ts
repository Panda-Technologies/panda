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
    if (!time) return 0;
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

export const processDays = (days?: string[]): string => {
    if (!days || days.length === 0) return 'TBA';
    const dayMap: { [key: string]: string } = {
        'Monday': 'M',
        'Tuesday': 'Tu',
        'Wednesday': 'W',
        'Thursday': 'Th',
        'Friday': 'F'
    };

    return ['M', 'Tu', 'W', 'Th', 'F']
        .filter(abbr => days.some(day => dayMap[day] === abbr))
        .join('');
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

export const getAlphabetColor = (courseCode: string) => {
    const colors: { [key: string]: { bg: string, text: string } } = {
        'A': { bg: '#E3F2FD', text: '#1565C0' },   // Light Blue
        'B': { bg: '#BBDEFB', text: '#1565C0' },   // Lighter Blue
        'C': { bg: '#90CAF9', text: '#1565C0' },   // Soft Blue
        'D': { bg: '#64B5F6', text: '#FFFFFF' },   // Medium Blue
        'E': { bg: '#FFE0B2', text: '#E65100' },   // Light Orange
        'F': { bg: '#FFCC80', text: '#E65100' },   // Soft Orange
        'G': { bg: '#E1F5FE', text: '#0277BD' },   // Sky Blue
        'H': { bg: '#B3E5FC', text: '#0277BD' },   // Lighter Sky Blue
        'I': { bg: '#81D4FA', text: '#0277BD' },   // Medium Sky Blue
        'J': { bg: '#FFE0B2', text: '#E65100' },   // Light Orange
        'K': { bg: '#FFCCBC', text: '#BF360C' },   // Light Red
        'L': { bg: '#FFAB91', text: '#BF360C' },   // Soft Red
        'M': { bg: '#E3F2FD', text: '#1565C0' },   // Light Blue
        'N': { bg: '#BBDEFB', text: '#1565C0' },   // Lighter Blue
        'O': { bg: '#FFE0B2', text: '#E65100' },   // Light Orange
        'P': { bg: '#FFCCBC', text: '#BF360C' },   // Light Red
        'Q': { bg: '#E1F5FE', text: '#0277BD' },   // Sky Blue
        'R': { bg: '#B3E5FC', text: '#0277BD' },   // Lighter Sky Blue
        'S': { bg: '#90CAF9', text: '#1565C0' },   // Soft Blue
        'T': { bg: '#FFE0B2', text: '#E65100' },   // Light Orange
        'U': { bg: '#E3F2FD', text: '#1565C0' },   // Light Blue
        'V': { bg: '#BBDEFB', text: '#1565C0' },   // Lighter Blue
        'W': { bg: '#FFE0B2', text: '#E65100' },   // Light Orange
        'X': { bg: '#FFCCBC', text: '#BF360C' },   // Light Red
        'Y': { bg: '#E1F5FE', text: '#0277BD' },   // Sky Blue
        'Z': { bg: '#B3E5FC', text: '#0277BD' },   // Lighter Sky Blue
    };

    const firstLetter = courseCode.charAt(0).toUpperCase();
    return colors[firstLetter] || { bg: '#E3F2FD', text: '#1565C0' };
};
