import "@mantine/core/styles.css"
import React from "react"
import {
	MantineProvider,
	ColorSchemeScript,
	AppShell,
	Title,
	AppShellHeader,
	AppShellMain,
	Box,
} from "@mantine/core"

export const metadata = {
	title: "Restroom Codes",
	description: "Get and share restroom codes/requirements",
}

export default function RootLayout({ children }: { children: any }) {
	return (
		<>
			<Box>{children}</Box>
		</>
	)
}
