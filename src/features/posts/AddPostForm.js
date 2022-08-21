import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// replace initial addPost with addNewPost async thunk
// import { addPost } from './postsSlice'
import { addNewPost } from './postsSlice'
import { selectAllUsers } from '../users/usersSlice'

const AddPostForm = () => {
  // These states are just for this component
  // No need to put them in a global store for use in other areas
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [userId, setUserId] = useState('')
  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const users = useSelector(selectAllUsers)

  const onTitleChange = (e) => setTitle(e.target.value)
  const onContentChange = (e) => setContent(e.target.value)
  const onAuthChange = (e) => setUserId(e.target.value)

  const canSave = [title, content, userId].every(Boolean) && addRequestStatus === 'idle'

  const onSavePostClick = () => {
    if(canSave) {
      try {
        setAddRequestStatus('pending')
        // pass in title, body, userId to addNewPost async thunk
        dispatch(addNewPost({ title, body: content, userId })).unwrap()

        // reset inputs
        setTitle('')
        setContent('')
        setUserId('')
        navigate('/')
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

  return (
    <section className='add-post-section'>
      <h2>Add a New Post</h2>
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
          Submit
        </button>

      </form>

    </section>
  )
}

export default AddPostForm