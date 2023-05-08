import React, {useState,useEffect} from 'react';
import '../index.css'
import axios from 'axios';
import Login from './Login';
function RegistrationForm() {
    
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const [isRegistered, setIsRegistered] = useState(false);


    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
      });
      


    const handleInputChange = (e) => {
        const {id , value} = e.target;
        if(id === "firstName"){
            setFirstName(value);
        }
        if(id === "lastName"){
            setLastName(value);
        }
        if(id === "email"){
            setEmail(value);
        }
        if(id === "password"){
            setPassword(value);
        }
        if(id === "confirmPassword"){
            setConfirmPassword(value);
        }

    }

    const validate = () => {
        let isValid = true;
        let errors = {};
      
        if (!firstName) {
          errors.firstName = "Please enter your first name.";
          isValid = false;
        }
      
        if (!lastName) {
          errors.lastName = "Please enter your last name.";
          isValid = false;
        }
      
        if (!email) {
          errors.email = "Please enter your email address.";
          isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
          errors.email = "Please enter a valid email address.";
          isValid = false;
        }
      
        if (!password) {
          errors.password = "Please enter your password.";
          isValid = false;
        } else if (password.length < 6) {
          errors.password = "Password must be at least 6 characters long.";
          isValid = false;
        }
      
        if (!confirmPassword) {
          errors.confirmPassword = "Please confirm your password.";
          isValid = false;
        } else if (password !== confirmPassword) {
          errors.confirmPassword = "Passwords do not match.";
          isValid = false;
        }
      
        setErrors(errors);
      
        return isValid;
      };


    const handleSubmit = async () => {
        if (validate()) {
          const formData = {
            firstName,
            lastName,
            email,
            password,
            confirmPassword
          };
         
          try {
            const response = await axios.post(
              'http://localhost:8080/api/register',
              formData
            );
            setIsRegistered(true);
          } catch (error) {
            console.log(error);
          }
        }
      };
     if (isRegistered) {
        return <Login />;
      }

    return(
        <div className=" sm:max-w-[70%] md:max-w-[65%]  lg:max-w-[60%]  xl:max-w-[40%] mx-auto">
        <div className=" md:mt-5">
          <div className="flex flex-col  justify-center mb-4 ">
            <h2 className="text-2xl  md:text-3xl lg:text-4xl uppercase mt-4">Register Here</h2>
            <input
              type="text"
              value={firstName}
              onChange={(e) => handleInputChange(e)}
              id="firstName"
              placeholder="First Name"
              className=" mt-10 xl:mt-20 text-lg md:text-xl  px-6 py-4 md:px-8  placeholder:text-grey-900 placeholder:italic placeholder:font-extrabold rounded-full bg-slate-300  focus:bg-opacity-50 duration-150  mb-4 md:mb-5 text-gray-800 font-semibold"
            />
            {errors.firstName && <span className="text-white font-semibold text-2xl">{errors.firstName}</span>}
            <input
              type="text"
              name=""
              id="lastName"
              value={lastName}
              onChange={(e) => handleInputChange(e)}
              placeholder="Last Name"
              className=" text-lg md:text-xl  px-6 py-4 md:px-8  placeholder:text-grey-900 placeholder:italic placeholder:font-extrabold rounded-full bg-slate-300  focus:bg-opacity-50 duration-150  mb-4 md:mb-5 text-gray-800 font-semibold"
            />
            {errors.lastName && <span className="text-white font-semibold text-2xl">{errors.lastName}</span>}
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => handleInputChange(e)}
              placeholder="Email"
              className=" text-lg md:text-xl  px-6 py-4 md:px-8   placeholder:text-grey-900 placeholder:italic  placeholder:font-extrabold rounded-full bg-slate-300  focus:bg-opacity-50 duration-150  mb-4 md:mb-5 text-gray-800 font-semibold"
            />
            {errors.email && <span className="text-white font-semibold text-2xl">{errors.email}</span>}
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => handleInputChange(e)}
              placeholder="Password"
              className=" text-lg md:text-xl px-6 py-4 md:px-8   placeholder:text-grey-900 placeholder:italic placeholder:font-extrabold rounded-full bg-slate-300  focus:bg-opacity-50 duration-150  mb-4 md:mb-5  text-gray-800  "
            />
            {errors.password && <span className="text-white font-semibold text-2xl">{errors.password}</span>}
  
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => handleInputChange(e)}
              placeholder="Confirm Password"
              className=" text-lg md:text-xl px-6 py-4 md:px-8   placeholder:text-grey-900 placeholder:italic placeholder:font-extrabold rounded-full bg-slate-300 focus:bg-opacity-50 duration-150  mb-4 md:mb-5  text-gray-800  "
            />
            {errors.confirmPassword && <span className="text-white font-semibold text-2xl">{errors.confirmPassword}</span>}
            <button
              onClick={() => handleSubmit()}
              type="submit"
              className=" bg-pink-400 rounded-full text-lg md:text-xl lg:w-[60%] lg:mx-auto xl:w-[70%] px-6 py-4 md:px-8 lg:py-6 cursor-pointer duration-150 hover:opacity-70"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    )       
}

export default RegistrationForm;