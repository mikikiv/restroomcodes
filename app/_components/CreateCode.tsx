"use client"
import { Box, Button, Paper, Text, TextInput } from "@mantine/core"

import { useState } from "react"
import { createCode } from "../_hooks/apis"

const CreateCode = () => {
	const [code, setCode] = useState("")

	const submitCode = async (code: string) => {
		await createCode(code)
		setCode("")
	}
	return (
		<Paper>
			<Text>Report a new code</Text>
			<Box>
				<TextInput
					w={"100%"}
					placeholder="1234"
					value={code}
					onChange={(e) => {
						setCode(e.currentTarget.value)
					}}
				/>
				<Button
					fullWidth
					mt={"sm"}
					onClick={() => {
						submitCode(code)
					}}
				>
					Create Code
				</Button>
			</Box>
		</Paper>
	)
}
export default CreateCode
