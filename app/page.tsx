import { Center, Container, Stack, Table, TableTd, Text } from "@mantine/core"
import CreateCode from "./_components/CreateCode"
import DisplayCodes from "./_components/DisplayCodes"

export default function HomePage() {
	return (
		<>
			<Container maw={400} p={"lg"}>
				<Stack gap={30}>
					<CreateCode />
					<DisplayCodes />
				</Stack>
			</Container>
		</>
	)
}
