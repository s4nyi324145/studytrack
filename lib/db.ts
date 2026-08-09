import pg from "pg";

//Pg pool singleton 

const globalForPg = globalThis as unknown as { pool: pg.Pool | undefined}

export const pool = globalForPg.pool ?? new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false, 
    max: 10,
    idleTimeoutMillis: 30000, // close idle clients after 30 seconds
    connectionTimeoutMillis: 2000, // return an error after 2 seconds if connection could not be established

});

if(process.env.NODE_ENV !== "production") globalForPg.pool = pool;

export default pool;