import db from "./db.js";

export async function noloop(users){
    const userValues =  users.map((user) => `('${user.firstname}', '${user.lastname}')`).join(', ');
    const query = `INSERT INTO users (firstname, lastname) VALUES ${userValues};`;
    return await db.query(query);
}

