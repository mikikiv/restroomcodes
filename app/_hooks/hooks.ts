import { sampleCodes, sampleLocations } from "@/lib/testdata"
import mapboxgl from "mapbox-gl"

export const getCodes = async () => {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/codes`)
		const data = await res.json()
		return data
	} catch (error) {
		return sampleCodes
	}
}

export const searchCodes = async (searchField: string, value: string) => {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_URL}/api/codes?${searchField}=${value}`,
		)
		const data = await res.json()
		return data
	} catch (error) {
		return sampleCodes
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

export const createLocation = async (
	location: { [key: string]: any },
	code: { [key: string]: any },
) => {
	const input = {
		providerId: location.providerId,
		name: location.name,
		city: location.city,
		state: location.state,
		zipcode: location.zipcode,
		address: location.address,
		category: location.category,
		latitude: location.latitude,
		longitude: location.longitude,
		bathroomCode: {
			code: code.code,
			required: code.required,
		},
	}

	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_URL}/api/locations`,
			{
				method: "POST",
				body: JSON.stringify(input),
			},
		)
		if (!response.ok) {
			throw new Error(`Submission error code: ${response.status}`)
		}
		return response
	} catch (error) {
		console.error("inhook", error)
		return await error
	}
}

export const searchNewLocations = async (
	input: string,
	proximity: mapboxgl.Map,
) => {
	const lat = proximity.getCenter().lat
	const lng = proximity.getCenter().lng
	const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string
	try {
		// if (process.env.NEXT_PUBLIC_URL === "http://localhost:3000") {
		// 	return sampleLocations
		// }

		const response = await fetch(
			`https://api.mapbox.com/geocoding/v5/mapbox.places/${input}.json?limit=5&proximity=${lng},${lat}&access_token=${mapboxToken}`,
		)
		const data = await response.json()
		return data.features
	} catch (error) {
		return error as Error
	}
}

export const searchExistingLocations = async (field: string, input: string) => {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_URL}/api/locations?${field}=${input}`,
		)
		const data = await response.json()
		return data
	} catch (error) {
		return error as Error
	}
}

export const getExistingLocations = async () => {
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/locations`)
		const data = await response.json()
		return data
	} catch (error) {
		return error as Error
	}
}