
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nvehatyvhfyakutnnshi.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im52ZWhhdHl2aGZ5YWt1dG5uc2hpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMxMTczMDIsImV4cCI6MjA2ODY5MzMwMn0.SMiL8_NmvmfKzbgc0PwOtC_Cjy34vqxOTIBziWqLzXI'
export const supabase = createClient(supabaseUrl, supabaseKey)
