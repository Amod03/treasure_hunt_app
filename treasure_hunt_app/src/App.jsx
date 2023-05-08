
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Login from "./components/Login";
import React, { useState,useEffect} from 'react';
import Quiz from "./components/Quiz";
import UserContext from './UserContext';
import Leaderboard from "./components/Leaderboard";
import Story from "./components/Story";
import Admin from "./components/Admin";


function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [userId, setUserId] = useState(null);
  const [scroll, setScroll] = useState(true);

  const id='64565ce9f71ceee9d0df10a2';

useEffect(() => {
  const handleScroll = () => {
    if (window.scrollY > 50) {
      setScroll(false);
    } else {
      setScroll(true);
    }
  };

  window.addEventListener('scroll', handleScroll);

  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}, []);

return (
  <UserContext.Provider value={{ userId, setUserId }}>
    <Router>
      <div>
        <div>
          {scroll && (
            <div>
              <Navbar onLoginClick={() => setShowLogin(!showLogin)} value={showLogin} />
            </div>
          )}
          <Routes>
            <Route path="/" element={<Hero showLogin={showLogin} />} />
            <Route path={`/:${userId}/quiz`} element={<Quiz />} />
            <Route path={`/:${userId}/story`} element={<Story />} />
            <Route path={`${id}/admin`} element={<Admin />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  </UserContext.Provider>
);
 }

export default App;