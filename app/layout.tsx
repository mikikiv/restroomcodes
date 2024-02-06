import "@mantine/core/styles.css"
import React from "react"
import {
	MantineProvider,
	ColorSchemeScript,
	AppShell,
	Title,
	AppShellHeader,
	AppShellMain,
	ButtonGroup,
	Button,
	NavLink,
	Stack,
	AppShellNavbar,
	AppShellSection,
} from "@mantine/core"
import { theme } from "../theme"

export const metadata = {
	title: "Restroom Codes",
	description: "Get and share restroom codes/requirements",
}

export default function RootLayout({ children }: { children: any }) {
	return (
		<html lang="en">
			<head>
				<ColorSchemeScript />
				<link rel="shortcut icon" href="/favicon.svg" />
				<meta
					name="viewport"
					content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
				/>

				<link
					href="https://api.mapbox.com/mapbox-gl-js/v3.1.2/mapbox-gl.css"
					rel="stylesheet"
				/>
			</head>
			<body>
				<MantineProvider theme={theme}>
					<AppShell
						header={{ height: 60 }}
						navbar={{ width: 100, breakpoint: 360 }}
					>
						<AppShellHeader>
							<Title>RestroomCodes</Title>
						</AppShellHeader>
						<AppShellMain>
							<AppShellSection>{children}</AppShellSection>
						</AppShellMain>
						<AppShellNavbar>
							<NavLink href="/" label="Browse" />
							<NavLink href="/codes/report" label="Report" />
							<NavLink href="/codes/search" label="Search" />
						</AppShellNavbar>
					</AppShell>
				</MantineProvider>
			</body>
		</html>
	)
}
