import sql from "./db.js";
import {users} from "./data.js";

export async function loop(){
    return Promise.all(users.map(insertSQL));

};

async function insertSQL({firstname ,lastname }){
    console.log("insertion de l'utilisateur : ",firstname)
    return sql`INSERT INTO users(ﬁrstname,lastname) VALUES(${firstname},${lastname})`;
}