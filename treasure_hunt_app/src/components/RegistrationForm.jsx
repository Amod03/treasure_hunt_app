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
    // const [data,setData] = useState({
    //     firstName:"",
    //     lastName:"",
    //     email:"",
    //     password:"",
    //     confirmPassword:""   
    // });
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
            console.log(response.data);
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
        <div className="form relative z-[100]">
            <div className="form-body text-2xl">
            <h1 className='text-5xl text-gradient my-4 text-bold'>Registration Form</h1>
                <div className="flex justify-between ">
                    <label className=" font-bold mt-3" >First Name :- </label>
                    <input className="rounded-lg" type="text" value={firstName} onChange = {(e) => handleInputChange(e)} id="firstName" placeholder="First Name"/>
                    {errors.firstName && <span className="text-red-500">{errors.firstName}</span>}
                </div>
                <div className="flex justify-between">
                    <label className="font-bold" >Last Name :- </label>
                    <input  type="text" name="" id="lastName" value={lastName}  className="rounded-lg" onChange = {(e) => handleInputChange(e)} placeholder="Last Name"/>
                    {errors.lastName && <span className="text-red-500">{errors.lastName}</span>}
                </div>
                <div className="flex justify-between">
                    <label className=" font-bold" >Email :- </label>
                    <input  type="email" id="email" className=" rounded-lg" value={email} onChange = {(e) => handleInputChange(e)} placeholder="Email"/>
                    {errors.email && <span className="text-red-500">{errors.email}</span>}
                </div>
                <div className="flex justify-between">
                    <label className=" font-bold" >Password :- </label>
                    <input className=" rounded-lg" type="password"  id="password" value={password} onChange = {(e) => handleInputChange(e)} placeholder="Password"/>
                    {errors.password && <span className="text-red-500">{errors.password}</span>}
                </div>
                <div className="flex justify-between">
                    <label className=" font-bold" >Confirm Password:</label>
                    <input className="rounded-lg" type="password" id="confirmPassword" value={confirmPassword} onChange = {(e) => handleInputChange(e)} placeholder="Password"/>
                    {errors.confirmPassword && <span className="text-red-500">{errors.confirmPassword}</span>}
                </div>
            </div>
            <div className="footer">
                <button onClick={()=>handleSubmit()} type="submit" className="text-bold text-4xl border-3">Register</button>
            </div>
        </div>
       
    )       
}

export default RegistrationForm;