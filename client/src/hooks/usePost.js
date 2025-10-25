import { useState } from "react";
import api from "../api";

export const usePost = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const postData = async (endpoint, payload) => {
        setLoading(true)
        try {
            const token = localStorage.getItem('token')
            const res = await api.post(endpoint, payload, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return res.data
        } catch (err) {
            setError(err)
            throw err
        } finally {
            setLoading(false)
        }
    }

    return { postData, loading, error }
}