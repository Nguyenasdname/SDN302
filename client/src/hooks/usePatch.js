import { useState } from "react";
import api from "../api";

export const usePatch = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const patchData = async (endpoint, payload) => {
        setLoading(true);
        setError(null);
        try {
            const res = await api.patch(endpoint, payload);
            return res.data;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { patchData, loading, error };
};
