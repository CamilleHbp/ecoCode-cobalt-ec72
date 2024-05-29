import pg from 'pg'
const { Pool } = pg

const connectionString = 'postgres://postgres:password@localhost:5432/postgres';

const db = new Pool({
        connectionString,
});

export async function initUsersTable(){
    await db.query('DROP TABLE IF EXISTS users');
    await db.query('CREATE TABLE users (firstname varchar(100) not null,lastname varchar(100) not null)');
};

export default db;