// db.js
import postgres from 'postgres'

const sql = postgres('postgres://postgres:password@localhost:5432/postgres'); // will use psql environment variables

export default sql


export async function initUsersTable(){
    await sql`DROP TABLE users`
    return await sql`CREATE TABLE users (ﬁrstname varchar(100) not null,lastname varchar(100) not null)`;
}