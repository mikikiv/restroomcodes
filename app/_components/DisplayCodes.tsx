import { Paper, Table, TableData, Text } from "@mantine/core"
import { getCodes } from "@/hooks/apis"
import { BathroomCode } from "@prisma/client"

const DisplayCodes = async () => {
	const codes = await getCodes()

	const tableData: TableData = {
		caption: "Codes",
		head: ["Code", "Required", "Created At", "Updated At", "Valid", "Verified"],
		body: codes.map((code: BathroomCode) => {
			return [
				code.code,
				code.codeRequired,
				code.createdAt.toLocaleString(),
				code.updatedAt.toLocaleString(),
				code.valid,
				code.verified,
			]
		}),
	}

	return (
		<Paper>
			<Text>Display Codes</Text>
			<Table data={tableData} />
		</Paper>
	)
}
export default DisplayCodes
