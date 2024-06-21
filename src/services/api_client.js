import axios from 'axios';

console.log(process.env.REACT_APP_API_URL);

const apiInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {'authorization': `Bearer ${process.env.REACT_APP_API_VALIDATION_TOKEN}`}
});

export default apiInstance;