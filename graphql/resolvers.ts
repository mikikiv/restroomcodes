import prisma from "@/lib/prismadb"

export const resolvers = {
	Query: {
		locations: () => {
			return prisma.location.findMany()
		},
		bathroomCodes: () => {
			return prisma.bathroomCode.findMany()
		},
	},
}

