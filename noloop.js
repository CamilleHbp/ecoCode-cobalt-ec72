import db from "./db.js";
import users from "./users.js";

export async function noloop(){
    const userValues =  users.map((user) => `('${user.firstname}', '${user.lastname}')`).join(', ');
    const query = `INSERT INTO users (firstname, lastname) VALUES ${userValues};`;
    return await db.query(query);
}

