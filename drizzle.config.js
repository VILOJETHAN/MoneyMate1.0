/*import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema:"./utils/schema.js",
  out: "./drizzle",
  driver:'pg',
  dbCredentials:{
        connectionString: 'postgresql://Expense-Tracker_owner:npg_0EY4OHBiTLQI@ep-rapid-cloud-a4tbhgud-pooler.us-east-1.aws.neon.tech/Expense-Tracker?sslmode=require',
    }
});
*/

/*
import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  schema: "./utils/schema.jsx",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL,
  },
});
*/

/*
 export default{
    schema:"./utils/schema.jsx",
    driver:'pg',
    dbCredentials:{
        connectionString: process.env.DATABASE_URL,
    }
}
 */

/*
import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: "./utils/schema.js",
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
*/

/*
import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './utils/schema.js', // ideally convert .jsx to .ts or .js
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_DATABASE_URL,
  },
});
*/


import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './utils/schema.jsx',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_DATABASE_URL
  },
});



