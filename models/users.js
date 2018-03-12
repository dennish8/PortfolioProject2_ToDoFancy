const mongoose =require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

let userSchema = mongoose.Schema({
    _id:{
        type: mongoose.Schema.ObjectId,
        default: ()=> {return new mongoose.Types.ObjectId()}
    },
    username:String,
    password:String,
    email:String,
    todolist:[{type: mongoose.Schema.ObjectId, ref:'Todo'}],
});

// userSchema.pre('save',(next)=>{
//     console.log(this);
//     let hashedPassword = bcrypt.hashSync(this.password, saltRounds);
//     this.password = hashedPassword;
//     next();
// });

module.exports = mongoose.model('User',userSchema);