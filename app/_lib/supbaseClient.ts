import { createClient } from "@supabase/supabase-js"

if (
	process.env.NEXT_PUBLIC_DATABASE_URL === undefined ||
	process.env.SUPABASE_KEY === undefined
) {
	throw new Error(
		"Please define NEXT_PUBLIC_DATABASE_URL and SUPABASE_KEY in your .env.local file",
	)
}
export const supabase = createClient(
	process.env.NEXT_PUBLIC_DATABASE_URL,
	process.env.SUPABASE_KEY,
)
