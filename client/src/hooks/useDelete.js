import { useState } from 'react';
import api from '../api';

export const useDelete = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const deleteData = async (endpoint) => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token')
            const res = await api.delete(endpoint, {
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

    return { deleteData, loading, error };
};
