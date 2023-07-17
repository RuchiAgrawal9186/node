const express= require("express")
const {userRouter} = require("./routes/user.routes")
const {connection} = require("./db")
const app=express()
require("dotenv").config()
const cors = require("cors")
const { postRouter } = require("./routes/post.routes")
const { logoutModel } = require("./models/logout.model")

app.use(express.json())
app.use(cors())

app.get('/logout', async(req, res)=>{
  const token = req.headers.authorization?.split(" ")[1];
  if(token){
    try{
      const user = logoutModel({token})
      await user.save()
      if(user){
        res.send({msg:"User has been logged out"})
      }
    }catch(error){
      res.status(400).json({err:err.message})
    }
  }
})

app.use("/users",userRouter)
app.use("/posts",postRouter)



app.listen(process.env.port, async ()=>{
  try {

    await connection
    console.log("connected to db")
    console.log(`server is running in ${process.env.port} server`)
    
  } catch (err) {
    console.log(err)
    console.log("something went wrong")
  }
})


