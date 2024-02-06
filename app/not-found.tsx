"use client"
import { Button } from "@mantine/core"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function NotFound() {
	const router = useRouter()
	return (
		<div>
			<h2>Not Found</h2>
			<p>Could not find requested resource</p>
			<Button onClick={() => router.back()}>Go Back</Button>
		</div>
	)
}
