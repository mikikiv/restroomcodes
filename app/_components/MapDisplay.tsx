import { searchNewLocations } from "@/hooks/hooks"
import { Box, Button, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useLocalStorage } from "@mantine/hooks"
import mapboxgl from "mapbox-gl"
import { useEffect, useRef, useState } from "react"

export default function MapDisplay() {
	mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string

	const form = useForm({
		initialValues: {
			query: "",
		},
	})

	const mapContainer = useRef<HTMLDivElement | null>(null)
	const map = useRef<mapboxgl.Map | null>(null)

	const [viewport, setViewport] = useLocalStorage({
		key: "mapviewport",
		defaultValue: {
			latitude: 42.35,
			longitude: -70.9,
			zoom: 9,
		},
	})
	const [searchResults, setSearchResults] = useState<any[]>([])
	const [loading, setLoading] = useState(false)

	const handleSearch = async () => {
		setLoading(true)
		try {
			setSearchResults(
				await searchNewLocations(
					form.values.query,
					map.current as mapboxgl.Map,
				),
			)
		} catch (error) {
			console.error(error)
			return null
		} finally {
			form.reset()
			setLoading(false)
		}
	}

	useEffect(() => {
		if (map.current || !mapContainer.current) return
		map.current = new mapboxgl.Map({
			container: mapContainer.current,
			style: "mapbox://styles/mapbox/streets-v12",
			center: [viewport.longitude, viewport.latitude],
			zoom: viewport.zoom,
		})

		//add controls
		map.current.addControl(
			new mapboxgl.GeolocateControl({
				positionOptions: { enableHighAccuracy: true },
				trackUserLocation: true,
			}),
		)

		map.current.on("move", () => {
			setViewport({
				latitude: map.current?.getCenter().lat as number,
				longitude: map.current?.getCenter().lng as number,
				zoom: map.current?.getZoom() as number,
			})
		})
	})
	useEffect(() => {
		searchResults.map(
			(location) =>
				map.current &&
				new mapboxgl.Marker()
					.setLngLat(location.geometry.coordinates)
					.addTo(map.current),
		)
	}, [searchResults])

	return (
		<>
			<TextInput {...form.getInputProps("query")} />
			<Button onClick={() => handleSearch()}>Submit</Button>
			<Box
				ref={mapContainer}
				style={{ height: "400px", width: "100%" }}
				className="map-container"
			/>
		</>
	)
}
