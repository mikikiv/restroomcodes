"use client"

import { Box } from "@mantine/core"
import mapboxgl from "mapbox-gl"
import { useEffect, useRef, useState } from "react"

export default function MapDisplay() {
	mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string

	const mapContainer = useRef<HTMLDivElement | null>(null)
	const map = useRef<mapboxgl.Map | null>(null)
	const [lng, setLng] = useState(-70.9)
	const [lat, setLat] = useState(42.35)
	const [zoom, setZoom] = useState(9)

	useEffect(() => {
		if (map.current || !mapContainer.current) return
		map.current = new mapboxgl.Map({
			container: mapContainer.current,
			style: "mapbox://styles/mapbox/streets-v12",
			center: [lng, lat],
			zoom: zoom,
		})
	})

	return (
		<Box
			ref={mapContainer}
			style={{ height: "400px", width: "100%" }}
			className="map-container"
		/>
	)
}
