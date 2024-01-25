import { createClient } from "@supabase/supabase-js"

if (
	process.env.DATABASE_URL === undefined ||
	process.env.SUPABASE_KEY === undefined
) {
	throw new Error(
		"Please define DATABASE_URL and SUPABASE_KEY in your .env.local file",
	)
}
export const supabase = createClient(
	process.env.DATABASE_URL,
	process.env.SUPABASE_KEY,
)
