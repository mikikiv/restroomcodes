"use client"
import DisplayCodes from "@/components/DisplayTable"
import { Box, Button, Group, Select, Text, TextInput } from "@mantine/core"
import { Suspense, useEffect, useState } from "react"
const Page = () => {
	const [searched, setSearched] = useState(false)
	const [searchType, setSearchType] = useState<"location" | "code">("location")
	const [searchField, setSearchField] = useState(
		searchType === "location" ? "name" : "code",
	)
	const locationSearchFieldOptions = [
		{ label: "Name", value: "name", type: "text" },
		{ label: "City", value: "city", type: "text" },
		{ label: "State", value: "state", type: "text" },
		{ label: "Zip", value: "zip", type: "text" },
		{ label: "Location ID", value: "id", type: "text" },
	]

	const codeSearchFieldOptions = [
		{ label: "Code", value: "code", type: "text" },
		{ label: "Code Required", value: "codeRequired", type: "boolean" },
		{ label: "Valid", value: "valid", type: "boolean" },
		{ label: "Verified", value: "verified", type: "boolean" },
	]
	const [searchOptions, setSearchOptions] = useState(locationSearchFieldOptions)
	const [searchValue, setSearchValue] = useState("")

	const handleSubmit = async () => {
		setSearched(true)
		setSearchQuery({
			searchType,
			searchField,
			searchValue,
		})
	}

	//only rerender the table when Search button is clicked
	const [searchQuery, setSearchQuery] = useState({
		searchType: "",
		searchField: "",
		searchValue: "",
	})

	useEffect(() => {
		setSearchField(searchType === "location" ? "name" : "code")
		setSearchOptions(
			searchType === "location"
				? locationSearchFieldOptions
				: codeSearchFieldOptions,
		)
	}, [searchType])

	return (
		<>
			<Group justify="center">
				<Select
					label="Search Type"
					data={[
						{ label: "Location", value: "location" },
						{ label: "Code", value: "code" },
					]}
					allowDeselect={false}
					value={searchType}
					onChange={(selection) =>
						setSearchType(selection as "location" | "code")
					}
				/>
				<Select
					label="Search Field"
					data={
						searchType === "location"
							? locationSearchFieldOptions
							: codeSearchFieldOptions
					}
					allowDeselect={false}
					value={searchField}
					onChange={(selection) => setSearchField(selection as string)}
				/>

				<Box mt={24}>
					{
						//if the selected searchField has a type of "text" then display a TextInput, otherwise display a Select
						searchOptions.find((option) => option.value === searchField)
							?.type !== "boolean" ? (
							<TextInput
								value={searchValue}
								onChange={(e) => {
									setSearchValue(e.currentTarget.value)
								}}
								placeholder="Search"
							/>
						) : (
							<Select
								data={[
									{ label: "True", value: "true" },
									{ label: "False", value: "false" },
								]}
								placeholder="True"
								defaultValue={"True"}
								value={searchValue}
								onChange={(selection) =>
									setSearchValue(selection as "true" | "false")
								}
							/>
						)
					}
				</Box>
				<Button mt={24} onClick={() => handleSubmit()}>
					Search
				</Button>
			</Group>
			{searched ? (
				<Suspense>
					<DisplayCodes
						database={searchQuery.searchType as "location" | "code"}
						searchField={searchQuery.searchField}
						searchValue={searchQuery.searchValue}
					/>
				</Suspense>
			) : (
				<Text> Nothing yet </Text>
			)}
		</>
	)
}
export default Page