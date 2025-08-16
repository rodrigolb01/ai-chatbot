import {neon} from '@neondatabase/serverless';
import {drizzle} from 'drizzle-orm/neon-http';
import {config} from 'dotenv';

// Load env vars
config({path: '.env'});

if(!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined in the environment variables');
}

//init neon client
const sql = neon(process.env.DATABASE_URL);

//init drizzle
const db = drizzle(sql);