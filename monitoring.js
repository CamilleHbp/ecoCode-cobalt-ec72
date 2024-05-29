const cAdvisorApi = {
    baseUrl: 'http://localhost:8080/api/v1.3/',
}

async function startRecording() {
    await fetch(cAdvisorApi.baseUrl + 'events/stream')
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })
}