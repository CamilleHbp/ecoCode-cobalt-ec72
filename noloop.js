import sql from "./db.js";
import {users} from "./data.js";

export async function noloop(){
    console.log(await sql`INSERT INTO users ${ sql(users, 'firstname', 'lastname')}`.describe())
    await sql`INSERT INTO users ${ sql(users, 'firstname', 'lastname')}`;

};

