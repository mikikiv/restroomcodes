import "@mantine/core/styles.css"
import React from "react"
import {
	MantineProvider,
	ColorSchemeScript,
	AppShell,
	Title,
	AppShellHeader,
	AppShellMain,
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
			</head>
			<body>
				<MantineProvider theme={theme}>
					<AppShell header={{ height: 60 }}>
						<AppShellHeader>
							<Title>RestroomCodes.com</Title>
						</AppShellHeader>
						<AppShellMain>{children}</AppShellMain>
					</AppShell>
				</MantineProvider>
			</body>
		</html>
	)
}
