import stringifyObject from 'stringify-object';

import db from "../db/db.js";
import logger from '../logging/pino.js';
import { setStartDate, getMonitoringData} from "../monitoring/monitoring-api.js";
import { getStats } from '../monitoring/stats.js';
import { getUsers, initUsersTable } from "./users.js";
import delay from '../utils/delay.js';

/**
 * Executes an SQL query to insert multiple users into the database in one query.
 * @param {Array<Object>} users - An array of user objects containing firstname and lastname properties.
 * @returns {Promise} A promise that resolves with the result of the query execution.
 */
export async function noloopQuery(users){
    const userValues =  users.map((user) => `('${user.firstname}', '${user.lastname}')`).join(', ');
    const query = `INSERT INTO users (firstname, lastname) VALUES ${userValues};`;
    return await db.query(query);
}

/**
 * Inserts multiple users in one SQL query, and returns statistics.
 *
 * @param {number} usersCount - The number of users to query.
 * @returns {Promise<import('../monitoring/stats.js').Stats>} stats - The statistics of the query operation.
 */
export default async function noloop(usersCount) {
    await initUsersTable();
    setStartDate();
    const users = getUsers(usersCount);
    const results = await noloopQuery(users);
    const monitoringData = await getMonitoringData();
    const stats = getStats(monitoringData);
    logger.info(`$[No Loop Query][${usersCount}] stats:`);
    logger.info({ stats: { type: 'noLoopQuery', ...stats }});
    await delay(1000);
    return stats;
};