const { timeStamp } = require('console');
const { first } = require('lodash');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName :{
        type:String,
        require:true
    },
    lastName:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    profileImagePath:{
        type:String,
        default:""
    },
    tripList:{
        type:Array,
        default:[]
    },
    propertyList:{
        type:Array,
        default:[]
    },
    reaervationList:{
        type:Array,
        default:[]
    },
},{timeStamp:true});

const User = mongoose.model("User",userSchema);
module.exports = User; 