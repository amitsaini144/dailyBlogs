import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import { Blog } from './pages/Blog'
import { Blogs } from './pages/Blogs'
import { Publish } from './pages/Publish'
import MyBlogs from './pages/Myblogs'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/publish" element={<Publish />} />
          <Route path="/" element={<Navigate to="/signup" />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/myblogs" element={<MyBlogs />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
