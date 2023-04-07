import './App.css';
import { AddComment } from './components/AddComment/AddComment';
import { Comment } from './components/Comment/Comment';
import { useLocalStorage } from './hooks/useLocalStorage';

function App() {

  const { commentListInfo, updateCommentListInfo, isLoading } = useLocalStorage("nestedCommentData")
  const addComment = (value) => {
    updateCommentListInfo([...commentListInfo.comments, value])
  }

  const updateCommentList = (updatedComment, commentId) => {
    const comments = [...commentListInfo.comments]
    comments.forEach((comment, index) => {
      if (comment.id === commentId) {
        comments[index] = updatedComment
      }
    })
    updateCommentListInfo(comments)
  }

  const deleteComment = (parentId, replyId) => {
    if (parentId) {
      const comments = [...commentListInfo.comments]
      comments.map((comment, index) => {
        if (comment.id === parentId) {
          comments[index].replies = comment.replies.filter((reply) => replyId !== reply.id)
        }
        return comment
      })
      updateCommentListInfo(comments)
    } else {
      updateCommentListInfo(commentListInfo.comments.filter((comment) => comment.id !== replyId))
    }
  }

  return (
    <div className="App">
      {isLoading && <div className='loading__text'><h3>Loading...</h3></div>}
      {
        commentListInfo.comments?.length && <div className={`${isLoading ? "loading" : ""}`}>
          {
            commentListInfo.comments?.map((comment) => (
              <Comment key={comment.id} commentData={comment} updateCommentList={updateCommentList} deleteComment={deleteComment} />
            ))
          }
        </div>
      }
      <AddComment text={"Send"} addToComment={addComment} />
    </div>
  );
}

export default App;
