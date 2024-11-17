const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
        minlength:3,
        maxlength:20
    },
    email:{
        type:String,
        required:true,
        unique:true,
        match:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    password:{
      type:String,
      required:true,
      minlength:8,
    },
    authToken:{
        type:String,
        required:false
    }
})

const User = mongoose.model('User', userSchema);
module.exports = User;