import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prismadb"

export async function GET(req: NextRequest) {
	const searchableParams = ["id", "name", "city", "zipcode", "state"]
	if (searchableParams.some((param) => req.nextUrl.searchParams.has(param))) {
		const searchParams = req.nextUrl.searchParams

		const whereQuery: any = {}
		for (const [key, value] of searchParams.entries()) {
			if (value == null) {
				break
			}
			if (key !== "id") {
				whereQuery[key] = value
			} else {
				whereQuery[key] = Number(value)
			}
		}

		const locations = await prisma.location.findMany({
			orderBy: {
				id: "desc",
			},
			where: whereQuery,
		})
		if (locations.length === 0) {
			return NextResponse.json({ error: "No matches" }, { status: 404 })
		}
		return NextResponse.json(locations)
	}

	const locations = await prisma.location.findMany({
		orderBy: {
			createdAt: "desc",
		},
	})
	return NextResponse.json(locations)
}

export async function POST(req: NextRequest) {
	const body = await req.json()

	const requiredFields = ["name", "city", "state", "bathroomCode"]
	const missingFields = requiredFields.filter((field) => !body[field])
	if (missingFields.length > 0) {
		return NextResponse.json(
			{ error: `Missing required fields: ${missingFields.join(", ")}` },
			{ status: 406 },
		)
	}

	try {
		const location = await prisma.location.create({
			data: {
				providerId: body.providerId,
				name: body.name,
				city: body.city,
				state: body.state,
				zipcode: body.zipcode,
				address: body.address,
				category: body.category,
				latitude: body.latitude,
				longitude: body.longitude,
				bathroomCodes: {
					create: {
						code: body.bathroomCode.code,
						required: body.bathroomCode.required,
					},
				},
			},
		})
		return NextResponse.json({ location }, { status: 201 })
	} catch (error) {
		return NextResponse.json({ error: error }, { status: 500 })
	}
}

export async function PUT(req: NextRequest) {
	const data = await req.json()

	if (data.id === null) {
		return NextResponse.json({ error: "Invalid id" }, { status: 406 })
	}

	const { removedId, ...dataWithoutId } = data

	const updatedLocation = await prisma.location.update({
		where: {
			id: Number(data.id),
		},
		update: {
			...dataWithoutId,
		},
	})
	return NextResponse.json(updatedLocation)
}
