const mongoose =require('mongoose');

module.exports = mongoose.model('Todo',mongoose.Schema({
    done:{type: Boolean, default: false},
    note:String
}))