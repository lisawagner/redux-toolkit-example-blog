import { Routes, Route } from 'react-router-dom'
// features
import PostsList from "./features/posts/PostsList";
import AddPostForm from "./features/posts/AddPostForm";
import SinglePostView from './features/posts/SinglePostView'
import EditPostForm from './features/posts/EditPostForm';
// components
import Layout from './components/Layout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* PostList component acting as homepage here */}
        <Route index element={<PostsList />} />
        <Route path="post">
          <Route index element={<AddPostForm />}/>
          <Route path=":postId" element={<SinglePostView />} />
          <Route path="edit/:postId" element={<EditPostForm />} />
        </Route>

      </Route>
    </Routes>
  );
}

export default App;
