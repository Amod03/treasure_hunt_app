import mongoose from "mongoose";

const Schema=mongoose.Schema;

//registration
const registration_model=new Schema({
    firstName:{type:String,default:""},
    lastName:{type:String,default:""},
    email:{type:String,default:""},
    password:{type:String,default:""},
    score:{type:Number},
    time:{type:Number}
})

const Registration=mongoose.model('registration',registration_model)

export {Registration} ; 