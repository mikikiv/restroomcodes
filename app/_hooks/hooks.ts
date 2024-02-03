import { sampleData } from "@/lib/testdata"

export const getCodes = async () => {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/codes`)
		const data = await res.json()
		return data
	} catch (error) {
		return sampleData
	}
}

export const createCode = async (input: FormData) => {
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/codes`, {
			method: "POST",
			body: input,
		})
		if (!response.ok) {
			throw new Error(`Submission error code: ${response.status}`)
		}
		return response
	} catch (error) {
		return await error
	}
}
