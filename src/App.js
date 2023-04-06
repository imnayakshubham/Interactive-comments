import './App.css';
import { useState } from 'react';
import commentsInfo from "./data/data.json"
import { AddComment } from './components/AddComment/AddComment';
import { Comment } from './components/Comment/Comment';

function App() {
  const [commentsList, setCommentsList] = useState(commentsInfo.comments)

  const addComment = (value) => {
    setCommentsList((prev) => [...prev, value])
  }

  const updateCommentList = (updatedComment, commentId) => {
    const comments = [...commentsList]
    comments.forEach((comment, index) => {
      if (comment.id === commentId) {
        comments[index] = updatedComment
      }
    })
    setCommentsList(comments)
  }

  const deleteComment = (parentId, replyId) => {
    if (parentId) {
      setCommentsList((prev) => {
        const comments = [...prev]
        comments.map((comment, index) => {
          if (comment.id === parentId) {
            comments[index].replies = comment.replies.filter((reply) => replyId !== reply.id)
          }
          return comment
        })
        return comments
      })

    } else {
      setCommentsList((prev) => prev.filter((comment) => comment.id !== replyId))
    }


  }

  return (
    <div className="App">
      {commentsList?.map((comment) => (
        <Comment key={comment.id} commentData={comment} updateCommentList={updateCommentList} deleteComment={deleteComment} />
      ))}

      <AddComment text={"Send"} addToComment={addComment} />
    </div>
  );
}

export default App;
