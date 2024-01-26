import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prismadb"

export async function GET(req: NextRequest) {
	if (
		req.nextUrl.searchParams.has("id") ||
		req.nextUrl.searchParams.has("code") ||
		req.nextUrl.searchParams.has("codeRequired") ||
		req.nextUrl.searchParams.has("valid") ||
		req.nextUrl.searchParams.has("verified")
	) {
		const searchParams = req.nextUrl.searchParams

		const where: any = {}
		for (const [key, value] of searchParams.entries()) {
			if (value !== null && value !== "") {
				if (key !== "id") {
					where[key] = value
				} else {
					where[key] = Number(value)
				}
			}
		}

		const codes = await prisma.bathroomCode.findMany({
			orderBy: {
				id: "desc",
			},
			where,
		})
		if (codes.length === 0) {
			return NextResponse.json({ error: "No matches" }, { status: 404 })
		}
		return NextResponse.json(codes)
	}

	const codes = await prisma.bathroomCode.findMany({
		orderBy: {
			createdAt: "desc",
		},
	})
	return NextResponse.json(codes)
}

export async function POST(req: NextRequest) {
	const formData = await req.formData()
	const code = formData.get("code")
	const codeRequired = formData.get("codeRequired")

	if (
		(code === undefined || code === "") &&
		(codeRequired === undefined || codeRequired === "")
	) {
		new NextResponse()
		return NextResponse.json({ error: "Invalid code" }, { status: 406 })
	}

	const data: any = {}

	for (const [key, value] of formData.entries()) {
		if (value == null) {
			break
		}
		if (value === "true" || value === "required") {
			data[key] = true
			break
		}
		if (value === "false" || value === "notRequired") {
			data[key] = false
			break
		}
		data[key] = value
	}

	const bathroomCode = await prisma.bathroomCode.create({
		data,
	})
	return NextResponse.json(bathroomCode)
}

export async function DELETE(req: NextRequest) {
	const id = (await req.formData()).get("id")
	if (id === null) {
		return NextResponse.json({ error: "Invalid id" }, { status: 406 })
	}
	const code = await prisma.bathroomCode.update({
		where: {
			id: Number(id),
		},
		data: {
			deletedAt: new Date(),
		},
	})
	return NextResponse.json(code)
}

export async function PUT(req: NextRequest) {
	const formData = await req.formData()
	const id = formData.get("id")

	if (id === null) {
		return NextResponse.json({ error: "Invalid id" }, { status: 406 })
	}

	const data: any = {}

	for (const [key, value] of formData.entries()) {
		if (value !== null && value !== "") {
			data[key] = value
		}
	}

	const { removedId, ...dataWithoutId } = data

	const updatedCode = await prisma.bathroomCode.update({
		where: {
			id: Number(dataWithoutId),
		},
		data,
	})
	return NextResponse.json(updatedCode)
}
