import sql from "./db.js";
import {users} from "./data.js";

export async function noloop(){
    return sql`INSERT INTO users ${ sql(users, 'firstname', 'lastname')}`;

};

