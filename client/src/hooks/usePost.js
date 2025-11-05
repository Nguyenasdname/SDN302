import { useState } from "react";
import api from "../api";

export const usePost = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const postData = async (endpoint, payload) => {
        setLoading(true)
        try {
            const res = await api.post(endpoint, payload)
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