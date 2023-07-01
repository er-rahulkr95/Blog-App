import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import {Routes, Route } from 'react-router-dom';
import NotFound from './pages/NotFound';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import Blog from './pages/Blog';
import Register from './pages/Register';
import UserBlogs from './pages/UserBlogs';
import Login from './pages/Login';

function App() {
  return (
    <>
      <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login/>} />
              <Route path='/register' element={<Register />} />
              <Route path='/post/:id' element={<Blog />} />
              <Route path='*' element={<NotFound/>} />
              <Route path='/user/dashboard/:userId' element={<UserBlogs/>}  />
              <Route path='/post/create' element={<CreatePost/>} />
              <Route path='/post/edit/:id' element={<EditPost/>} />
            
            </Routes>
    </>
  );
}

export default App;
