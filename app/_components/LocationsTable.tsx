"use client"
import { gql, useQuery, useMutation } from "@apollo/client"
import { Button, LoadingOverlay, Table, TableData } from "@mantine/core"
import type { Location } from "@prisma/client"

const AllLocationsQuery = gql`
  query allLocationsQuery ($first: Int, $after: ID){
    locations(first: $first, after: $after){
      pageInfo{
        endCursor
        hasNextPage
      }
      edges{
        cursor  
        node{
          id
          name
          city
          state
          zipcode
          address
          category
          latitude
          longitude
        }
      }
    }
  }
`

export default function LocationsTable() {
	const { data, loading, error, fetchMore } = useQuery(AllLocationsQuery, {
		variables: { first: 10 },
	})

	if (loading) return <LoadingOverlay visible />
	if (error) return <p>Oh no... {error.message}</p>

	const { endCursor, hasNextPage } = data.locations.pageInfo

	const tableData: TableData = {
		head: [
			"ID",
			"Name",
			"City",
			"State",
			"Zipcode",
			"Address",
			"Category",
			"Latitude",
			"Longitude",
		],
		body: [
			...data.locations.edges.map(({ node }: { node: Location }) => [
				node.id,
				node.name,
				node.city,
				node.state,
				node.zipcode,
				node.address,
				node.category,
				node.latitude,
				node.longitude,
			]),
		],
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
				More
			</Button>
		</>
	)
}
