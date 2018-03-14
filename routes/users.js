const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/users');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../configuration');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const checkAuthentication = require('../helpers/middleware/checkAuthentication');
//SIGNUP
router.post('/signup',(req,res,next)=>{
    const {username,password,email} = req.body;
    User.find({email})
    .then((found)=> {
        if(found[0]===undefined){
            let new_user = new User({username,password,email});
            new_user.save()
            .then((user)=>res.status(200).json({new_user,message:`New user added`}))
            .catch((err)=>res.status(500).json({message:`Create error: ${err}`}));
        } else {
            res.status(409).json({message:`Create error`});
        }
    })
});
//SIGNIN
router.post('/signin',(req,res,next)=>{
    const {username,password,email} = req.body;
    User.find({email})
    .then((found)=>{
        if(found[0]!== undefined){
            let check = bcrypt.compareSync(password, found[0].password);
            let token =jwt.sign({email,_id: found[0]._id},JWT_SECRET,{expiresIn:'1h'})
            res.status(200).json({message:`Sign in successful`,token})
        } else {
            console.log(found);
            res.status(500).json({message:`Sign in error`});
        }
    })
})
//READ
router.get('/',(req,res,next)=>{
    User.find()
    .then((users)=>res.status(200).json({users,message:`User list`}))
    .catch((err)=>res.status(500).json({message:`Read error: ${err}`}));
});
//UPDATE
router.post('/:id',checkAuthentication,(req,res,next)=>{
    let query = {_id:req.params.id};
    const {username,password,email} =req.body;
    User.findOneAndUpdate(query,{username,password,email})
    .then((user)=>res.status(200).json({user,message:`User updated`}))
    .catch((err)=>res.status(200).json({message:`Update error ${err}`}));
});
//DELETE
router.delete('/:id',checkAuthentication,(req,res,next)=>{
    let query = {_id:req.params.id};
    User.remove(query)
    .then((user)=>res.status(200).json(user))
    .catch((err)=>res.status(500).json({message:`Delete error ${err}`}))
})

module.exports = router;