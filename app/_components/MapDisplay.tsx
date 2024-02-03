"use client"

import { Box } from "@mantine/core"
import { useLocalStorage } from "@mantine/hooks"
import mapboxgl from "mapbox-gl"
import { useEffect, useRef } from "react"

export default function MapDisplay() {
	mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string

	

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



	return (
		<Box
			ref={mapContainer}
			style={{ height: "400px", width: "100%" }}
			className="map-container"
		/>
	)
}
