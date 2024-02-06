import { Center, Container, Stack, Table, TableTd, Text } from "@mantine/core"
import CreateCode from "./_components/CreateCode"
import DisplayCodes from "./_components/DisplayTable"
import MapDisplay from "./_components/MapDisplay"
import { useEffect, useRef } from "react"
import { getCodes, getExistingLocations } from "./_hooks/hooks"

export default function HomePage() {

	return (
		<>
			<Container p={"lg"}>
				<Stack gap={30}>
					<DisplayCodes database="codes" />
				</Stack>
			</Container>
		</>
	)
}
