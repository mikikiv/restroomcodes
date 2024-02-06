
import { Paper, Table, TableData, Text } from "@mantine/core"
import {
	getCodes,
	getExistingLocations,
	searchCodes,
	searchExistingLocations,
} from "@/hooks/hooks"
import { BathroomCode, Location } from "@prisma/client"

type DisplayCodesProps = {
	database: "location" | "code" | "locations" | "codes"
	searchField?: string
	searchValue?: string
}

const DisplayCodes = async ({
	database,
	searchField,
	searchValue,
}: DisplayCodesProps) => {
	let data = []

	switch (database) {
		case "location":
			data = (await searchExistingLocations(
				searchField || "name",
				searchValue || "",
			)) as Location[]
			break
		case "code":
			data = (await searchCodes(
				searchField || "required",
				searchValue || "true",
			)) as BathroomCode[]
			break
		case "locations":
			data = (await getExistingLocations()) as Location[]
			break

		case "codes":
			data = (await getCodes()) as BathroomCode[]
			break
	}

	if (data.length === 0) {
		return <Text>No data found</Text>
	}

	const tableHeader: string[] = Object.keys(data[0])

	const tableBody: string[][] = data.map((column) => {
		return Object.values(column).map((value) => String(value))
	})

	const tableData: TableData = {
		head: tableHeader,
		body: tableBody,
	}

	return (
		<Paper>
			<Table data={tableData} />
		</Paper>
	)
}
export default DisplayCodes
