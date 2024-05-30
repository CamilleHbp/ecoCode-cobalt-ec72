import db from "./db.js";
import users from "./users.js";

export async function loop(){
    return Promise.all(users.map(insertSQL));
};

async function insertSQL({firstname ,lastname }){
    return db.query(`INSERT INTO users(firstname,lastname) VALUES('${firstname}','${lastname}')`);
}