"use client"
import DataTable from "@/components/DataTable"
import { Container, Group, Select } from "@mantine/core"
import { Suspense, useState } from "react"
const Page = () => {
	const [searchType, setSearchType] = useState<"locations" | "restroomCodes">(
		"locations",
	)

	return (
		<>
			<Group justify="center">
				<Select
					label="Search Type"
					data={[
						{ label: "Locations", value: "locations" },
						{ label: "Codes", value: "restroomCodes" },
					]}
					allowDeselect={false}
					value={searchType}
					onChange={(selection) =>
						setSearchType(selection as "locations" | "restroomCodes")
					}
				/>
			</Group>
			<Suspense>
				<Container p="lg">{<DataTable database={searchType} />}</Container>
			</Suspense>
		</>
	)
}
export default Page