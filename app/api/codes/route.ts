import type { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../_lib/prismadb"

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const data = await prisma.bathroomCode.findMany({
    select: {
      code: true,
      createdAt: true,
    },
  })
  return Response.json(data)
}

export async function POST(request: Request, res: NextApiResponse) {
  const formData = await request.formData()
  const inputCode = formData.get("code")
  if (
    formData &&
    inputCode &&
    inputCode !== undefined &&
    inputCode.toString().trim().length > 0
  ) {
    const data = await prisma.bathroomCode.create({
      data: {
        code: inputCode.toString(),
      },
    })
    return Response.json(data)
  }

  if ((inputCode && inputCode.toString().trim().length < 1) || !inputCode) {
    return new Response("a code is required", { status: 400 })
  }
}
