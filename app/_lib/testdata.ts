import mapboxgl, { MapboxGeoJSONFeature } from "mapbox-gl"

export const sampleCodes = [
	{
		id: 33,
		codeRequired: false,
		code: null,
		valid: true,
		verified: false,
		createdAt: "2024-01-25T06:15:38.894Z",
		updatedAt: "2024-01-25T06:15:38.894Z",
		deletedAt: null,
		locationId: null,
	},
	{
		id: 32,
		codeRequired: false,
		code: "123",
		valid: true,
		verified: false,
		createdAt: "2024-01-25T05:34:20.864Z",
		updatedAt: "2024-01-25T05:34:20.864Z",
		deletedAt: null,
		locationId: null,
	},
	{
		id: 31,
		codeRequired: false,
		code: "123",
		valid: true,
		verified: false,
		createdAt: "2024-01-25T05:33:39.836Z",
		updatedAt: "2024-01-25T05:33:39.836Z",
		deletedAt: null,
		locationId: null,
	},
	{
		id: 30,
		codeRequired: false,
		code: "123",
		valid: true,
		verified: false,
		createdAt: "2024-01-25T05:32:24.674Z",
		updatedAt: "2024-01-25T05:34:23.022Z",
		deletedAt: "2024-01-25T05:34:23.021Z",
		locationId: null,
	},
	{
		id: 29,
		codeRequired: true,
		code: "29",
		valid: true,
		verified: false,
		createdAt: "2024-01-25T04:53:02.468Z",
		updatedAt: "2024-01-25T06:37:47.594Z",
		deletedAt: null,
		locationId: null,
	},
	{
		id: 28,
		codeRequired: false,
		code: "123",
		valid: true,
		verified: false,
		createdAt: "2024-01-25T04:46:20.092Z",
		updatedAt: "2024-01-25T04:46:20.092Z",
		deletedAt: null,
		locationId: null,
	},
	{
		id: 27,
		codeRequired: false,
		code: "123",
		valid: true,
		verified: false,
		createdAt: "2024-01-25T04:44:47.268Z",
		updatedAt: "2024-01-25T04:44:47.268Z",
		deletedAt: null,
		locationId: null,
	},
	{
		id: 26,
		codeRequired: false,
		code: "123",
		valid: true,
		verified: false,
		createdAt: "2024-01-25T04:44:26.143Z",
		updatedAt: "2024-01-25T04:44:26.143Z",
		deletedAt: null,
		locationId: null,
	},
	{
		id: 25,
		codeRequired: false,
		code: "123",
		valid: true,
		verified: false,
		createdAt: "2024-01-25T04:43:33.777Z",
		updatedAt: "2024-01-25T04:43:33.777Z",
		deletedAt: null,
		locationId: null,
	},
	{
		id: 24,
		codeRequired: false,
		code: "123",
		valid: true,
		verified: false,
		createdAt: "2024-01-25T04:42:28.869Z",
		updatedAt: "2024-01-25T04:42:28.869Z",
		deletedAt: null,
		locationId: null,
	},
	{
		id: 23,
		codeRequired: false,
		code: "",
		valid: true,
		verified: false,
		createdAt: "2024-01-24T06:57:47.552Z",
		updatedAt: "2024-01-24T06:57:47.552Z",
		deletedAt: null,
		locationId: null,
	},
	{
		id: 22,
		codeRequired: false,
		code: "",
		valid: true,
		verified: false,
		createdAt: "2024-01-24T06:54:41.047Z",
		updatedAt: "2024-01-24T06:54:41.047Z",
		deletedAt: null,
		locationId: null,
	},
	{
		id: 21,
		codeRequired: false,
		code: "",
		valid: true,
		verified: false,
		createdAt: "2024-01-24T06:54:31.198Z",
		updatedAt: "2024-01-24T06:54:31.198Z",
		deletedAt: null,
		locationId: null,
	},
	{
		id: 20,
		codeRequired: false,
		code: "123",
		valid: true,
		verified: false,
		createdAt: "2024-01-24T06:54:22.474Z",
		updatedAt: "2024-01-24T06:54:22.474Z",
		deletedAt: null,
		locationId: null,
	},
	{
		id: 19,
		codeRequired: false,
		code: "123",
		valid: true,
		verified: false,
		createdAt: "2024-01-24T06:53:58.882Z",
		updatedAt: "2024-01-24T06:53:58.882Z",
		deletedAt: null,
		locationId: null,
	},
	{
		id: 18,
		codeRequired: false,
		code: "123",
		valid: true,
		verified: false,
		createdAt: "2024-01-24T06:53:55.773Z",
		updatedAt: "2024-01-24T06:53:55.773Z",
		deletedAt: null,
		locationId: null,
	},
	{
		id: 4,
		codeRequired: false,
		code: "this",
		valid: true,
		verified: false,
		createdAt: "2024-01-24T06:39:20.181Z",
		updatedAt: "2024-01-24T06:39:20.181Z",
		deletedAt: null,
		locationId: null,
	},
	{
		id: 1,
		codeRequired: false,
		code: "test",
		valid: true,
		verified: false,
		createdAt: "2024-01-24T06:37:54.751Z",
		updatedAt: "2024-01-24T06:37:54.751Z",
		deletedAt: null,
		locationId: null,
	},
]

