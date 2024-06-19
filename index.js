// Import dotenv as early as possible in the process
import 'dotenv/config';
import stringifyObject from 'stringify-object';
import logger from './logging/pino.js';
import { diffStats } from './monitoring/stats.js';
import {loop, noloop} from './src/index.js';

const runTest = async (usersCount) => {
    const noLoopStats = await noloop(usersCount);
    const loopStats = await loop(usersCount);
    logger.info("Diff stats: ", stringifyObject(diffStats(loopStats, noLoopStats)));
}

for (const usersCount of [10000,100000,300000,300000,300000]) {
    await runTest(usersCount)
}


process.exit(0);