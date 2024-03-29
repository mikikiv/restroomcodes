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
		restroomCodes: t.relation("restroomCodes"),
	}),
})

builder.queryField("locations", (t) =>
	t.prismaConnection({
		type: "Location",
		cursor: "id",
		args: {
			providerId: t.arg.string({ required: false }),
			category: t.arg.string({ required: false }),
			city: t.arg.string({ required: false }),
		},
		resolve: (query, _parent, args, _ctx, _info) =>
			prisma.location.findMany({
				...query,
				where: {
					...(args.providerId && { providerId: args.providerId }),
					...(args.category && {
						category: args.category,
					}),
					...(args.city && { city: args.city }),
				},
			}),
	}),
)