export const sampleLocations = [
	{
		id: "poi.292057854015",
		type: "Feature",
		place_type: ["poi"],
		relevance: 1,
		properties: {
			foursquare: "4ba2ed24f964a520fd2238e3",
			landmark: true,
			address: "861 Quincy Shore Dr",
			category: "seafood, seafood restaurant, restaurant",
		},
		text: "Tony's Clam Shop",
		place_name:
			"Tony's Clam Shop, 861 Quincy Shore Dr, Quincy, Massachusetts 02170, United States",
		center: [-71.00593, 42.275415],
		geometry: {
			coordinates: [-71.00593, 42.275415],
			type: "Point",
		},
		context: [
			{
				id: "neighborhood.438717676",
				mapbox_id: "dXJuOm1ieHBsYzpHaVpNN0E",
				text: "Norfolk Downs",
			},
			{
				id: "postcode.3845868",
				mapbox_id: "dXJuOm1ieHBsYzpPcTdz",
				text: "02170",
			},
			{
				id: "place.270289132",
				mapbox_id: "dXJuOm1ieHBsYzpFQnhJN0E",
				wikidata: "Q49143",
				text: "Quincy",
			},
			{
				id: "district.17123052",
				mapbox_id: "dXJuOm1ieHBsYzpBUVZHN0E",
				wikidata: "Q54079",
				text: "Norfolk County",
			},
			{
				id: "region.353516",
				mapbox_id: "dXJuOm1ieHBsYzpCV1Rz",
				wikidata: "Q771",
				short_code: "US-MA",
				text: "Massachusetts",
			},
			{
				id: "country.8940",
				mapbox_id: "dXJuOm1ieHBsYzpJdXc",
				wikidata: "Q30",
				short_code: "us",
				text: "United States",
			},
		],
	},
	{
		id: "poi.188978605318",
		type: "Feature",
		place_type: ["poi"],
		relevance: 1,
		properties: {
			foursquare: "4c6c29051fb2a14334b0fae6",
			landmark: true,
			address: "50 Congress St",
			category: "beauty, hair, salon, barber, hairdresser",
		},
		text: "Tony's Barbershop",
		place_name:
			"Tony's Barbershop, 50 Congress St, Boston, Massachusetts 02109, United States",
		center: [-71.056003, 42.357994],
		geometry: {
			coordinates: [-71.056003, 42.357994],
			type: "Point",
		},
		context: [
			{
				id: "neighborhood.214338796",
				mapbox_id: "dXJuOm1ieHBsYzpETWFNN0E",
				wikidata: "Q1381137",
				text: "Financial District",
			},
			{
				id: "postcode.3460844",
				mapbox_id: "dXJuOm1ieHBsYzpOTTdz",
				text: "02109",
			},
			{
				id: "place.33908972",
				mapbox_id: "dXJuOm1ieHBsYzpBZ1ZvN0E",
				wikidata: "Q100",
				text: "Boston",
			},
			{
				id: "district.22259436",
				mapbox_id: "dXJuOm1ieHBsYzpBVk9tN0E",
				wikidata: "Q54072",
				text: "Suffolk County",
			},
			{
				id: "region.353516",
				mapbox_id: "dXJuOm1ieHBsYzpCV1Rz",
				wikidata: "Q771",
				short_code: "US-MA",
				text: "Massachusetts",
			},
			{
				id: "country.8940",
				mapbox_id: "dXJuOm1ieHBsYzpJdXc",
				wikidata: "Q30",
				short_code: "us",
				text: "United States",
			},
		],
	},
	{
		id: "poi.575525634671",
		type: "Feature",
		place_type: ["poi"],
		relevance: 1,
		properties: {
			foursquare: "4d756ef58796f04dbeea4a16",
			landmark: true,
			address: "662 Hancock St",
			category: "pizza, pizza parlor, restaurant",
		},
		text: "Tony's House of Pizza",
		place_name:
			"Tony's House of Pizza, 662 Hancock St, Quincy, Massachusetts 02170, United States",
		center: [-71.016273, 42.267819],
		geometry: {
			coordinates: [-71.016273, 42.267819],
			type: "Point",
		},
		context: [
			{
				id: "neighborhood.730107116",
				mapbox_id: "dXJuOm1ieHBsYzpLNFNNN0E",
				wikidata: "Q8030311",
				text: "Wollaston",
			},
			{
				id: "postcode.3845868",
				mapbox_id: "dXJuOm1ieHBsYzpPcTdz",
				text: "02170",
			},
			{
				id: "place.270289132",
				mapbox_id: "dXJuOm1ieHBsYzpFQnhJN0E",
				wikidata: "Q49143",
				text: "Quincy",
			},
			{
				id: "district.17123052",
				mapbox_id: "dXJuOm1ieHBsYzpBUVZHN0E",
				wikidata: "Q54079",
				text: "Norfolk County",
			},
			{
				id: "region.353516",
				mapbox_id: "dXJuOm1ieHBsYzpCV1Rz",
				wikidata: "Q771",
				short_code: "US-MA",
				text: "Massachusetts",
			},
			{
				id: "country.8940",
				mapbox_id: "dXJuOm1ieHBsYzpJdXc",
				wikidata: "Q30",
				short_code: "us",
				text: "United States",
			},
		],
	},
	{
		id: "poi.687194776756",
		type: "Feature",
		place_type: ["poi"],
		relevance: 1,
		properties: {
			foursquare: "4c5769a46201e21eb60db56e",
			landmark: true,
			address: "196 Franklin St",
			category: "bar, alcohol",
			maki: "bar",
		},
		text: "Tony's Pub",
		place_name:
			"Tony's Pub, 196 Franklin St, Lynn, Massachusetts 01904, United States",
		center: [-70.959955, 42.469692],
		geometry: {
			coordinates: [-70.959955, 42.469692],
			type: "Point",
		},
		context: [
			{
				id: "neighborhood.103877868",
				mapbox_id: "dXJuOm1ieHBsYzpCakVNN0E",
				text: "Central Lynn",
			},
			{
				id: "postcode.2854636",
				mapbox_id: "dXJuOm1ieHBsYzpLNDdz",
				text: "01904",
			},
			{
				id: "place.195725548",
				mapbox_id: "dXJuOm1ieHBsYzpDNnFJN0E",
				wikidata: "Q49188",
				text: "Lynn",
			},
			{
				id: "district.7284460",
				mapbox_id: "dXJuOm1ieHBsYzpieWJz",
				wikidata: "Q54076",
				text: "Essex County",
			},
			{
				id: "region.353516",
				mapbox_id: "dXJuOm1ieHBsYzpCV1Rz",
				wikidata: "Q771",
				short_code: "US-MA",
				text: "Massachusetts",
			},
			{
				id: "country.8940",
				mapbox_id: "dXJuOm1ieHBsYzpJdXc",
				wikidata: "Q30",
				short_code: "us",
				text: "United States",
			},
		],
	},
	{
		id: "poi.687194826991",
		type: "Feature",
		place_type: ["poi"],
		relevance: 1,
		properties: {
			foursquare: "4bb75ff32f70c9b6258f8630",
			landmark: true,
			address: "1 School St",
			category: "pizza, pizza parlor, restaurant",
		},
		text: "Tony's Pizza",
		place_name:
			"Tony's Pizza, 1 School St, Marblehead, Massachusetts 01945, United States",
		center: [-70.855876, 42.501633],
		geometry: {
			coordinates: [-70.855876, 42.501633],
			type: "Point",
		},
		context: [
			{
				id: "neighborhood.384847084",
				mapbox_id: "dXJuOm1ieHBsYzpGdkJNN0E",
				text: "Marblehead Neck",
			},
			{
				id: "postcode.3010284",
				mapbox_id: "dXJuOm1ieHBsYzpMZTdz",
				text: "01945",
			},
			{
				id: "place.200698092",
				mapbox_id: "dXJuOm1ieHBsYzpDL1pvN0E",
				wikidata: "Q27416",
				text: "Marblehead",
			},
			{
				id: "district.7284460",
				mapbox_id: "dXJuOm1ieHBsYzpieWJz",
				wikidata: "Q54076",
				text: "Essex County",
			},
			{
				id: "region.353516",
				mapbox_id: "dXJuOm1ieHBsYzpCV1Rz",
				wikidata: "Q771",
				short_code: "US-MA",
				text: "Massachusetts",
			},
			{
				id: "country.8940",
				mapbox_id: "dXJuOm1ieHBsYzpJdXc",
				wikidata: "Q30",
				short_code: "us",
				text: "United States",
			},
		],
	},
]