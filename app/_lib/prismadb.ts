import { PrismaClient } from "@prisma/client"

declare global {
	const prisma: PrismaClient | undefined
}

// @ts-expect-error
const client = globalThis.prisma || new PrismaClient()

//@ts-expect-error
if (process.env.NODE_ENV !== "production") globalThis.prisma = client

export default client
