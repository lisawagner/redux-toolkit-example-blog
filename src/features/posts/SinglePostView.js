import { useParams, Link } from 'react-router-dom'
import { useSelector } from "react-redux";
import { selectPostById } from "./postsSlice";

import PostAuthor from "./PostAuthor";
import TimeAgo from './TimeAgo'
import ReactionButtons from "./ReactionButtons";

const SinglePostView = () => {
  // get postId from the URL parameter
  const { postId } = useParams()

  const post = useSelector((state) => selectPostById(state, Number(postId)))

  if (!post) {
    return (
      <section>
        <h2>Post not found.</h2>
      </section>
    )
  }

  return (
    <article>
      <h2>{post.title}</h2>
      <p className='excerpt'>{post.body}</p>
      <p className="postCredit">
        <Link to={`/post/edit/${post.id}`}>Edit</Link>
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <ReactionButtons post={post} />
    </article>
  )
}

export default SinglePostView