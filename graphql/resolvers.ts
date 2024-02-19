import prisma from "@/lib/prismadb"

export const resolvers = {
	Query: {
		locations: () => {
			return prisma.location.findMany()
		},
		restroomCodes: () => {
			return prisma.restroomCode.findMany()
		},
	},
}

