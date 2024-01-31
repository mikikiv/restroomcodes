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
	const formData = await req.formData()
	const requiredLocationData: { [key: string]: FormDataEntryValue | null } = {
		city: formData.get("city"),
		state: formData.get("state"),
		name: formData.get("name"),
	}
	const optionalLocationData = {
		address: formData.get("address"),
		zipcode: formData.get("zipcode"),
	}

	// if missing a required field, return an error which tells the user which field is missing
	for (const [key, value] of Object.entries(requiredLocationData)) {
		if (value === null) {
			return NextResponse.json({ error: `${key} is required` }, { status: 406 })
		}
	}

	const data: any = {}

	for (const [key, value] of formData.entries()) {
		if (typeof value === "string" && (value == null || value?.trim() === "")) {
			return NextResponse.json({ error: `${key} is required` }, { status: 406 })
		}
		data[key] = value
	}

	const location = await prisma.location.create({
		data,
	})
	return NextResponse.json(location)
}

export async function DELETE(req: NextRequest) {
	const id = (await req.formData()).get("id")
	if (id === null) {
		return NextResponse.json({ error: "Invalid id" }, { status: 406 })
	}
	try {
		const locations = await prisma.location.update({
			where: {
				id: Number(id),
				deletedAt: null,
			},
			data: {
				deletedAt: new Date(),
			},
		})
		return NextResponse.json(locations)
	} catch (error) {
		return NextResponse.json(
			{ error: "Location not found or already deleted" },
			{ status: 404 },
		)
	}
}

export async function PUT(req: NextRequest) {
	const formData = await req.formData()
	const id = formData.get("id")

	if (id === null) {
		return NextResponse.json({ error: "Invalid id" }, { status: 406 })
	}

	const data: any = {}

	for (const [key, value] of formData.entries()) {
		if (key === "id") {
			break
		}
		if (value != null && value !== "") {
			data[key] = value
		}
	}

	const { removedId, ...dataWithoutId } = data

	const updatedLocation = await prisma.location.update({
		where: {
			id: Number(id),
		},
		data,
	})
	return NextResponse.json(updatedLocation)
}
