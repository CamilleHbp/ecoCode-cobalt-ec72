import db from "./db.js";

export async function loop(users){
    return Promise.all(users.map(insertSQL));
};

async function insertSQL({firstname ,lastname }){
    return db.query(`INSERT INTO users(firstname,lastname) VALUES('${firstname}','${lastname}')`);
}