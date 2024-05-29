import { loop } from "./loop.js";
import { initUsersTable } from "./db.js";

await initUsersTable();
const result = await loop();
console.log("Loop inserted count: ", result.reduce((accumulator, currentValue) => accumulator + currentValue.rowCount, 0));


process.exit(0)