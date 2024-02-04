import { Paper, Table, TableData, Text } from "@mantine/core"
import { getCodes } from "@/hooks/hooks"
import { BathroomCode } from "@prisma/client"

const DisplayCodes = async () => {
		const codes = await getCodes()

	const tableHeader: string[] = Object.keys(await codes[0])

	const tableBody: string[][] = codes
		.filter((results: BathroomCode) => {
			return results.deletedAt === null
		})
		.map((code: BathroomCode) => {
			return Object.values(code)
		})

	const tableData: TableData = {
		caption: "Codes",
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
