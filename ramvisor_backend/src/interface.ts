import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { Session, SessionData } from "express-session";
import {classColumns, degreeColumns} from "./constants";
import Redis from "ioredis";

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
    redis: Redis;
}

export interface classColumnTypes {
    [classColumns.CODE]: string;
    [classColumns.COURSE_TITLE]: string;
    [classColumns.UNITS]: number;
    [classColumns.BUILDING]: string;
    [classColumns.DAYS]: string;
    [classColumns.SCHEDULE]: string;
    [classColumns.INSTRUCTOR]: string;
    [classColumns.ENROLL_CAP]: number;
    [classColumns.ENROLL_TOTAL]: number;
}

export interface degreeColumnTypes {
    [degreeColumns.COURSE]: string;
    [degreeColumns.COURSE_NAME]: string;
    [degreeColumns.TYPE]: string;
    [degreeColumns.IDEAs]: string;
    [degreeColumns.PREREQUISITES]: string;
    [degreeColumns.CREDIT_HOURS]: number;
}

export interface canvasClass {
    classCode: string;
    sectionId: string;
    semesterId: string;
    color: string;
}

export interface DegreeRequirement {
    degreeId: number;
    category: string;
    classIds: number[];
    reqType: string;
}

