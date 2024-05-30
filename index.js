import 'dotenv/config';
import { noloop } from "./noloop.js";
import { loop } from "./loop.js";
import { initUsersTable } from "./db.js";
import { setStartDate, getMonitoringData} from "./monitoring-api.js";
import stringifyObject from 'stringify-object';
import { diffStats, getStats } from './stats.js';
import { getUsers } from './users.js';

const delay = (delayInms) => {
    return new Promise(resolve => setTimeout(resolve, delayInms));
  };

const runLoop = async (loopName, loopFn, usersCount) => {
    await initUsersTable();
    setStartDate();
    const users = getUsers(usersCount);
    const results = await loopFn(users);
    const monitoringData = await getMonitoringData();
    const stats = getStats(monitoringData);
    console.log(`${loopName}[${usersCount}] stats: `, stringifyObject(stats));
    await delay(1000);
    return stats;
}

const runTest = async (usersCount) => {
    const noLoopStats = await runLoop('No Loop', noloop, usersCount);
    const loopStats = await runLoop('Loop', loop, usersCount);
    console.log("Diff stats: ", stringifyObject(diffStats(loopStats, noLoopStats)));
}


for (const usersCount of [10000, 100000, 300000]) {
    await runTest(usersCount)
}


process.exit(0);