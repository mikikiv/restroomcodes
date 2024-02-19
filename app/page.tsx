import { Container, Stack } from "@mantine/core"
import DataTable from "./_components/DataTable"

export default function HomePage() {
	return (
		<Container p={"lg"}>
			<Stack gap={30}>
				<DataTable database="locations" />
				<DataTable database="bathroomCodes" />
			</Stack>
		</Container>
	)
}
