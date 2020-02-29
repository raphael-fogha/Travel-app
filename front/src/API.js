const API_URL = "http://localhost:5000";

export async function getLogEntries(){
    const response = await fetch(`${API_URL}/api/logs`);
    return response.json();
}

export async function createLogEntry(entry){
    const response = await fetch(`${API_URL}/api/logs`, {
        method:'POST',
        headers:{
            "content-type": "application/json",
        },
        body: JSON.stringify(entry),
    });
    return response.json();
}