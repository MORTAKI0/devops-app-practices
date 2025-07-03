import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wcwyzpjxriczthlsycqr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indjd3l6cGp4cmljenRobHN5Y3FyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE1MzYzNTksImV4cCI6MjA2NzExMjM1OX0.3M2vza3xojpVsnrEIQL8UjNINDP62U5agq5LhNblatQ'; // your anon key

export const supabase = createClient(supabaseUrl, supabaseKey);
