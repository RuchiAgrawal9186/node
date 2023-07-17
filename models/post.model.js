// const express = require("express")

const mongoose = require("mongoose")

const postSchema = mongoose.Schema({

firstname:String,
lastname:String,
email:String,
department:String, 
salary:Number,
userID:String,
user:String
 
},{
    versionKey:false
})

const PostModel = mongoose.model("post",postSchema)

module.exports = {
    PostModel
}