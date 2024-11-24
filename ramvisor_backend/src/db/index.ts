import { PrismaClient } from "@prisma/client";

export const getMyPrismaClient = async (): Promise<PrismaClient> => {
    return new PrismaClient({ log: ['error', 'info', 'query', 'warn'] });
};