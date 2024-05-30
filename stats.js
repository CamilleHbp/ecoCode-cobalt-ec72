function getRawStats(events) {
    const rawStats = {
        cpu_total : [],
        cpu_user : [],
        cpu_system : [],
        memory_usage : [],
        networks_rx : 0,
        networks_tx : 0,
    };
    events.forEach(event => {
        rawStats.cpu_total.push(event['cpu']['usage']['total'])
        rawStats.cpu_user.push(event['cpu']['usage']['user'])
        rawStats.cpu_system.push(event['cpu']['usage']['system'])
        rawStats.memory_usage.push(event['memory']['usage'])
        rawStats.networks_rx+=event['network']['rx_bytes']
        rawStats.networks_tx+=event['network']['tx_bytes']
    })
    return rawStats;
}

function cpuDiff(cpu_array){
    return cpu_array[cpu_array.length- 1] - cpu_array[0]
}

export function getStats(events) {
    const {
        cpu_total,
        cpu_user,
        cpu_system,
        memory_usage,
        networks_rx,
        networks_tx
    } = getRawStats(events);

    return {
        diff_cpu_total: cpuDiff(cpu_total),
        diff_cpu_user: cpuDiff(cpu_user),
        diff_cpu_system: cpuDiff(cpu_system),
        memory_usage: Math.max(...memory_usage),
        networks_rx,
        networks_tx,
    }
}


export function displayStats(){
    console.log(`cpu total max (uCore): ${cpuDiff(cpu_total)}`)
    console.log(`cpu user max (uCore): ${cpuDiff(cpu_user)}`)
    console.log(`cpu system max (uCore): ${cpuDiff(cpu_system)}`)
    console.log(`memory usage max (mb) ${Math.max(...memory_usage)}`)
    console.log(`memory maxusage max (mb) ${Math.max(...memory_maxusage)}`)
    console.log(`network rx total ${networks_rx}`)
    console.log(`network tx total ${networks_tx}`)

}

export function diffStats(stats_a, stats_b) {
    return {
        diff_cpu_total: stats_a.diff_cpu_total - stats_b.diff_cpu_total,
        diff_cpu_user: stats_a.diff_cpu_user - stats_b.diff_cpu_user,
        diff_cpu_system: stats_a.diff_cpu_system - stats_b.diff_cpu_system,
        memory_usage: stats_a.memory_usage - stats_b.memory_usage,
        networks_rx: stats_a.networks_rx - stats_b.networks_rx,
        networks_tx: stats_a.networks_tx - stats_b.networks_tx,
    }
}