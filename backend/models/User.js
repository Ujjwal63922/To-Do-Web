//Model for storing User Data
const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        require:true,
        unique:true,
    },
    email:{
        type:String,
        require:true,
        unique:true,
    },
    password:{
        type:String,
        require:true,
        unique:true,
    },
    todos:[{
        type:mongoose.Types.ObjectId,
        ref:"todo",
    },
    ],
});

module.exports=mongoose.model("user",userSchema);