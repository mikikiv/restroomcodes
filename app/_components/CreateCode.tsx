"use client"
import {
	Box,
	Button,
	Paper,
	Radio,
	RadioGroup,
	Text,
	TextInput,
} from "@mantine/core"
import { useForm } from "@mantine/form"
import { createCode, searchNewLocations } from "@/hooks/hooks"
import MapDisplay from "./MapDisplay"
import { useRef, useState } from "react"

const CreateCode = ({ ...rest }) => {
	const form = useForm({
		initialValues: {
			code: "",
			codeRequired: true,
			locationName: "",
			locationStreet: "",
			locationCity: "",
			locationState: "",
		},
	})

	const handleSubmit = async () => {
		const data = new FormData()

		for (const [key, value] of Object.entries(form.values)) {
			if (!value) continue
			data.append(key, value.toString())
		}
		try {
			const res = await createCode(data)
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
			query: "",
		},
	})
	const [searchResults, setSearchResults] = useState<any[]>([])

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
			form.reset()
		}
	}
	
		return (
			<>
				<Paper {...rest}>
					<Text>Report a new code</Text>
					<Box>
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
					</Box>
				</Paper>
				<Box>
					<TextInput {...mapsearch.getInputProps("query")} />
					<Button onClick={() => handleSearch()}>Submit</Button>
					{map != null && (
						<MapDisplay searchResults={searchResults} map={map} />
					)}
				</Box>
			</>
		)
}
export default CreateCode

