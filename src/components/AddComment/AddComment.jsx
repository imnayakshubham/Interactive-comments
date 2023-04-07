import React, { useState } from 'react'
import ProfilePic from "../../assets/images/avatars/image-juliusomo.png"
import data from "../../data/data.json"
import { useLocalStorage } from '../../hooks/useLocalStorage'


import "./AddComment.css"

export const AddComment = ({ text, addToComment, replyingToUser = "", initialContent }) => {
    const { isLoading } = useLocalStorage("nestedCommentData")

    const [comment, setComment] = useState(initialContent ?? "");
    const replyingTo = replyingToUser ? `@${replyingToUser}, ` : "";

    const addComment = () => {
        if (text !== "Update") {
            const newComment = {
                id: new Date().getTime(),
                content: replyingTo + comment.replace(replyingTo, ""),
                createdAt: new Date(),
                score: 0,
                user: data.currentUser,
                replies: [],
            };
            addToComment(newComment)
        } else {
            addToComment(replyingTo + comment.replace(replyingTo, ""))
        }
        setComment("")
    }

    return (
        <>
            <div className="comment__input__container comment__container">
                <img src={ProfilePic} alt="User Profile" className="profile__pic" />
                <textarea className="comment__input" placeholder="Add a comment..." value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                <button className={`comment__btn ${isLoading || !comment.length ? 'disable__btn' : ""}`} onClick={addComment} disabled={isLoading || !comment.length}>{text}</button>
            </div>
        </>

    )
}
