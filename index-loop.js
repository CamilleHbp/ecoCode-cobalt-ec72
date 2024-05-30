import 'dotenv/config';
import { loop } from "./loop.js";
import { initUsersTable } from "./db.js";
import { setStartDate, getMonitoringData} from "./monitoring-api.js";
import stringifyObject from 'stringify-object';
import { getStats } from './stats.js';
import users from './users.js';


await initUsersTable();
setStartDate();
const insertResults = await loop(users);
console.log("Loop inserted count: ", insertResults.reduce((accumulator, currentValue) => accumulator + currentValue.rowCount, 0));
const monitoringData = await getMonitoringData();
const stats = getStats(monitoringData);
console.log("Loop stats: ", stringifyObject(stats));

process.exit(0)