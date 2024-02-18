import { Container, Stack } from "@mantine/core"
import LocationsTable from "./_components/LocationsTable"

export default function HomePage() {
	return (
		<Container p={"lg"}>
			<Stack gap={30}>
				<LocationsTable />
			</Stack>
		</Container>
	)
}
