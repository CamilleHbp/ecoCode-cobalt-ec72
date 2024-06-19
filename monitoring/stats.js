import logger from '../logging/pino.js';

/**
 * An object containing the raw CPU, RAM and network statistics of a docker container.
 * @typedef {Object} RawStats
 * @property {number[]} cpu_total - Array of CPU time values during monitoring in the docker container. Unit: [nanoseconds]
 * @property {number[]} cpu_user - Array of CPU time values during monitoring spent in user space. Unit: [nanoseconds]
 * @property {number[]} cpu_system - Array of CPU time values during monitoring spent in kernel space. Unit: [nanoseconds]
 * @property {number[]} memory_usage - Array of current memory usage values during monitoring, this includes all memory regardless of when it was accessed. Units: [bytes]
 * @property {number[]} memory_maxusage - Array of maximum memory usage values recorded during monitoring. Doesn't seem to be accurate. Units: [bytes]
 * @property {number} networks_rx - Bytes received over the network. Unit: bytes.
 * @property {number} networks_tx - Bytes transmitted over the network. Unit: bytes.
 */

/**
 * An object containing the CPU, RAM and network statistics of a docker container.
 * @typedef {Object} Stats
 * @property {number} diff_cpu_total - Total CPU time in the docker container. Unit: nanoseconds
 * @property {number} diff_cpu_user - CPU time spent in user space. Unit: nanoseconds
 * @property {number} diff_cpu_system - CPU time spent in kernel space. Unit: nanoseconds
 * @property {number} max_memory_usage - Maximum value of current memory usage, this includes all memory regardless of when it was accessed. Units: bytes.    
 * @property {number} max_memory_maxusage - Maximum memory usage recorded. Doesn't seem to be accurate. Units: bytes.
 * @property {number} networks_rx - Bytes received over the network. Unit: bytes.
 * @property {number} networks_tx - Bytes transmitted over the network. Unit: bytes.
 * 
 * A diff_ property is the difference between the last and first elements of the array during the monitoring period.
 * A max_ property is the maximum value recorded during the monitoring period.
 */

/**
 * Retrieves raw statistics from the given events.
 *
 * @param {Array} events - The array of events containing the statistics.
 * @returns {Object} - The object containing the raw statistics.
 */
function getRawStats(events) {
    const rawStats = {
        cpu_total : [],
        cpu_user : [],
        cpu_system : [],
        memory_usage : [],
        memory_maxusage :[],
        networks_rx : 0,
        networks_tx : 0,
    };
    events.forEach(event => {
        rawStats.cpu_total.push(event['cpu']['usage']['total'])
        rawStats.cpu_user.push(event['cpu']['usage']['user'])
        rawStats.cpu_system.push(event['cpu']['usage']['system'])
        rawStats.memory_usage.push(event['memory']['usage'])
        rawStats.memory_maxusage.push(event['memory']['max_usage'])
        rawStats.networks_rx+=event['network']['rx_bytes']
        rawStats.networks_tx+=event['network']['tx_bytes']
    })
    return rawStats;
}

/**
 * Calculates the difference between the last and first elements of the given CPU usage array.
 * CPU usage (or CPU time, or process time) is the amount of time for which a central processing unit (CPU) was used for processing instructions of a computer program or operating system. See: https://en.wikipedia.org/wiki/CPU_time
 *
 * @param {number[]} cpu_array - The array of CPU usage values.
 * @returns {number} The difference between the last and first elements of the CPU array.
 */
function cpuDiff(cpu_array){
    return cpu_array[cpu_array.length- 1] - cpu_array[0]
}




/**
 * Calculates and returns the statistics based on the provided events.
 *
 * @param {Array} events - The array of events to calculate statistics from.
 * @returns {Stats} stats - The calculated statistics object.
 */
export function getStats(events) {
    const {
        cpu_total,
        cpu_user,
        cpu_system,
        memory_usage,
        memory_maxusage,
        networks_rx,
        networks_tx
    } = getRawStats(events);

    return {
        diff_cpu_total: cpuDiff(cpu_total),
        diff_cpu_user: cpuDiff(cpu_user),
        diff_cpu_system: cpuDiff(cpu_system),
        max_memory_usage: Math.max(...memory_usage),
        max_memory_maxusage: Math.max(...memory_maxusage),
        networks_rx,
        networks_tx,
    }
}


/**
 * Displays the statistics related to CPU, memory, and network usage, using logger.info()
 */
export function displayStats(){
    logger.info(`cpu total max (uCore): ${cpuDiff(cpu_total)}`)
    logger.info(`cpu user max (uCore): ${cpuDiff(cpu_user)}`)
    logger.info(`cpu system max (uCore): ${cpuDiff(cpu_system)}`)
    logger.info(`memory usage max (mb) ${Math.max(...memory_usage)}`)
    logger.info(`memory maxusage max (mb) ${Math.max(...memory_maxusage)}`)
    logger.info(`network rx total ${networks_rx}`)
    logger.info(`network tx total ${networks_tx}`)
}


/**
 * Calculates the difference between two sets of stats.
 *
 * @param {Stats} stats_a - The first set of stats.
 * @param {Stats} stats_b - The second set of stats.
 * @returns {Stats} - The difference between the two sets of stats.
 */
export function diffStats(stats_a, stats_b) {
    return {
        diff_cpu_total: stats_a.diff_cpu_total - stats_b.diff_cpu_total,
        diff_cpu_user: stats_a.diff_cpu_user - stats_b.diff_cpu_user,
        diff_cpu_system: stats_a.diff_cpu_system - stats_b.diff_cpu_system,
        max_memory_usage: stats_a.max_memory_usage - stats_b.max_memory_usage,
        max_memory_maxusage: stats_a.max_memory_maxusage - stats_b.max_memory_maxusage,
        networks_rx: stats_a.networks_rx - stats_b.networks_rx,
        networks_tx: stats_a.networks_tx - stats_b.networks_tx,
    }
}