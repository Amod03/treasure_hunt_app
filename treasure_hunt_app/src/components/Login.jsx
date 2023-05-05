// import React, {useState} from 'react';
// import '../index.css'
// import axios from 'axios'
// import { useNavigate } from "react-router-dom";
// function Login() {
//     const navigate = useNavigate();
//     const [email, setEmail] = useState("");
//     const [password,setPassword] = useState("");

//     const handleInputChange = (e) => {
//         const {id , value} = e.target;
//         if(id === "email1"){
//             setEmail(value);
//         }
//         if(id === "password1"){
//             setPassword(value);
//         }
//     }

//     const handleSubmit = async () => {
//         try {
//           const response = await axios.post('http://localhost:8080/api/login', {
//             email: email,
//             password: password,
//           });
//           console.log(response.data.user); // Handle the response from the API as needed
//           if(response.data.user)
//           navigate('/quiz');
//         } catch (error) {
//           console.error(error);
//         }
//       };


//     return(
//         <div className="form mt-10">
//             <div className="form-body text-2xl">
//             <h1 className='text-5xl text-gradient mt-2 text-bold'>Sign in to Treasure Hunt</h1>
//                 <div className="flex justify-between">
//                     <label className="font-bold" htmlFor="email">Email :- </label>
//                     <input  type="email" id="email1" className="rounded-lg px-2" value={email} onChange = {(e) => handleInputChange(e)} placeholder="Email"/>
//                 </div>
//                 <div className="flex justify-between">
//                     <label className="font-bold" htmlFor="password">Password :- </label>
//                     <input className="rounded-lg px-2" type="password"  id="password1" value={password} onChange = {(e) => handleInputChange(e)} placeholder="Password"/>
//                 </div>
//             </div>
//             <div className="footer">
//                 <button onClick={()=>handleSubmit()} type="submit" className="text-bold text-4xl border-3">Sign In</button>
//             </div>
//         </div>
       
//     ) ;      
// }

// export default Login;

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
    try {
      const response = await axios.post('http://localhost:8080/api/login', {
        email: email,
        password: password,
      });
      console.log(response.data.user);
      if (response.data.user) {
        const userId = response.data.user._id;
        setUserId(userId);
        console.log(userId);
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
    <div className='form mt-10 relative z-[100]'>
      <div className='form-body text-2xl'>
        <h1 className='text-5xl text-gradient mt-2 text-bold'>Sign in to Treasure Hunt</h1>
        <div className='flex justify-between'>
          <label className='font-bold' htmlFor='email'>
            Email :-{' '}
          </label>
          <input type='email' id='email1' className='rounded-lg px-2' value={email} onChange={(e) => handleInputChange(e)} placeholder='Email' />
        </div>
        <div className='flex justify-between'>
          <label className='font-bold' htmlFor='password'>
            Password :-{' '}
          </label>
          <input className='rounded-lg px-2' type='password' id='password1' value={password} onChange={(e) => handleInputChange(e)} placeholder='Password' />
        </div>
        {errorMessage && <p className='text-red-500'>{errorMessage}</p>}
      </div>
      <div className='footer'>
        <button onClick={() => handleSubmit()} type='submit' className='text-bold text-4xl border-3'>
          Sign In
        </button>
      </div>
    </div>
  );
}

export default Login;
