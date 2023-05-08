import mongoose from "mongoose";

const Schema=mongoose.Schema;

//registration
const registration_model=new Schema({
    firstName:{type:String,default:""},
    lastName:{type:String,default:""},
    email:{type:String,default:""},
    password:{type:String,default:""},
    score:{type:Number},
    time:{type:Number},
    timePerQuestion: { type: [Number], default: Array(10).fill(0) }, // Array of 10 elements, each storing time taken for each question
    storyReached: { type: String, default: "NO" }
})

const Registration=mongoose.model('registration',registration_model)

export {Registration} ; 