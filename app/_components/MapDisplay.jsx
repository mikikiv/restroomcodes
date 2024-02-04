import { searchNewLocations } from "@/hooks/hooks"
import { Box, Button, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useLocalStorage } from "@mantine/hooks"
import mapboxgl from "mapbox-gl"
import { useEffect, useRef, useState } from "react"

export default function MapDisplay({ searchResults, map }) {
	mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN

	const mapContainer = useRef(null)
	const [viewport, setViewport] = useLocalStorage({
		key: "mapviewport",
		defaultValue: {
			latitude: 42.35,
			longitude: -70.9,
			zoom: 9,
		},
	})

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
				latitude: map.current?.getCenter().lat,
				longitude: map.current?.getCenter().lng,
				zoom: map.current?.getZoom(),
			})
		})
	})

	useEffect(() => {
		searchResults.map((location) =>
			new mapboxgl.Marker()
				.setLngLat(location.geometry.coordinates)
				.addTo(map.current),
		)
	}, [searchResults, map])

	return (
		<>
			<Box
				ref={mapContainer}
				style={{ height: "400px", width: "100%" }}
				className="map-container"
			/>
		</>
	)
}
