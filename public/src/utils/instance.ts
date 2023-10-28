import axios from "axios";

export const instance = axios.create({
    baseURL:"http://localhost:5001",
    timeout:3000,
    headers: {
        Accept:"application/json",
        'x-rapidapi-key': '<your-key-here>'
    }
})