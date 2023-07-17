const express = require("express")
const {UserModel} = require("../models/user.model")
const bcrypt = require("bcrypt")
const userRouter = express.Router()
require("dotenv").config()
const jwt = require("jsonwebtoken")

userRouter.post("/register",async(req,res)=>{
 // 1) get data from body
    const {email,pass,confirm_pass} = req.body
    try
    {

        let finduser = await UserModel.findOne({email})

        if(finduser)
        {
            res.json({mesg:"User already exist, please login"})
        }

        else
        {

            if (pass != confirm_pass) {
                console.log(pass,confirm_pass)
                return res.status(400).json({ error: 'Passwords and confirm password do not match' });
              }
             else
             {

                bcrypt.hash(pass,5,async(err,hash)=>{
                    if(err)
                    {
                      res.json({err:err.message})
                    }
                    else
                    {
                            const user = new UserModel({email,pass:hash})
                            await user.save()
                            res.json({msg:"user is registered" , user:req.body})   
                     
                    }
              
                 })

             } 

    

    }
          
      } catch (error) {
          res.json({error:error.message})
      }
})

userRouter.post("/login",async(req,res)=>{

    // 1) get email, pass from req.body
    const {email,pass} = req.body

    try {

        let user = await UserModel.findOne({email})

        if(user)
        {
            bcrypt.compare(pass,user.pass,(err,result)=>{
                if(result)
                {
                    let token = jwt.sign({userID:user._id,user:user.email},process.env.secrete)

                    res.json({mesg:"login successfull", token:token})
                }
                else
                {
                    res.json({mesg:"wrong crediantials"})
                }
            })
        }
        else
        {
            res.json({mesg:"user does not exists"})
        }  
        
    } catch (error) {
        
       res.json({error:error.message})
    }

})

module.exports = {
    userRouter
}