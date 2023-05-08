import { Link } from "react-router-dom"
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar({ onLoginClick, value }) {
  const [toggle,setToggle] = useState(true);
  const [showAdminLogin, setShowAdminLogin] = useState(true);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate=useNavigate();
  const handleAdminLogin = () => {
    setShowAdminPanel(true);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleAdminSubmit =async () => {
    // Replace this with your own password validation logic
    const id='64565ce9f71ceee9d0df10a2';
    const adminPassword = "ADMIN123";
    console.log(password);
    if (password === adminPassword) {
      setErrorMessage("");
      setShowAdminLogin(false);
      setIsAdminLoggedIn(true); // set isAdminLoggedIn to true
      setShowAdminPanel(false);
      window.location.href = `${id}/admin`;
    } else {
      setErrorMessage("Incorrect password. Please try again.");
    }
  };

  const handleBackToMain = () => {
    setShowAdminPanel(false);
  };
  
  return (
    <div className="fixed inset-x-0 top-0 z-0 bg-transparent
    px-4 py-2 text-zinc-400 mx-auto flex items-center justify-center">
      <Link to="/" className="md:text-4xl text-2xl font-bolder px-10 p-2">
        Treasure Quest
      </Link> 

      {toggle && <div className="ml-auto flex gap-5 text-3xl font-primary">
        <button className="md:text-4xl text-2xl" onClick={onLoginClick}>{!value ? "Login" : "Register"}</button>
        {showAdminLogin && !isAdminLoggedIn && ( // render the admin login button only if showAdminLogin is true and isAdminLoggedIn is false
          <button className="md:text-4xl text-2xl" onClick={handleAdminLogin}>Admin</button>
        )}
      </div>
}
      {showAdminPanel && (
        <div className="fixed inset-0 flex items-center justify-center ">
          <div className="outerdiv border border-red-500 fixed inset-0">
          <div className="flex flex-col items-center justify-center pt-10">
            <div className="border border-white h-[400px] md:w-[50%] w-[70%] flex flex-col items-center justify-center mt-5">
              <h2 className="text-3xl text-white md:text-4xl font-bold mb-2">Admin Login</h2>
              
              <label htmlFor="password" className="text-2xl text-white md:text-3xl block mb-2 font-semibold">
                Password:
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                className="border text-black outline-none rounded-full w-[65%] md:w-[50%] md:px-8 px-3 py-2 mb-4"
              />
              <div className="flex flex-col xs:flex-row w-[65%] md:w-[50%] xs:justify-evenly items-center">
              <button
                onClick={handleAdminSubmit}
                type="submit"
                className=" hover:bg-gray-100 hover:text-slate-800 font-semibold border border-white duration-500 rounded-lg py-3 px-8"
              >
                Login
              </button>
              <button
                onClick={() => setShowAdminPanel(false)}
                className=" hover:bg-gray-100 hover:text-slate-800 font-semibold border border-white duration-500  mt-4 xs:mt-0 rounded-lg py-3 px-8 "
              >
                Back
              </button>
            </div>
            {errorMessage && (
                <div className="text-black text-lg mt-3 w-[50%] text-center xs:w-[200px]">{errorMessage}</div>
              )}
            </div>
          </div>
        </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
