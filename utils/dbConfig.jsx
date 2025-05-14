/*import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema'

const sql = neon('postgresql://Expense-Tracker_owner:npg_0EY4OHBiTLQI@ep-rapid-cloud-a4tbhgud-pooler.us-east-1.aws.neon.tech/Expense-Tracker?sslmode=require');
const db = drizzle({ client: sql, schema });
*/


/*
'use server';

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

const sql = neon(process.env.DATABASE_URL); // NOT NEXT_PUBLIC_
export const db = drizzle(sql, { schema });
*/

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL); // Make sure this is server-only
export const db = drizzle(sql, { schema });
