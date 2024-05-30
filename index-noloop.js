import 'dotenv/config'
import { noloop } from "./noloop.js";
import { initUsersTable } from "./db.js";
import { setStartDate, getMonitoringData} from "./monitoring-api.js";

await initUsersTable();
setStartDate();
const insertResults = await noloop();
const monitoringData = await getMonitoringData();
console.log("Loop inserted count: ", insertResults.rowCount);

process.exit(0)