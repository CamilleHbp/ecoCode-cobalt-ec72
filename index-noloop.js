import 'dotenv/config'
import { noloop } from "./noloop.js";
import { initUsersTable } from "./db.js";
import { setStartDate, getMonitoringData} from "./monitoring-api.js";
import stringifyObject from 'stringify-object';
import { getStats } from './stats.js';

await initUsersTable();
setStartDate();
const insertResults = await noloop();
console.log("Loop inserted count: ", insertResults.rowCount);
const monitoringData = await getMonitoringData();
const stats = getStats(monitoringData);
console.log("Loop stats: ", stringifyObject(stats));

process.exit(0)