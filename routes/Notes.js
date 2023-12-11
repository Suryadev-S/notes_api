const express = require("express");
const Note = require("../models/Note");
const router = express.Router(); 
const verify = require("./verify");

//CREATE
router.post("/add/:token",verify,async(req,res)=>{
    try{

        const newNote = new Note({authorId: req.user._id,
            authorName: req.user.username, ...req.body});
        await newNote.save();
        res.status(200).json(newNote);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: "error"});
    } 
})

//READ
router.get("/get-all/:token",verify, async (req,res)=>{
    try{      
        const allNotes = await Note.find({authorId: req.user._id});
        res.status(200).json(allNotes);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: "error"});
    }
})

router.get("/public/get-all",async(req,res)=>{
    try{
        const publicNotes = await Note.find({private: false});
        res.status(200).json(publicNotes);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: "error"});
    }
})

router.get("/get/:id",async(req,res)=>{
    try{
        const {id} = req.params;
        const note = await Note.findById(id);
        res.status(200).json(note);
    }
    catch(err){
        console.log(err)
        res.status(500).json({error: "error"});
    }
})

//UPDATE
router.put("/edit",async(req,res)=>{
    try{
        const {id, ...toEdit} = req.body;
        const editedNote = await Note.findByIdAndUpdate(id,toEdit,{new: true});
        res.status(200).json(editedNote);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: "error"});
    }
})

router.put("/access",async(req,res)=>{
    try{
        const {id,private} = req.body;
        const update = await Note.findByIdAndUpdate(id,{private: !private},{new: true});
        res.status(200).json({msg:"acess changed", note: update});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: "error"});
    }
})

//DELETE
router.delete("/delete/:id",async(req,res)=>{
    try{
        const {id} = req.params;
        const deletedNote = await Note.findByIdAndDelete(id);
        res.status(200).json(deletedNote);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: "error"});
    }
})

module.exports = router;