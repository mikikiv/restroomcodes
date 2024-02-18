import prisma from "@/lib/prismadb"
import { builder } from "graphql/builder"

builder.prismaObject("Location", {
	fields: (t) => ({
		id: t.exposeID("id"),
		providerId: t.exposeString("providerId", {
			nullable: true,
			description: "The provider's ID for the location",
		}),
		name: t.exposeString("name"),
		city: t.exposeString("city"),
		state: t.exposeString("state"),
		zipcode: t.exposeString("zipcode", { nullable: true }),
		address: t.exposeString("address", { nullable: true }),
		category: t.exposeString("category", { nullable: true }),
		latitude: t.exposeFloat("latitude", { nullable: true }),
		longitude: t.exposeFloat("longitude", { nullable: true }),
		bathroomCodes: t.relation("bathroomCodes"),
	}),
})

builder.queryField("locations", (t) =>
	t.prismaConnection({
		type: "Location",
		cursor: "id",
		resolve: (query, _parent, _args, _ctx, _info) =>
			prisma.location.findMany({ ...query }),
	}),
)