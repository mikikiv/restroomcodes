import { gql } from "@apollo/client"

const LocationFields = gql`
  fragment LocationFields on Location {
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
`

export const AllLocationsQuery = gql`
  ${LocationFields}
  query allLocationsQuery ($first: Int, $after: ID){
    locations(first: $first, after: $after){
      pageInfo{
        endCursor
        hasNextPage
      }
      edges{
        cursor  
        node{
          ...LocationFields
        }
      }
    }
  }
`

const BathroomCodeFields = gql`
  fragment BathroomCodeFields on BathroomCode {
    id
    code
    codeRequired
    valid
    verified
    createdAt
    updatedAt
    deletedAt
  }
`

export const AllBathroomCodesQuery = gql`
  ${BathroomCodeFields}
	query allBathroomCodes ($first: Int, $after: ID){
		bathroomCodes(first: $first, after: $after){
			pageInfo{
				endCursor
				hasNextPage
			}
			edges{
				cursor  
				node{
					...BathroomCodeFields
				}
			}
		}
	}
`

export const BathroomCodesQuery = (
	locationId?: number,
	codeRequired?: boolean,
) => gql`
  ${BathroomCodeFields}
  query bathroomCodesQuery($codeRequired: Boolean){
    bathroomCodes(first: $first, after: $after, codeRequired: ${codeRequired}){
      pageInfo{
				endCursor
				hasNextPage
			}
			edges{
				cursor  
				node{
          ...BathroomCodeFields
        }
      }
    }
  }
`