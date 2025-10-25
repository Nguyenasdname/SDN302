import { useState } from 'react';
import api from '../api';

export const usePut = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const putData = async (endpoint, payload) => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token')
            const res = await api.put(endpoint, payload, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return res.data;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { putData, loading, error };
};
