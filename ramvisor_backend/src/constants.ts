export const NOT_AUTHENTICATED = 'Not Authenticated';
export const NOT_AUTHORIZED = 'Not Authorized';
export const NOT_FOUND = 'Not Found';
export const INVALID_CREDENTIALS = 'Invalid Credentials';
export enum classColumns {
    ID = 'id',
    CODE = 'code',
    SUBJECT = 'subject',
    CATALOG_NBR = 'catalog nbr',
    SECTION = 'section',
    CLASS_NBR = 'class nbr',
    COURSE_TITLE = 'course title',
    COMPONENT = 'component',
    UNITS = 'units',
    TOPICS = 'topics',
    BUILDING = 'Bldg',
    ROOM = 'room',
    DAYS = 'days',
    TIME = 'time',
    INSTRUCTOR = 'Instructor',
    ENROLL_CAP = 'Class Enrl Cap',
    ENROLL_TOTAL = 'Class Enrl Tot',
    WAIT_CAP = 'Class Wait Cap',
    WAIT_TOTAL = 'Class Wait Tot',
    MIN_ENROLL = 'Class Min Enrl',
}

export const intColumns: string[] = [
    classColumns.ID,
    classColumns.CATALOG_NBR,
    classColumns.SECTION,
    classColumns.CLASS_NBR,
    classColumns.UNITS,
    classColumns.ENROLL_CAP,
    classColumns.ENROLL_TOTAL,
    classColumns.WAIT_CAP,
    classColumns.WAIT_TOTAL,
    classColumns.MIN_ENROLL
];

export const headers = [
    'id',
    'code',
    'subject',
    'catalog nbr',
    'section',
    'class nbr',
    'course title',
    'component',
    'units',
    'topics',
    'Bldg',
    'room',
    'days',
    'time',
    'Instructor',
    'Class Enrl Cap',
    'Class Enrl Tot',
    'Class Wait Cap',
    'Class Wait Tot',
    'Class Min Enrl',
];
