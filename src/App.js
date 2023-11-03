import React from 'react'
import { Navigate, BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import FeedPage from './components/FeedPage';
import PostPage from "./components/PostPage";
import ProfilePage from "./components/ProfilePage";

// Azat Aldeshov WEB Dev MSc 2023 Midterm

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/feed' element={<FeedPage />} />
        <Route path='/feed/:id' element={<PostPage />} />
        <Route path='/profile' element={<ProfilePage />} />

        <Route exact path="/*" element={<Navigate to="/feed" />} />
      </Routes>
    </Router>
  )
}
export default App;
