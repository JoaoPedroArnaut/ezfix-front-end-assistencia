import axios from "axios";
import { parseCookies } from "nookies";

const cookies = parseCookies()

export let api = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
        "Authorization": `Bearer ${cookies.token}`
    }
})

export function setToken(token) {
    api = axios.create({
        baseURL: url(),
        headers: { Authorization: `Bearer ${token}` }
    })
}

export function url(){
    return "https://api.ezfix.com.br"
    // return "http://localhost:8080"
}