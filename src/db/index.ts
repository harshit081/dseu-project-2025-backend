// src/utils/db.ts
import { Pool } from "pg";

const pool = new Pool({
    user: process.env.PGUSER || "postgres",
    host: process.env.PGHOST || "localhost",
    database: process.env.PGDATABASE || "mydb",
    password: process.env.PGPASSWORD || "password",
    port: Number(process.env.PGPORT) || 5432,
    ssl: { rejectUnauthorized: false },
});

export default pool;

// Test the database connection when the app starts
pool.connect()
    .then((client) => {
        console.log("Connected to PostgreSQL database successfully.");
        client.release(); // Release the client back to the pool
    })
    .catch((err) => {
        console.error("Failed to connect to PostgreSQL database:", err);
    });
