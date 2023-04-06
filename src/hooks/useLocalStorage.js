import { useCallback } from "react"

export const useLocalStorage = () => {
    const fetchLocalStoregeData = useCallback((key, initialValue) => {
        try {
            const data = localStorage.getItem(key)
            if (data) {
                return JSON.parse(data)
            } else {
                localStorage.setItem(key, JSON.stringify(initialValue))
            }

        } catch (error) {
            localStorage.setItem(key, JSON.stringify(initialValue));
            return initialValue
        }
    }, [])

    return {
        fetchLocalStoregeData
    }
}
