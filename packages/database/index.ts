import { PrismaClient, Prisma as P } from '@prisma/client';

export const db = new PrismaClient();
export const Prisma = P;
