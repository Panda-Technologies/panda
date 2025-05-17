import Argon from 'argon2'
import {ISession} from './interface';
import { v4 as uuidv4 } from 'uuid';
import path from "path";
import * as fs from "node:fs";
import {parse} from "csv-parse";

export const hashPassword = async (password: string): Promise<string> => {
        return await Argon.hash(password);
};

export const verifyPassword = async(password: string, hashedPassword: string) => {
    return await Argon.verify(hashedPassword, password) as boolean;
};

export const isProd = () => process.env.NODE_ENV === 'production';

export const isAuthenticated = (session: ISession): boolean => {return !!session.userId;};

export const generateUUID = (): string => {
    return uuidv4();
}

export const parseCSV = <T>(filepath: string, headers: string[], intColumnType: string[]): Promise<T[]> => {
    return new Promise((resolve, reject) => {
        const csvFilePath = path.resolve('/Users/maxim/Desktop/Computer Science/panda/ramvisor_backend/', filepath);
        const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });

        parse(fileContent, {
            delimiter: ',',
            columns: headers,
            cast: (columnVal, context) => {
                if (typeof context.column === 'string' && intColumnType.includes(context.column)) {
                    return parseInt(columnVal, 10);
                }
                return columnVal;
            }
        }, (err, result: T[]) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}
/**
 * Converts time from "08:00 AM" format to 24-hour "08:00" format
 */
export const convertTo24Hour = (timeStr: string): string => {
    if (!timeStr) return '00:00';

    // Parse hours, minutes, and AM/PM
    const match = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
    if (!match) return '00:00';

    let hours = parseInt(match[1], 10);
    const minutes = match[2];
    const period = match[3].toUpperCase();

    // Convert to 24-hour format
    if (period === 'PM' && hours < 12) {
        hours += 12;
    } else if (period === 'AM' && hours === 12) {
        hours = 0;
    }

    return `${hours.toString().padStart(2, '0')}:${minutes}`;
};

/**
 * Process time string from format like "TTH 11:00 AM-12:15 PM" to extract start/end times
 */
export const processTime = (timeStr: string): { startTime: string, endTime: string } => {
    if (!timeStr || timeStr.trim().includes("TBA") || timeStr.trim().includes("NULL")) {
        return { startTime: '00:00', endTime: '00:00' };
    }

    try {
        // Extract the time part after the day code
        const timeMatch = timeStr.match(/[A-Za-z]+\s+(.*)/);
        if (!timeMatch || !timeMatch[1]) {
            return { startTime: '00:00', endTime: '00:00' };
        }

        const timePart = timeMatch[1];
        const [startTimeStr, endTimeStr] = timePart.split('-').map(t => t.trim());

        return {
            startTime: convertTo24Hour(startTimeStr),
            endTime: convertTo24Hour(endTimeStr)
        };
    } catch (error) {
        console.error(`Error processing time: ${timeStr}`);
        return { startTime: '00:00', endTime: '00:00' };
    }
};

/**
 * Extract and standardize day code from schedule string like "TTH 11:00 AM-12:15 PM"
 */
export const extractDayCode = (scheduleStr: string): string => {
    if (!scheduleStr || scheduleStr.trim().includes("TBA") || scheduleStr.trim().includes("NULL") || scheduleStr.trim().includes("Room unknown")) {
        return 'TBA';
    }

    // Extract the day code part before the time
    const dayMatch = scheduleStr.match(/^([A-Za-z]+)\s+/);
    if (!dayMatch || !dayMatch[1]) {
        return 'TBA';
    }

    // Standardize day codes
    const dayCode = dayMatch[1].trim().toUpperCase();

    // Convert common day codes to standard format
    switch (dayCode) {
        case 'M': return 'M';
        case 'T': return 'T';
        case 'W': return 'W';
        case 'TH': return 'Th';
        case 'F': return 'F';
        case 'S': return 'S';
        case 'SU': return 'Su';
        case 'MW': return 'MW';
        case 'MF': return 'MF';
        case 'MT': return 'MT';
        case 'WF': return 'WF';
        case 'TTH':
        case 'TR':
            return 'TTh';
        case 'MWF': return 'MWF';
        case 'SSU': return 'SSu';
        default: return dayCode;
    }
};

/**
 * Format instructor name to "First Middle Last" format
 */
export const processInstructorName = (instructor: string): string => {
    if (!instructor || instructor === 'Staff') return 'Staff';

    // Handle special cases
    if (instructor === 'Schedule unknown') return 'Staff';

    try {
        // Trim any extra whitespace and remove the brackets/quotes if they exist
        const cleanInstructor = instructor.replace(/[\[\]"]/g, '').trim();

        // Split by comma to separate last name and first/middle names
        const parts = cleanInstructor.split(',').map(s => s.trim());

        if (parts.length < 2) {
            // If there's no comma, just capitalize each word and return
            return cleanInstructor.split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                .join(' ');
        }

        const lastName = parts[0];
        const firstMiddle = parts.slice(1).join(' '); // Join all other parts as first/middle names

        // Capitalize first letter of each name part
        const capitalizedLastName = lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase();
        const capitalizedFirstMiddle = firstMiddle.split(' ')
            .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
            .join(' ');

        // Return in "First Middle Last" format
        return `${capitalizedFirstMiddle} ${capitalizedLastName}`;
    } catch (error) {
        console.error(`Error processing instructor name:`, instructor);
        return 'Staff';
    }
};

export const getCurrentSemester = (): string => {
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    if (month >= 0 && month <= 4) {
        return `Spring ${year}`;
    } else if (month >= 5 && month <= 7) {
        return `Summer ${year}`;
    } else {
        return `Fall ${year}`;
    }
};

export const authenticateUser = (session: ISession): string => {
    if (!session.userId) {
        throw new Error("Not authenticated");
    }
    return session.userId;
};



