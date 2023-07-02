import axios from "axios";

const localAPIURL = () => { return import.meta.env.VITE_LOCAL_API_URL }

const APIHelper = axios.create({
    withCredentials: true,
    baseURL: localAPIURL()
})

export default APIHelper;