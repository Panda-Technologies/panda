import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { Session, SessionData } from "express-session";

export interface ISession extends Session, SessionData {
    userId?: string;
}

export interface IMyContext {
    req: Request,
    res: Response,
    prisma: PrismaClient
    session: ISession
}