import axios from "axios";
export const host = "http://localhost:10000"

export const instance = axios.create({
    baseURL:`${host}/api` ,
    timeout:3000,
    headers: {
        Accept:"application/json",
        'x-rapidapi-key': '<your-key-here>',
        'Access-Control-Allow-Origin': '*'
    }
})