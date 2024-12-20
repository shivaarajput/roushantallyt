import { createClient } from "@supabase/supabase-js";

// Supabase configuration
const supabaseUrl = "https://fsubnjfvklblrbyyetps.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzdWJuamZ2a2xibHJieXlldHBzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ2MTc4NzYsImV4cCI6MjA1MDE5Mzg3Nn0.OQ-o0riRNs1d42iewSEJuc9j1C8009BVpuV7_6ON5yE";
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
