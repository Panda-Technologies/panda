import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { Session, SessionData } from "express-session";
import {classColumns} from "./constants";

declare module 'express-session' {
    interface SessionData {
        userId?: string;
        initialized?: boolean;
    }
}

export interface ISession extends Session, SessionData {
    userId?: string;
}

export interface IMyContext {
    req: Request & { session: ISession };
    res: Response;
    prisma: PrismaClient;
    session: ISession;
}

export interface columnTypes {
    [classColumns.ID]: number;
    [classColumns.CODE]: string;
    [classColumns.SUBJECT]: string;
    [classColumns.CATALOG_NBR]: number;
    [classColumns.SECTION]: number;
    [classColumns.CLASS_NBR]: number;
    [classColumns.COURSE_TITLE]: string;
    [classColumns.COMPONENT]: string;
    [classColumns.UNITS]: number;
    [classColumns.TOPICS]: string;
    [classColumns.BUILDING]: string;
    [classColumns.ROOM]: string;
    [classColumns.DAYS]: string;
    [classColumns.TIME]: string;
    [classColumns.INSTRUCTOR]: string;
    [classColumns.ENROLL_CAP]: number;
    [classColumns.ENROLL_TOTAL]: number;
    [classColumns.WAIT_CAP]: number;
    [classColumns.WAIT_TOTAL]: number;
    [classColumns.MIN_ENROLL]: number;
}

export interface canvasClass {
    classCode: string;
    sectionId: string;
    semesterId: string;
    color: string;
}
export interface canvasTasks {
    classCode: string;
    assignment: {
        dueDate: string;
        stageId: number;
        description: string;
        title: string;
    }[];
}

