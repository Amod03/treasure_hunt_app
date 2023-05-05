// import styles from "./style";
// import { Route, Routes } from 'react-router-dom';
// import Navbar from './components/Navbar'
// import Hero from './components/Hero'
// import Login from "./components/Login";

// function App() {

//   return (
//     <div className="bg-primary w-full overflow-hidden">
//     <div className={`${styles.paddingX} ${styles.flexCenter}`}>
//       <div className={`${styles.boxWidth}`}>
//         <Navbar />
//         <Hero/>
//          <Routes>
//             <Route path="/Login" element={<Login/>}/>
//             </Routes> 
//       </div>
//     </div>
//     </div>
//   )
// }

// export default App
import styles from "./style";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Login from "./components/Login";
import React, { useState} from 'react';
import Quiz from "./components/Quiz";
import UserContext from './UserContext';
import Leaderboard from "./components/Leaderboard";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [userId, setUserId] = useState(null);
  return (
    <UserContext.Provider value={{ userId, setUserId }}>
    <Router>
      <div className="bg-primary w-full h-full">
        <div className={`${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
            <Navbar onLoginClick={()=>(setShowLogin(!showLogin))} value={showLogin} />
            <Routes>
            <Route path="/" element={<Hero showLogin={showLogin} />}/>
              <Route path="/login" element={<Login/>}/>
              <Route path={`/:${userId}/quiz`} element={<Quiz/>}/>
              <Route path="/leaderboard" element={<Leaderboard/>}/>
            </Routes> 
          </div>
        </div>
      </div>
    </Router>
    </UserContext.Provider>
  )
}

export default App;
