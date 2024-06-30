import axios from 'axios';

const apiInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {'authorization': `Bearer ${process.env.REACT_APP_API_VALIDATION_TOKEN}`}
});

export default apiInstance;