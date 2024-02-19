import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
async function main() {
	const locations = await prisma.location.upsert({
		where: { id: 1 },
		update: {},
		create: {
			zipcode: null,
			city: "Richmond",
			providerId: "poi.26702",
			address: "2453 Hilltop Mall Rd",
			name: "McDonald's",
			state: "California",
			category: "fast food",
			latitude: 37.983318,
			longitude: -122.329803,
			bathroomCodes: {
				create: [
					{
						valid: false,
						verified: false,
						codeRequired: false,
						code: "",
						createdAt: "2024-01-07T01:06:11.950Z",
						updatedAt: "2024-01-07T01:06:11.950Z",
						deletedAt: "2024-01-07T01:07:11.950Z",
					},
					{
						valid: true,
						verified: true,
						codeRequired: true,
						code: "1234",
						createdAt: "2024-01-07T01:06:11.950Z",
						updatedAt: "2024-01-08T01:06:11.950Z",
						deletedAt: null,
					},
					{
						valid: true,
						verified: false,
						codeRequired: false,
						code: "",
						createdAt: new Date(),
						updatedAt: new Date(),
						deletedAt: null,
					},
				],
			},
		},
	})
	console.log({ locations })
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async (e) => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})