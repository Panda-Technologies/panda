import Argon from 'argon2'
import {columnTypes, ISession} from './interface';
import { v4 as uuidv4 } from 'uuid';
import path from "path";
import * as fs from "node:fs";
import {parse} from "csv-parse";
import {intColumns} from "./constants";

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

export const parseCSV = (filepath: string, headers: string[]): Promise<columnTypes[]> => {
    return new Promise((resolve, reject) => {
        const csvFilePath = path.resolve(__dirname, filepath);
        const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });

        parse(fileContent, {
            delimiter: ',',
            columns: headers,
            cast: (columnVal, context) => {
                if (typeof context.column === 'string' && intColumns.includes(context.column)) {
                    return parseInt(columnVal, 10);
                }
                return columnVal;
            }
        }, (err, result: columnTypes[]) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

export const getStartTime = (timeString: string): string => {
    const [startTime] = timeString.split('-').map(t => t.trim());
    const [hours, minutes] = startTime.split(':').map(Number);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

export const getEndTime = (timeString: string): string => {
    const [, endTime] = timeString.split('-').map(t => t.trim());
    const [hours, minutes] = endTime.split(':').map(Number);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

export const processInstructor = (instructor: string): string => {
    if (!instructor || instructor === 'Staff') return 'Staff';

    try {
        // Trim any extra whitespace and remove the brackets if they exist
        const cleanInstructor = instructor.replace(/[\[\]"]/g, '').trim();

        // Split by comma to separate last name and first/middle names
        const [lastName, firstMiddle] = cleanInstructor.split(',').map(s => s.trim());
        if (!firstMiddle) return capitalizeWords(lastName);

        // Handle potential middle names
        const firstMiddleParts = firstMiddle.split(' ').map(s => s.trim());
        const capitalizedParts = firstMiddleParts.map(capitalizeWords);

        return `${capitalizedParts.join(' ')} ${capitalizeWords(lastName)}`;
    } catch (error) {
        console.error(`Error processing instructor name:`, instructor);
        return 'Staff';
    }
};


export const processDays = (daysStr: string): string => {
    if (!daysStr || daysStr === 'TBA') return 'TBA';
    return daysStr.trim();
};

export const processComponent = (component: string): string => {
    if (!component) return 'Lecture';
    // Extract just the main component type before the parentheses
    const match = component.match(/^([^(]+)/);
    return match ? match[1].trim() : 'Lecture';
};

export const capitalizeWords = (name: string): string => {
    return name
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
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
}
