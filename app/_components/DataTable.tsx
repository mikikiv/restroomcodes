"use client"
import { AllBathroomCodesQuery, AllLocationsQuery } from "@/hooks/queries"
import { useQuery, useMutation } from "@apollo/client"
import { Button, LoadingOverlay, Table, TableData } from "@mantine/core"
import { BathroomCode, Location } from "@prisma/client"

export default function DataTable({
	database,
}: { database: "locations" | "bathroomCodes" }) {
	const { data, loading, error, fetchMore } = useQuery(
		database === "locations" ? AllLocationsQuery : AllBathroomCodesQuery,
		{
			variables: { first: 10 },
		},
	)

	if (loading) return <LoadingOverlay visible />
	if (error) return <p>Oh no... {error.message}</p>

	const { endCursor, hasNextPage } = data[database].pageInfo

	const tableData: TableData = {
		head: Object.keys(data[database].edges[0].node), // get the table head from the first node
		body:
			// an array of arrays that represent the table body
			data[database].edges.map((edge: { node: Location | BathroomCode }) => {
				return Object.values(edge.node).map((value) => String(value))
			}),
	}

	return (
		<>
			<Table data={tableData} />

			<Button
				disabled={!hasNextPage}
				onClick={() => {
					fetchMore({
						variables: { after: endCursor },
						updateQuery: (previousResult, { fetchMoreResult }) => {
							if (!fetchMoreResult) return previousResult
							return {
								locations: {
									...fetchMoreResult.locations,
									edges: [
										...previousResult.locations.edges,
										...fetchMoreResult.locations.edges,
									],
								},
							}
						},
					})
				}}
			>
				{!hasNextPage ? "End of Results" : "Load more results"}
			</Button>
		</>
	)
}
