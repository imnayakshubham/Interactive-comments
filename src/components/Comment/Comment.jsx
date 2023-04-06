import React, { useState } from 'react'
import "./Comment.css"
import data from "../../data/data.json"
import { highlightUserTags, timeAgo } from '../../utils'
import EditIcon from "../../assets/images/icon-edit.svg"
import DeleteIcon from "../../assets/images/icon-delete.svg"
import ReplyIcon from "../../assets/images/icon-reply.svg"
import PlusIcon from "../../assets/images/icon-plus.svg"
import MinusIcon from "../../assets/images/icon-minus.svg"
import { AddComment } from '../AddComment/AddComment'
import { DeleteModal } from '../DeleteModal/DeleteModal'


export const Comment = ({ commentData, isReply, updateCommentList, parentComment, deleteComment }) => {
    const currentUser = data.currentUser
    const [replying, setReplying] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [editMode, setEditMode] = useState(false)


    const showCommentContent = () => {
        return highlightUserTags(commentData.content)
    }

    const addReply = (newComment) => {
        if (Object.keys(commentData).includes("replies")) {
            const comment = { ...commentData, replies: [...commentData?.replies, newComment] }
            updateCommentList(comment, comment.id)
            setReplying(false)
        } else {
            const comment = { ...parentComment, replies: [...parentComment?.replies, newComment] }
            updateCommentList(comment, parentComment.id)
            setReplying(false)
        }
    }

    const handleDeleteComment = (data) => {
        deleteComment(data.parentComment?.id, data.commentData.id)
        setIsModalVisible(false)
    }

    const upvoteHandler = (commentData, parentComment) => {
        if (parentComment?.id) {
            const replies = [...parentComment.replies]
            replies.forEach((reply, index) => {
                if (reply.id === commentData.id) {
                    replies[index] = { ...reply, score: reply.score += 1, liked__by: currentUser.username }
                }
            })
            const updatedComment = { ...parentComment, replies }
            updateCommentList(updatedComment, parentComment.id)
        } else {
            const updatedComment = { ...commentData, score: commentData.score += 1, liked__by: currentUser.username }
            updateCommentList(updatedComment, updatedComment.id)
        }
    }

    const downVoteHandler = (commentData, parentComment) => {
        if (parentComment?.id) {
            const replies = [...parentComment.replies]
            replies.forEach((reply, index) => {
                if (reply.id === commentData.id) {
                    replies[index] = { ...reply, score: reply.score -= 1, liked__by: null }
                }
            })
            const updatedComment = { ...parentComment, replies }
            updateCommentList(updatedComment, parentComment.id)
        } else {
            const updatedComment = { ...commentData, score: commentData.score -= 1, liked__by: null }
            updateCommentList(updatedComment, updatedComment.id)
        }
    }

    const updateComment = (commentContent) => {
        if (parentComment?.id) {
            const replies = [...parentComment.replies]
            replies.forEach((reply, index) => {
                if (reply.id === commentData.id) {
                    replies[index] = { ...reply, content: commentContent }
                }
            })
            const updatedComment = { ...parentComment, replies }
            updateCommentList(updatedComment, parentComment.id)
        } else {
            const updatedComment = { ...commentData, content: commentContent }
            updateCommentList(updatedComment, updatedComment.id)
        }
        setEditMode(false)
    }

    return (
        <>
            <div className={`comment`}>
                <div className='vote'>
                    <img className={`upvote ${commentData.liked__by === currentUser.username ? 'disabled__votes' : ""}`} onClick={() => upvoteHandler(commentData, parentComment)} src={PlusIcon} alt="Up Vote" />
                    <div className='votes__count'>{commentData.score}</div>
                    <img className={`downvote ${(commentData.score <= 0 || !commentData.liked__by) ? "disabled__votes" : ""}`} src={MinusIcon} alt="Down vote" onClick={() => downVoteHandler(commentData, parentComment)} />
                </div>
                <div className='comment__content__container'>
                    <div className='comment__content__header'>
                        <div className='comment__content__header__info'>
                            <div className='comment__info'>
                                <div className={`${commentData.user.username} profile__pic`}></div>
                                <div className='profile__info'>
                                    <h3>{commentData?.user?.username}</h3>
                                    <span>{typeof commentData.createdAt === "string" ? commentData.createdAt : timeAgo(commentData.createdAt)}</span>
                                </div>
                            </div>
                        </div>
                        <div className='comment__content__header__actions'>
                            {commentData?.user?.username === currentUser.username ? <div className='active__user__actions'>
                                <button className='primary' onClick={() => setEditMode(true)} >
                                    <img src={EditIcon} alt='Edit' /> Edit
                                </button>
                                <button className='danger' onClick={() => setIsModalVisible(true)} >
                                    <img src={DeleteIcon} alt='Delete' /> Delete
                                </button>
                            </div> :
                                <button className='primary' onClick={() => setReplying(true)}>
                                    <img src={ReplyIcon} alt='Reply' />  Reply
                                </button>
                            }
                        </div>
                    </div>
                    <div className='comment__content'>
                        {!editMode ?
                            showCommentContent() : <AddComment text="Update" addToComment={updateComment} initialContent={commentData.content} />
                        }
                    </div>
                </div>
            </div>
            {
                !!commentData.replies?.length && (
                    <div className='replies'>
                        {commentData.replies.map((reply) => (
                            <Comment key={reply.id} commentData={reply} isReply={true} updateCommentList={updateCommentList} parentComment={commentData} deleteComment={deleteComment} />
                        ))}
                    </div>
                )
            }
            {
                replying &&
                <div className='replies'>
                    <AddComment text="Reply" addToComment={addReply} replyingToUser={commentData.user.username} />
                </div>
            }
            {
                isModalVisible &&
                <DeleteModal
                    setIsModalVisible={setIsModalVisible}
                    handleDeleteComment={handleDeleteComment}
                    data={{ commentData, parentComment }}
                />
            }
        </>
    )
}
