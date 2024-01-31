import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prismadb"

export async function GET(req: NextRequest) {
	const searchableParams = [
		"id",
		"code",
		"codeRequired",
		"valid",
		"verified",
		"locationId",
	]
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

		const codes = await prisma.bathroomCode.findMany({
			orderBy: {
				id: "desc",
			},
			where: whereQuery,
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
	try {
		const code = await prisma.bathroomCode.update({
			where: {
				id: Number(id),
				deletedAt: null,
			},
			data: {
				deletedAt: new Date(),
			},
		})
		return NextResponse.json(code)
	} catch (error) {
		return NextResponse.json(
			{ error: "Code not found or already deleted" },
			{ status: 404 },
		)
	}
}

export async function PUT(req: NextRequest) {
	const formData = await req.formData()
	const id = formData.get("id")

	if (id == null) {
		return NextResponse.json({ error: "Invalid id" }, { status: 406 })
	}

	const data: any = {}

	for (const [key, value] of formData.entries()) {
		if (key === "id") {
			break
		}
		if (value === "true" || value === "required") {
			data[key] = true
		}
		if (value === "false" || value === "notRequired") {
			data[key] = false
		}
		if (value != null && value !== "") {
			data[key] = value
		}
	}


	const updatedCode = await prisma.bathroomCode.update({
		where: {
			id: Number(id),
		},
		data,
	})
	return NextResponse.json(updatedCode)
}
