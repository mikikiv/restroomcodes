"use client"
import { Box, Button, Container, Text, TextInput, Title } from "@mantine/core"

import { useState } from "react"

type Props = {}
const CreateCode = (props: Props) => {
  const [code, setCode] = useState("")

  const submitCode = async (code: string) => {
    console.log(code)
    try {
      const response = await fetch("/api/codes", {
        method: "POST",
      })
      console.log(await response.json())
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <Box>
        <Title>Report a new code</Title>
        <Container>
          <Text>Use the form below to report a new code.</Text>
        </Container>

        <TextInput
          placeholder="1234"
          value={code}
          onChange={(e) => {
            setCode(e.currentTarget.value)
          }}
        />
        <Button
          onClick={() => {
            submitCode(code)
          }}
        >
          Create Code
        </Button>
      </Box>
    </>
  )
}
export default CreateCode
