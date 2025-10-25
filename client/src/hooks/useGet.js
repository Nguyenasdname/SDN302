import { useState } from "react";
import api from "../api";
import { useEffect } from "react";

export const useGet = (endpoint) => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token')
                const res = await api.get(endpoint, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setData(res.data)
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [endpoint])
    return { data, loading, error }
}