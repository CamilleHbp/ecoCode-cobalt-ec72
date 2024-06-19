import pg from 'pg'
const { Pool } = pg

/**
 * The connection string for connecting to the PostgreSQL database.
 * These environment variables are defined in the `.devcontainer/.env` file
 * 
 * @type {string}
 */
const connectionString = `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@db:5432/${process.env.POSTGRES_DB}`;

/**
 * Database connection pool.
 * @type {Pool}
 */
const db = new Pool({
        connectionString,
});

// Export the database instance to be used in other files
export default db;
