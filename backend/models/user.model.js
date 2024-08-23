const mongoose = require('mongoose')

const userschema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    image:{
        type:String,
        default:''
    },
    searchHistory:{
        type:Array,
        default:[]
    }
},{timestamps:true})

module.exports= mongoose.model('User',userschema)