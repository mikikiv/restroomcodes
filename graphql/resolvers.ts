import prisma from "@/lib/prismadb"

export const resolvers = {
	Query: {
		Locations: () => {
			return prisma.location.findMany()
		},
		BathroomCodes: () => {
			return prisma.bathroomCode.findMany()
		},
	},
}

