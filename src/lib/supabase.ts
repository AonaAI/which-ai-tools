import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://etbmmljggjgwkfphqdrf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0Ym1tbGpnZ2pnd2tmcGhxZHJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEyMjY5NDMsImV4cCI6MjA4NjgwMjk0M30.WZGbtU5WzpbYTy-RifK0WxueEQU_yICOA4afjQxm0OI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
