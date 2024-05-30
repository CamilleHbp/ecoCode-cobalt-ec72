import fetch from 'node-fetch';

const cAdvisorApi = {
    baseUrl: 'http://cadvisor:8080/api/v1.3',
}
const containerName = 'devcontainer'


let startDate;

export async function setStartDate() {
    startDate = new Date(Date.now()).toISOString();
}

export async function getMonitoringData() {

    const params = new URLSearchParams();
    // params.append('start_time', startDate)
    params.append('start_time', encodeURIComponent(startDate))

    const requestUrl = cAdvisorApi.baseUrl + `/docker/${containerName}?` + params;
    console.log("Requesting: ", requestUrl);

    return await fetch(requestUrl, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => {
            const containerID = Object.keys(data)[0]
            return data[containerID].stats;
        })
}
