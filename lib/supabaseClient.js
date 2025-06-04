// lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://uftglbgmqiecmspxbpqu.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVmdGdsYmdtcWllY21zcHhicHF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5MjM5NTcsImV4cCI6MjA2MzQ5OTk1N30.BrTWD5Bp_oexwBkK5khGOG5UguniYBP1AP8NKBp5CuY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
