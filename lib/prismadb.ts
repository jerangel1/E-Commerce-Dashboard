import { PrismaClient } from "@prisma/client"
import { defaultMaxListeners } from "events";

declare global {
    var prisma: PrismaClient | undefined
};

const prismadb = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalThis.prisma = prismadb;

export default prismadb;