import { createClient } from '@supabase/supabase-js'

const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const key = process.env.NEXT_PUBLIC_SUPABASE_KEY!

const supabase = createClient(baseUrl, key)

export default supabase
