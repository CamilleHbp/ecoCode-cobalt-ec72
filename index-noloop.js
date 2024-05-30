import 'dotenv/config'
import { noloop } from "./noloop.js";
import { initUsersTable } from "./db.js";

await initUsersTable();
const result = await noloop();
console.log("No Loop inserted count: ", result.rowCount);

process.exit(0)