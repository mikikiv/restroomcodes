import { Box, Container, Title } from "@mantine/core"


const SearchLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<Container>
			<Title>Search</Title>
			<Box>{children}</Box>
		</Container>
	)
}
export default SearchLayout