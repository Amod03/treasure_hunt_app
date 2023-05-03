import React, {useState,setState} from 'react';
import '../index.css'
function RegistrationForm() {
    
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");

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

    const handleSubmit  = () => {
        console.log(firstName,lastName,email,password,confirmPassword);
    }

    return(
        <div className="form">
            <div className="form-body text-2xl">
            <h1 className='text-5xl text-gradient my-4 text-bold'>Registration Form</h1>
                <div className="flex justify-between mt-3">
                    <label className=" font-bold" >First Name :- </label>
                    <input className="rounded-lg p-1" type="text" value={firstName} onChange = {(e) => handleInputChange(e)} id="firstName" placeholder="First Name"/>
                </div>
                <div className="flex justify-between">
                    <label className="font-bold" >Last Name :- </label>
                    <input  type="text" name="" id="lastName" value={lastName}  className="rounded-lg p-1" onChange = {(e) => handleInputChange(e)} placeholder="Last Name"/>
                </div>
                <div className="flex justify-between">
                    <label className=" font-bold" >Email :- </label>
                    <input  type="email" id="email" className=" rounded-lg p-1" value={email} onChange = {(e) => handleInputChange(e)} placeholder="Email"/>
                </div>
                <div className="flex justify-between">
                    <label className=" font-bold" >Password :- </label>
                    <input className=" rounded-lg p-1" type="password"  id="password" value={password} onChange = {(e) => handleInputChange(e)} placeholder="Password"/>
                </div>
                <div className="flex justify-between">
                    <label className=" font-bold" >Confirm Password:</label>
                    <input className="rounded-lg p-1" type="password" id="confirmPassword" value={confirmPassword} onChange = {(e) => handleInputChange(e)} placeholder="Password"/>
                </div>
            </div>
            <div className="footer">
                <button onClick={()=>handleSubmit()} type="submit" className="text-bold text-4xl border-3">Register</button>
            </div>
        </div>
       
    )       
}

export default RegistrationForm;