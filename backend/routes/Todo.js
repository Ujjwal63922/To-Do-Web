const router =require("express").Router();
const Todo=require("../models/Todo");
const user=require("../models/User");
const { authenticateToken } = require("./auth");

//Create todo
router.post("/create-todo",authenticateToken,async(req,res)=>{
    try {
        const {title,desc}=req.body;
        const {id}=req.headers;
        //console.log(id);
        const newTodo=new Todo({title:title,desc:desc});
        const saveTodo=await newTodo.save();
        const todoId=saveTodo._id;
        await user.findByIdAndUpdate(id,{$push:{todos:todoId._id}});
        res.status(200).json({message:"Todo Created"});
    } catch (error) {
        console.log(error);
        res.status(400).json({message:"Internal server error"});
    }
});
//Get ALL-TODOS
router.get("/get-all-todo",authenticateToken,async(req,res)=>{
    try {
        const {id}=req.headers;
        const userData=await user.findById(id).populate({path:"todos",options:{sort:{createdAt:-1}}});
        res.status(200).json({data:userData});
    } catch (error) {
        console.log(error);
        res.status(400).json({message:"Internal server error"});
    }
});
//Delete TODOS
router.delete("/delete-todo/:id",authenticateToken,async(req,res)=>{
    try {
        const {id}=req.params;
        const userId=req.headers.id;
        await Todo.findByIdAndDelete(id);
        await user.findByIdAndUpdate(userId,{$pull:{todos:id}});
        res.status(200).json({message:"Task Deleted"});
    } catch (error) {
        console.log(error);
        res.status(400).json({message:"Internal server error"});
    }
});
//Update Todo
router.put("/update-todo/:id",authenticateToken,async(req,res)=>{
    try {
        const {id}=req.params;
        const {title,desc}=req.body;
        await Todo.findByIdAndUpdate(id,{title:title,desc:desc});
        res.status(200).json({message:"Task Updated"});
    } catch (error) {
        console.log(error);
        res.status(400).json({message:"Internal server error"});
    }
});
//Update-Important Todo
router.put("/update-imp-todo/:id",authenticateToken,async(req,res)=>{
    try {
        const {id}=req.params;
        const TodoData=await Todo.findById(id);
        const ImpTodo=TodoData.important;
        await Todo.findByIdAndUpdate(id,{important:!ImpTodo});
        res.status(200).json({message:"Task Updated"});
    } catch (error) {
        console.log(error);
        res.status(400).json({message:"Internal server error"});
    }
});

//Update-Complete-todo
router.put("/update-complete-todo/:id",authenticateToken,async(req,res)=>{
    try {
        const {id}=req.params;
        const TodoData=await Todo.findById(id);
        const CompleteTodo=TodoData.complete;
        await Todo.findByIdAndUpdate(id,{complete:!CompleteTodo});
        res.status(200).json({message:"Task Updated"});
    } catch (error) {
        console.log(error);
        res.status(400).json({message:"Internal server error"});
    }
});

//Get important todos
router.get("/get-imp-todo",authenticateToken,async(req,res)=>{
    try {
        const {id}=req.headers;
        const Data=await user.findById(id).populate({path:"todos",
            match:{important:true},
            options:{sort:{createdAt:-1}}});
            const ImpTodoData=Data.todos;
        res.status(200).json({data:ImpTodoData});
    } catch (error) {
        console.log(error);
        res.status(400).json({message:"Internal server error"});
    }
});

//Get Completed Todos
router.get("/get-complete-todo",authenticateToken,async(req,res)=>{
    try {
        const {id}=req.headers;
        const Data=await user.findById(id).populate({path:"todos",
            match:{complete:true},
            options:{sort:{createdAt:-1}}});
            const CompleteTodoData=Data.todos;
        res.status(200).json({data:CompleteTodoData});
    } catch (error) {
        console.log(error);
        res.status(400).json({message:"Internal server error"});
    }
});

//Get InCompleted Todos
router.get("/get-incomplete-todo",authenticateToken,async(req,res)=>{
    try {
        const {id}=req.headers;
        const Data=await user.findById(id).populate({path:"todos",
            match:{complete:false},
            options:{sort:{createdAt:-1}}});
            const CompleteTodoData=Data.todos;
        res.status(200).json({data:CompleteTodoData});
    } catch (error) {
        console.log(error);
        res.status(400).json({message:"Internal server error"});
    }
});

module.exports=router;