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

    return await fetch(cAdvisorApi.baseUrl + `/events/${containerName}` + params)
        .then(response => response.body)
        .then(data => {
            return data;
        })
}