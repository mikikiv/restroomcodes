"use client"
import {
	Box,
	Button,
	Paper,
	Radio,
	RadioGroup,
	Text,
	TextInput,
} from "@mantine/core"
import { useForm } from "@mantine/form"
import { createCode } from "@/hooks/hooks"
import { useState } from "react"

const CreateCode = ({ ...rest }) => {
	const form = useForm({
		initialValues: {
			code: "",
			codeRequired: true,
		},
	})

	const handleSubmit = async () => {
		const data = new FormData()

		for (const [key, value] of Object.entries(form.values)) {
			if (!value) continue
			data.append(key, value.toString())
		}
		try {
			const res = await createCode(data)
			//@ts-expect-error
			if (!res?.ok) {
				throw new Error("Failed to create code")
			}
			form.reset()
			return "submitted"
			//@todo: add toast
		} catch (error) {
			console.error(error)
		}
	}
	return (
		<Paper {...rest}>
			<Text>Report a new code</Text>
			<Box>
				<TextInput
					w={"100%"}
					placeholder="1234"
					{...form.getInputProps("code")}
				/>
				<RadioGroup
					withAsterisk
					{...form.getInputProps("codeRequired", { type: "checkbox" })}
				>
					<Radio value="required" label="Code is required" />
					<Radio value="notRequired" label="Code is not required" />
				</RadioGroup>
				<Button fullWidth mt={"sm"} onClick={() => handleSubmit()}>
					Create Code
				</Button>
			</Box>
		</Paper>
	)
}
export default CreateCode
