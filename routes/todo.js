const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Todo = require('../models/todo');
const User = require('../models/users');

//CREATE
router.post('/',(req,res,next)=>{
    const {note} = req.body;
    let new_note = new Todo({note});
    new_note.save()
    .then((note)=>{
        User.findById(req.body.id)
        .then((user)=>{
            user.todolist.push(note._id)
            user.save()
            res.status(200).json({new_note,message:`New note added`})
        })
    })
    .catch((err)=>res.status(500).json({message:`Create error: ${err}`}));
});
//READ
router.get('/',(req,res,next)=>{
    Todo.find()
    .then((notes)=>res.status(200).json({notes,message:`Note list`}))
    .catch((err)=>res.status(500).json({message:`Read error: ${err}`}));
});
//UPDATE
router.post('/:id',(req,res,next)=>{
    let query = {_id:req.params.id};
    const {note} =req.body;
    Todo.findOneAndUpdate(query,{note})
    .then((note)=>res.status(200).json({note,message:`Note updated`}))
    .catch((err)=>res.status(200).json({message:`Update error ${err}`}));
});
//DELETE
router.delete('/:id',(req,res,next)=>{
    let query = {_id:req.params.id};
    Todo.remove(query)
    .then((note)=>res.status(200).json(note))
    .catch((err)=>res.status(500).json({message:`Delete error ${err}`}))
})

module.exports = router;