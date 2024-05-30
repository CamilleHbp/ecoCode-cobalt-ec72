import 'dotenv/config';
import { loop } from "./loop.js";
import { initUsersTable } from "./db.js";
import { setStartDate, getMonitoringData} from "./monitoring-api.js";
import stringifyObject from 'stringify-object';


await initUsersTable();
setStartDate();
const insertResults = await loop();
const monitoringData = await getMonitoringData();
console.log("Loop inserted count: ", insertResults.reduce((accumulator, currentValue) => accumulator + currentValue.rowCount, 0));
//console.log(stringifyObject(monitoringData));

process.exit(0)