const express = require("express")
const postRouter = express.Router()
const {PostModel} = require("../models/post.model")
const {auth} = require("../middleware/auth.middleware")


postRouter.use(auth)

postRouter.post("/add",async(req,res)=>{

    try {

        const post = new PostModel(req.body)
        await post.save()
        res.json({mesg:"new employee has been added",post:req.body})     
    } catch (error) {
        res.json({error:error.message})
    }

})


postRouter.get("/",async(req,res)=>{

    try {

        const post = await PostModel.find({userID:req.body.userID})
        res.json(post)     

    } catch (error) {
        res.json({error:error.message})
    }

   

})
postRouter.patch("/update/:postID",async(req,res)=>{

    const {postID} = req.params
    const useridinUSERDOC=req.body.userID
    // const {...updatedData} = req.body

    try {
        const post = await PostModel.findOne({_id:postID})
        const useridinPOSTDOC = post.userID

        console.log(useridinUSERDOC,useridinPOSTDOC)
        if(useridinUSERDOC == useridinPOSTDOC)
        {
            await PostModel.findByIdAndUpdate({_id:postID},req.body)
            res.json({mesg:`${post.FirstName}'s details has been updated`})
        }
        else
        {
            res.json({mesg:"user is not Authorized"})
        }
        
    } catch (error) {
        res.json({error:error.message})
    }

})
postRouter.delete("/delete/:postID",async(req,res)=>{

    const {postID} = req.params
    const useridinUSERDOC=req.body.userID

    try {
        const post = await PostModel.findOne({_id:postID})
        const useridinPOSTDOC = post.userID

        console.log(useridinUSERDOC,useridinPOSTDOC)
        if(useridinUSERDOC == useridinPOSTDOC)
        {
            await PostModel.findByIdAndDelete({_id:postID},req.body)
            res.json({mesg:`${post.FirstName}'s details has been deleted`})
        }
        else
        {
            res.json({mesg:"user is not Authorized"})
        }
        
    } catch (error) {
        res.json({error:error})
    }

})

module.exports={
    postRouter
}
