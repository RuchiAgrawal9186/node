// const express = require("express")

const mongoose = require("mongoose")

const userSchema = mongoose.Schema({

email: String,
pass : String,
confirm_pass:String
 
},{
    versionKey:false
})

const UserModel = mongoose.model("user",userSchema)

module.exports = {
    UserModel
}