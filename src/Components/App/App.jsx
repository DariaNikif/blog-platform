import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../Header/Header';
import ArticleList from '../ArticleList/ArticleList';
import SignIn from '../../Pages/SignIn/SignIn';
import SignUp from '../../Pages/SignUp/SignUp';
import EditProfile from '../../Pages/EditProfile/EditProfile';
import CreateArticle from '../../Pages/CreateArticle/CreateArticle';
import FullArticle from '../../Pages/FullArticle/FullArticle';
import EditArticle from '../../Pages/EditArticle/EditArticle';
import ProtectedRoute from '../../Utils/utilsProtectedRoute';
import CursorEffect from '../../AdditionaStyling/CursorEffect/CursorEffect';
import RyanGosling from '../../AdditionaStyling/RyanGosling/RyanGosling';

import './App.scss';

export default function App() {
  return (
    <Router>
      <div className='App'>
        <Header />
        <Routes>
          <Route path='/' element={<ArticleList />} />
          <Route index element={<ArticleList />} />
          <Route path='articles' element={<ArticleList />} />
          <Route path='articles/:slug' element={<FullArticle />} />
          <Route path='sign-in' element={<SignIn />} />
          <Route path='sign-up' element={<SignUp />} />
          <Route path='profile' element={<ProtectedRoute element={<EditProfile />} />} />
          <Route path='new-article' element={<ProtectedRoute element={<CreateArticle />} />} />
          <Route
            path='articles/:slug/edit'
            element={<ProtectedRoute element={<EditArticle />} />}
          />
          <Route path='*' element={<h2>Not found</h2>} />
        </Routes>
        <CursorEffect />
        <RyanGosling />
      </div>
    </Router>
  );
}
