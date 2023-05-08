import React, { useState,useContext } from 'react';
import '../index.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserContext from '../UserContext';


function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { setUserId } = useContext(UserContext);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === 'email1') {
      setEmail(value);
    }
    if (id === 'password1') {
      setPassword(value);
    }
  };

const handleSubmit = async () => {
  console.log("in");
  if(email==="" || password===""){
  alert("Please enter the details..")
  return ;
  }
  try {
    const response = await axios.post('http://localhost:8080/api/login', {
      email: email,
      password: password,
    });
    console.log(response.data.user);
    if (response.data.user) {
      const userId = response.data.user._id;
      setUserId(userId);
      if(userId)
        {
        console.log(userId)
        localStorage.setItem('user_id',JSON.stringify({userId})); 
        }
      navigate(`/${userId}/quiz`);
  }
  } catch (error) {
    console.error(error);
    if (error.response.status === 401) {
      setErrorMessage('Invalid email or password');
    }
  }
};



  return (
    <div className=" md:max-w-[70%]  lg:max-w-[60%]  xl:max-w-[40%] mx-auto">
			<div className=" md:mt-5  mt-32">
				<div className="flex flex-col  justify-center mb-4 ">
					<h2 className="text-2xl md:text-4xl lg:text-5xl mt-10 uppercase mb-8">Sign in to Treasure Hunt</h2>
					<input
						type="email"
						id="email1"
						value={email}
						placeholder="sask@titan.com"
						onChange={(e) => handleInputChange(e)}
						className=" text-lg md:text-xl  px-6 py-4 md:px-10  lg:py-6 placeholder:text-grey-900 placeholder:italic lg:mt-12 placeholder:font-extrabold rounded-full bg-slate-200 focus:bg-opacity-50 duration-150  mb-4 md:mb-5 text-gray-800 font-semibold"
					/>
					<input
						type="password"
						placeholder="Password"
						id="password1"
						value={password}
						onChange={(e) => handleInputChange(e)}
						className=" text-lg md:text-xl px-6 py-4 md:px-10  lg:py-5 placeholder:text-grey-900 placeholder:italic placeholder:font-extrabold rounded-full bg-slate-200 focus:bg-opacity-50 duration-150  mb-4 md:mb-5  text-gray-800"
					/>
                   
					<button
						onClick={() => handleSubmit()}
						type="submit"
						className=" bg-pink-400 rounded-full text-lg md:text-2xl px-6 py-4 md:px-10 lg:px-12 lg:py-6 cursor-pointer duration-150 hover:opacity-70"
					>
						Sign In
					</button>
          {errorMessage && <p className='text-black text-lg mt-3 font-semibold'>{errorMessage}</p>}
				</div>
			</div>
		</div>
  );
}

export default Login;
