import React, { useState } from 'react'
import ProfilePic from "../../assets/images/avatars/image-juliusomo.png"
import data from "../../data/data.json"


import "./AddComment.css"

export const AddComment = ({ text, addToComment, replyingToUser = "", initialContent }) => {
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
            <div class="comment__input__container comment__container">
                <img src={ProfilePic} alt="User Profile" class="profile__pic" />
                <textarea class="comment__input" placeholder="Add a comment..." value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                <button class="comment__btn" onClick={addComment} disabled={!comment.length}>{text}</button>
            </div>
        </>

    )
}
