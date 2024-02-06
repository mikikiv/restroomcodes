"use client"
import {
	Box,
	Button,
	Flex,
	Input,
	Paper,
	Radio,
	RadioGroup,
	Stack,
	Text,
	TextInput,
} from "@mantine/core"
import { useForm } from "@mantine/form"
import { createCode, createLocation, searchNewLocations } from "@/hooks/hooks"
import MapDisplay from "./MapDisplay"
import { useEffect, useRef, useState } from "react"



type Context = {
	id: string
	mapbox_id: string
	text: string
}

const CreateCode = ({ ...rest }) => {
	const form = useForm({
		initialValues: {
			code: "",
			codeRequired: true,
		},
	})

	const handleSubmit = async () => {
		const codeData = {
			code: form.values.code,
			codeRequired: form.values.codeRequired,
		}

		const locationData = {
			providerId: selectedLocation.id,
			name: selectedLocation.text,
			latitude: selectedLocation.center[1],
			longitude: selectedLocation.center[0],
			// filter the context array to get the city, state, and zip based on the first text within the context array's id field
			city: selectedLocation.context.filter((context: Context) =>
				context.id.includes("place"),
			)[0].text,
			state: selectedLocation.context.filter((context: Context) =>
				context.id.includes("region"),
			)[0].text,
			zip: selectedLocation.context.filter((context: Context) =>
				context.id.includes("postcode"),
			)[0].text,

			address: selectedLocation.properties.address,
			category: selectedLocation.properties.category,
		}

		console.log(codeData)
		console.log(locationData)

		try {
			const res = await createLocation(locationData, codeData)
			//@ts-expect-error
			if (!res?.ok) {
				throw new Error("Failed to create code")
			}
			form.reset()
			return "submitted"
			//@todo: add toast
		} catch (error) {
			console.error(error)
		}
	}

	const map = useRef<mapboxgl.Map>(null)

	const mapsearch = useForm({
		initialValues: {
			query: "mcdonalds",
		},
	})
	const [searchResults, setSearchResults] = useState<any[]>([])

	const [searchComplete, setSearchComplete] = useState(false)

	const [selectedLocation, setSelectedLocation] = useState<any>(null)

	const handleSearch = async () => {
		try {
			setSearchResults(
				await searchNewLocations(
					mapsearch.values.query,
					map.current as mapboxgl.Map,
				),
			)
		} catch (error) {
			console.error(error)
			return null
		} finally {
			setSearchComplete(true)
			form.reset()
		}
	}



	
	return (
		<>
			<Paper {...rest}>
				<Text>Report a new location and code</Text>
				{map != null && <MapDisplay searchResults={searchResults} map={map} />}
				<Box>
					{searchComplete === true ? (
						<>
							<Radio.Group>
								{searchResults.map((result) => (
									<Radio
										type="radio"
										key={result.id}
										checked
										value={result.id}
										label={result.place_name}
										onChange={() => setSelectedLocation(result)}
									/>
								))}
							</Radio.Group>
							<TextInput
								w={"100%"}
								placeholder="1234"
								{...form.getInputProps("code")}
							/>
							<RadioGroup
								withAsterisk
								{...form.getInputProps("codeRequired", { type: "checkbox" })}
							>
								<Radio value="required" label="Code is required" />
								<Radio value="notRequired" label="Code is not required" />
							</RadioGroup>
							<Button fullWidth mt={"sm"} onClick={() => handleSubmit()}>
								Create Code
							</Button>
						</>
					) : (
						<>
							<Flex bg={"#eee"} justify={"center"} gap={2} h={100}>
								<TextInput w={300} {...mapsearch.getInputProps("query")} />
								<Button onClick={() => handleSearch()}>Submit</Button>
							</Flex>
						</>
					)}
				</Box>
			</Paper>
		</>
	)
}
export default CreateCode

