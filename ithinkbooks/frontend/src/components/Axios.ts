import axios from 'axios';

const getCookie = (name: string) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === `${name}=`) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

const baseUrl = 'http://ratchekx.beget.tech/';
const axiosInstance = axios.create({
    baseURL: baseUrl, 
    timeout: 5000
});

export default axiosInstance;

export {getCookie};
