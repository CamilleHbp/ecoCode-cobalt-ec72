import fetch from 'node-fetch';


const cAdvisorApi = {
    baseUrl: 'http://cadvisor:8080/api/v1.3',
}
const containerName = 'devcontainer'


let startDate;

export async function setStartDate() {
    startDate = new Date().toISOString();
}

export async function getMonitoringData() {
    const params = new URLSearchParams();
    params.append('start_time', startDate)

    return await fetch(cAdvisorApi.baseUrl + `/docker/${containerName}?` + params)
        .then(response => {
            return response.json()})
        .then(data => {
            const containerID = Object.keys(data)[0]
            readStat(data[containerID].stats)
            displayStats()
        })
}

const cpu_total = []
const cpu_user = []
const cpu_system = []
const memory_usage = []
const memory_maxusage =[]
var networks_rx = 0
var networks_tx = 0

function readStat(events){
    events.map(event => {
        cpu_total.push(event['cpu']['usage']['total'])
        cpu_user.push(event['cpu']['usage']['user'])
        cpu_system.push(event['cpu']['usage']['system'])
        memory_usage.push(event['memory']['usage'])
        memory_maxusage.push(event['memory']['max_usage'])
        networks_rx+=event['network']['rx_bytes']
        networks_tx+=event['network']['tx_bytes']
    })
}

function cpuDiff(cpu_array){
    return cpu_array[cpu_array.length- 1] - cpu_array[0]
}

function displayStats(){
    console.log(`cpu total max (uCore): ${cpuDiff(cpu_total)}`)
    console.log(`cpu user max (uCore): ${cpuDiff(cpu_user)}`)
    console.log(`cpu system max (uCore): ${cpuDiff(cpu_system)}`)
    console.log(`memory usage max (mb) ${Math.max(...memory_usage)}`)
    console.log(`memory maxusage max (mb) ${Math.max(...memory_maxusage)}`)
    console.log(`network rx total ${networks_rx}`)
    console.log(`network tx total ${networks_tx}`)

}