export const NOT_AUTHENTICATED = 'Not Authenticated';
export const NOT_AUTHORIZED = 'Not Authorized';
export const NOT_FOUND = 'Not Found';
export const INVALID_CREDENTIALS = 'Invalid Credentials';
export enum classColumns {
    CODE = 'course_code',
    COURSE_TITLE = 'title',
    ENROLL_TOTAL = 'available_seats',
    ENROLL_CAP = 'total_seats',
    INSTRUCTOR = 'instructor',
    SCHEDULE = 'schedule',
    BUILDING = 'location',
    UNITS = 'credit_hours',
    DAYS = 'date_range',
}

export enum degreeColumns {
    COURSE = 'Course',
    COURSE_NAME = 'Course Name',
    TYPE = 'Type',
    IDEAs = 'IDEAs in Action Gen Ed',
    PREREQUISITES = 'Prerequisites',
    CREDIT_HOURS = 'Credit Hours',
}

export const intColumns: string[] = [
    classColumns.UNITS,
    classColumns.ENROLL_CAP,
    classColumns.ENROLL_TOTAL,
];

export const degreeIntColumns: string[] = [
    degreeColumns.CREDIT_HOURS
];

export const classHeaders = [
    'course_code',
    'title',
    'available_seats',
    'total_seats',
    'instructor',
    'schedule',
    'location',
    'credit_hours',
    'date_range',
];

export const degreeHeaders = [
    'Course',
    'Course Name',
    'Type',
    'IDEAs in Action Gen Ed',
    'Prerequisites',
    'Credit Hours',
]
