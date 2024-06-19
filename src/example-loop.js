import stringifyObject from 'stringify-object';

import db from "../db/db.js";
import logger from '../logging/pino.js';
import { setStartDate, getMonitoringData} from "../monitoring/monitoring-api.js";
import { getStats } from '../monitoring/stats.js';
import { getUsers, initUsersTable } from "./users.js";
import delay from '../utils/delay.js';

async function insertSQL({firstname ,lastname }){
    return db.query(`INSERT INTO users(firstname,lastname) VALUES('${firstname}','${lastname}')`);
}

/**
 * Executes an asynchronous query for each user in the given array.
 * @param {Array} users - An array of user objects.
 * @returns {Promise<Array>} - A promise that resolves to an array of results from the queries.
 */
async function loopQuery(users){
    return Promise.all(users.map(insertSQL));
};

/**
 * Executes a loop that inserts multiple users in multiple SQL queries, and returns statistics.
 *
 * @param {number} usersCount - The number of users to query.
 * @returns {Promise<import('../monitoring/stats.js').Stats>} The statistics object.
 */
export default async function loop(usersCount) {
    await initUsersTable();
    setStartDate();
    const users = getUsers(usersCount);
    const results = await loopQuery(users);
    const monitoringData = await getMonitoringData();
    const stats = getStats(monitoringData);
    logger.info(`$[Loop Query][${usersCount}] stats:`);
    logger.info({ stats: { type: 'loopQuery', ...stats }});
    await delay(1000);
    return stats;
}