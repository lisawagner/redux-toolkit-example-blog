import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useNavigate } from 'react-router-dom'
// slices
import { selectPostById, updatePost, deletePost } from "./postsSlice"
import { selectAllUsers } from "../users/usersSlice"

const EditPostForm = () => {
  const { postId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const post = useSelector((state) => selectPostById(state, Number(postId)))
  const users = useSelector(selectAllUsers)

  const [title, setTitle] = useState(post?.title)
  const [content, setContent] = useState(post?.body)
  const [userId, setUserId] = useState(post?.userId)
  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  if (!post) {
    return (
      <section>
        <h2>Post not found.</h2>
      </section>
    )
  } 
  
  // TODO: refactor shared form elements into reusable component
  const onTitleChange = (e) => setTitle(e.target.value)
  const onContentChange = (e) => setContent(e.target.value)
  const onAuthChange = (e) => setUserId(e.target.value)

  const canSave = [title, content, userId].every(Boolean) && addRequestStatus === 'idle'

  const onSavePostClick = () => {
    // NOTE: this code differs from AddPostForm
    if(canSave) {
      try {
        setAddRequestStatus('pending')
        // updatePost dispatch instead of addNewPost
        dispatch(updatePost({ id: post.id, title, body: content, userId, reactions: post.reactions })).unwrap()

        // reset inputs
        setTitle('')
        setContent('')
        setUserId('')
        // re-route user after post edited
        navigate(`/post/${postId}`)
      } catch (error) {
        console.log('Failed to save the post', error);
      } finally {
        setAddRequestStatus('idle')
      }
    }
  }

  const userOptions = users.map(user => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ))

  const onDeletePostClicked = () => {
    try {
      setAddRequestStatus('pending')
      dispatch(deletePost({ id: post.id })).unwrap()

      setTitle('')
      setContent('')
      setUserId('')
      navigate('/')
    } catch (err) {
      console.log('Failed to delete the post', err)
    } finally {
      setAddRequestStatus('idle')
    }
}

  return (
    <section className='add-post-section'>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChange}
        />
        <label htmlFor="postAuthor">Author:</label>
          <select
            id='postAuthor'
            // defaultValue={userId}
            value={userId}
            onChange={onAuthChange}
          >
            <option value=""></option>
            {userOptions}
          </select>
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChange}
        />
        <button
          type='button'
          onClick={onSavePostClick}
          className='btn'
          disabled={!canSave}
        >
          Update Post
        </button>
        <button
          type='button'
          onClick={onDeletePostClicked}
          className='btn'
        >
          Delete
        </button>

      </form>

    </section>
  )
}
export default EditPostForm