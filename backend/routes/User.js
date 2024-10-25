const router =require("express").Router();
const user=require("../models/User");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const { authenticateToken } = require("./auth");
//Sign-in
router.post("/sign-in", async(req,res)=>{
   try {
   const {username}=req.body;
   const {email}=req.body;
   const existinguser= await user.findOne({username:username});
   const existingemail= await user.findOne({email:email});
   if(existinguser){
    return res.status(400).json({message:"username already exist"
    });
   }
   else if(username.length<4){
    return res.status(400).json({message:"username should have atleast 4 character "
});
   }
   if(existingemail){
    return res.status(400).json({message:"Email already exist"
    });
   }
const hashPass=await bcrypt.hash(req.body.password,10);
   const newUser= new user({
    username:req.body.username,
    email:req.body.email,
    password:hashPass,

   });
   await newUser.save();
   return res.status(200).json({message:"Sign In Successfully"});
   } catch (error) {
    console.log(error);
    res.status(400).json({message:"Internal server error"});
   }
});

//Log In
router.post("/log-in",async(req,res)=>{
    const {username,password}=req.body;
    const existinguser= await user.findOne({username:username});
    if(!existinguser){
        return res.status(400).json({message:"Invalid Credentials find"
        });
       }
  bcrypt.compare(password,existinguser.password,(err,data)=>{
    
    if(data){
       const authClaims=[{name:username},{jti:jwt.sign({},"tcmTm")}];
        const token=jwt.sign({authClaims},"tcmTm",{expiresIn:"2d"});
     
       return res.status(200).json({id:existinguser._id,token:token});
    }else{
        return res.status(400).json({message:"Invalid Credentials"});
    }
  });
});

module.exports=router;