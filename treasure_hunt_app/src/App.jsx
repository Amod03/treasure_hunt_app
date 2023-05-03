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
import React, { useState } from 'react';

function App() {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <Router>
      <div className="bg-primary w-full h-full">
        <div className={`${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
            <Navbar onLoginClick={()=>(setShowLogin(!showLogin))} value={showLogin} />
            <Routes>
            <Route path="/" element={<Hero showLogin={showLogin} />}/>
              <Route path="/login" element={<Login/>}/>
            </Routes> 
          </div>
        </div>
      </div>
    </Router>
  )
}

export default App;
