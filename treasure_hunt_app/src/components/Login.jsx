import React, {useState,setState} from 'react';
import '../index.css'
function Login() {
    
    const [email, setEmail] = useState("");
    const [password,setPassword] = useState("");

    const handleInputChange = (e) => {
        const {id , value} = e.target;
        if(id === "email1"){
            setEmail(value);
        }
        if(id === "password1"){
            setPassword(value);
        }
    }

    const handleSubmit  = () => {
        console.log(email,password);
    }

    return(
        <div className="form mt-10">
            <div className="form-body my-4 text-2xl">
            <h1 className='text-5xl text-gradient mb-4 text-bold'>Sign in to Treasure Hunt</h1>
                <div className="flex justify-between">
                    <label className="font-bold" htmlFor="email">Email :- </label>
                    <input  type="email" id="email1" className="rounded-lg px-2" value={email} onChange = {(e) => handleInputChange(e)} placeholder="Email"/>
                </div>
                <div className="flex justify-between">
                    <label className="font-bold" htmlFor="password">Password :- </label>
                    <input className="rounded-lg px-2" type="password"  id="password1" value={password} onChange = {(e) => handleInputChange(e)} placeholder="Password"/>
                </div>
            </div>
            <div className="footer">
                <button onClick={()=>handleSubmit()} type="submit" className="text-bold text-4xl border-3">Sign In</button>
            </div>
        </div>
       
    ) ;      
}

export default Login;