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

const RestroomCodeFields = gql`
  fragment RestroomCodeFields on RestroomCode {
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

export const AllRestroomCodesQuery = gql`
  ${RestroomCodeFields}
	query allRestroomCodes ($first: Int, $after: ID){
		restroomCodes(first: $first, after: $after){
			pageInfo{
				endCursor
				hasNextPage
			}
			edges{
				cursor  
				node{
					...RestroomCodeFields
				}
			}
		}
	}
`

export const RestroomCodesQuery = (
	locationId?: number,
	codeRequired?: boolean,
) => gql`
  ${RestroomCodeFields}
  query restroomCodesQuery($codeRequired: Boolean){
    restroomCodes(first: $first, after: $after, codeRequired: ${codeRequired}){
      pageInfo{
				endCursor
				hasNextPage
			}
			edges{
				cursor  
				node{
          ...RestroomCodeFields
        }
      }
    }
  }
`