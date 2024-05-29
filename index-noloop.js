import { noloop } from "./noloop.js";
import { initUsersTable } from "./db.js";

await initUsersTable()
console.log("init db done")
await noloop()
console.log("fin")


process.exit(0)