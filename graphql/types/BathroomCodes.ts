import prisma from "@/lib/prismadb"
import { builder } from "graphql/builder"

builder.prismaObject("BathroomCode", {
	fields: (t) => ({
		id: t.exposeID("id"),
		code: t.exposeString("code", { nullable: true }),
		codeRequired: t.exposeBoolean("codeRequired"),
		valid: t.exposeBoolean("valid"),
		verified: t.exposeBoolean("verified"),
		createdAt: t.expose("createdAt", { type: "Date" }),
		updatedAt: t.expose("updatedAt", { type: "Date" }),
		deletedAt: t.expose("deletedAt", { nullable: true, type: "Date" }),
		locationId: t.relation("location", {
			description: "The location of the bathroom code",
		}),
	}),
})

builder.queryField("bathroomCodes", (t) =>
	t.prismaConnection({
		type: "BathroomCode",
		cursor: "id",
		args: {
			locationId: t.arg.int({ required: false }),
			codeRequired: t.arg.boolean({ required: false }),
		},
		resolve: (query, _parent, args, _ctx, _info) =>
			prisma.bathroomCode.findMany({
				...query,
				where: {
					...(args.locationId && { locationId: args.locationId }),
					...(args.codeRequired !== undefined && {
						codeRequired: args.codeRequired,
					}),
				},
			}),
	}),
)