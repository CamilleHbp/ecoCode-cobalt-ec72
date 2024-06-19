import fetch from 'node-fetch';

const cAdvisorApi = {
    baseUrl: 'http://cadvisor:8080/api/v1.3',
}
const containerName = 'devcontainer'


// This global startDate is used to set the start time for the monitoring data
let startDate;

/**
 * Sets the start date to the current date and time.
 */
export function setStartDate() {
    startDate = new Date(Date.now()).toISOString();
}

/**
 * Retrieves monitoring data for a specific container through cAdvisor.
 * @returns {Promise<Array>} The raw monitoring data for the container.
 */
export async function getMonitoringData() {
    const params = new URLSearchParams();
    params.append('start_time', encodeURIComponent(startDate))

    const requestUrl = cAdvisorApi.baseUrl + `/docker/${containerName}?` + params;

    return await fetch(requestUrl, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => {
            const containerID = Object.keys(data)[0]
            return data[containerID].stats;
        })
}
