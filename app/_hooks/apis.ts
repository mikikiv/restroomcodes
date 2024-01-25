export const getCodes = async () => {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/codes`)
		const data = await res.json()
		return data
	} catch (error) {
		console.error(error)
	}
}

export const createCode = async (input: string) => {
	const data = new FormData()

	data.append("code", input)

	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/codes`, {
			method: "POST",
			body: data,
		})
		console.log(await response.json())
	} catch (error) {
		console.log(error)
	}
}
