import axios from 'axios';

export function get_atmosphere() {
    return axios.get("/api/v1/atmosphere");
}

export function start_atmosphere() {
    return axios.post("/api/v1/atmosphere", {
        "name": "start",
        "value": "0"
    });
}

export function stop_atmosphere() {
    return axios.post("/api/v1/atmosphere", {
        "name": "stop",
        "value": "0"
    });
}

export function set_interval() {
    return axios.post("/api/v1/atmosphere", {
        "name": "set_interval",
        "value": "30"
    });
}
