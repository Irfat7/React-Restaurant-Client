import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/', // Replace with your API URL
});

export const useAxiosSecure = () => {
    const { logOut } = useContext(AuthContext)

    // Add a request interceptor
    axiosInstance.interceptors.request.use(
        (config) => {
            // You can modify the request configuration here if needed
            // Add your authorization header here
            const token = localStorage.getItem('access-token'); // Replace with your actual authentication token retrieval logic
            if (token) {
                config.headers.authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    // Add a response interceptor
    axiosInstance.interceptors.response.use(
        (response) => {
            // Handle successful responses here
            return response;
        },
        (error) => {
            if (error.response.status === 401 || error.response.status === 403) {
                console.log('token problem logging out', error)
                /* logOut() */
            }
            return Promise.reject(error);
        }
    );

    return [axiosInstance]

};

export default useAxiosSecure;