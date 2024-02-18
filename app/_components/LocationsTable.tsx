"use client"
import { gql, useQuery } from "@apollo/client"
import { LoadingOverlay, Table, TableData } from "@mantine/core"
import type { Location } from "@prisma/client"

const AllLocationsQuery = gql`
  query {
    Locations{
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
`

export default function LocationsTable() {
	const { data, loading, error } = useQuery(AllLocationsQuery)

	if (loading) return <LoadingOverlay visible />
	if (error) return <p>Oh no... {error.message}</p>

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
			...data.Locations.map((location: Location) => [
				location.id,
				location.name,
				location.city,
				location.state,
				location.zipcode,
				location.address,
				location.category,
				location.latitude,
				location.longitude,
			]),
		],
	}

	return (
		<div>
			<Table data={tableData} />
		</div>
	)
}
