import { createClient } from '@supabase/supabase-js';
import { loadEnv } from '../../config/env';

const { VITE_SUPABASE_URL, VITE_SUPABASE_KEY } = loadEnv();

export const supabase = createClient(VITE_SUPABASE_URL, VITE_SUPABASE_KEY);
