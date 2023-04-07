import { useEffect, useState } from "react"
import commentsInfo from "../data/data.json"

export const useLocalStorage = (key, initialValue = commentsInfo) => {
    const [commentListInfo, setcommentListInfo] = useState({})
    const [isLoading, setisLoading] = useState(false)

    const retrieveLocalStorageData = (key) => {
        const nestedCommentData = JSON.parse(localStorage.getItem(key))
        if (nestedCommentData) {
            return nestedCommentData
        } else {
            return {
                currentUser: {},
                comments: []
            }
        }
    }

    useEffect(() => {
        setisLoading(true)
        const nestedCommentData = JSON.parse(localStorage.getItem(key))
        if (nestedCommentData) {
            setcommentListInfo(nestedCommentData)
        } else {
            localStorage.setItem(key, JSON.stringify(initialValue))
            setcommentListInfo(initialValue)
        }
        let timeout = setTimeout(() => {
            setisLoading(false)
        }, 1000)
        return () => {
            clearTimeout(timeout)
        }
    }, [initialValue, key])

    const retriveUserInfo = () => {
        const nestedCommentData = retrieveLocalStorageData(key)
        return nestedCommentData.currentUser
    }

    const updateCommentListInfo = (comments) => {
        setisLoading(true)
        const data = retrieveLocalStorageData(key)
        const updatedData = JSON.stringify({ ...data, comments })
        localStorage.setItem(key, updatedData)
        setcommentListInfo((prev) => ({ ...prev, comments }))
        setisLoading(false)
    }

    return {
        commentListInfo, setcommentListInfo, retriveUserInfo, updateCommentListInfo, isLoading
    }
}
