import 'dotenv/config';
import { noloop } from "./noloop.js";
import { loop } from "./loop.js";
import { initUsersTable } from "./db.js";
import { setStartDate, getMonitoringData} from "./monitoring-api.js";
import stringifyObject from 'stringify-object';
import { diffStats, getStats } from './stats.js';

await initUsersTable();
setStartDate();
const insertNoLoopResults = await noloop();
console.log("NoLoop inserted count: ", insertNoLoopResults.rowCount);
const monitoringNoLoopData = await getMonitoringData();
const noLoopStats = getStats(monitoringNoLoopData);
console.log("NoLoop stats: ", stringifyObject(noLoopStats));

const delay = (delayInms) => {
    return new Promise(resolve => setTimeout(resolve, delayInms));
  };
await delay(10000);

await initUsersTable();
setStartDate();
const insertResults = await loop();
console.log("Loop inserted count: ", insertResults.reduce((accumulator, currentValue) => accumulator + currentValue.rowCount, 0));
const monitoringData = await getMonitoringData();
const stats = getStats(monitoringData);
console.log("Loop stats: ", stringifyObject(stats));

console.log("Diff stats: ", stringifyObject(diffStats(stats, noLoopStats)));