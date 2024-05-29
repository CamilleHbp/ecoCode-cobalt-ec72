import { loop } from "./loop.js";
import { initUsersTable } from "./db.js";

await initUsersTable()
console.log("init db done")
await loop()
console.log("fin")


process.exit(0)