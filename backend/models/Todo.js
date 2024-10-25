//Model For Storing Todos Data

const mongoose=require("mongoose");

const todoSchema=new mongoose.Schema({
    title:{
        type:String,
        require:true,
        unique:true,
    },
    desc:{
        type:String,
        require:true,
        unique:true,
    },
    important:{
        type:Boolean,
        default:false,
    },
    complete:{
        type:Boolean,
        default:false,
    },
},{timestamps:true}
);

module.exports=mongoose.model("todo",todoSchema);