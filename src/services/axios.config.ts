import axios from 'axios';

const apiClient = axios.create({
    // @ts-ignore
    baseURL: 'http://localhost:4000/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default apiClient;
