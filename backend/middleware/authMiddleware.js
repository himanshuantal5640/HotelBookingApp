import User from "../models/User.js";

//Middleware to check if user is authenticated

export const protect = async (req,res,next)=>{
    // next function is executed before excuting the controller function,this will check user is authenticated or not ,if authenticated it will execute controller function otherwise not
    const {userId} = req.auth;
    if(!userId){
        res.json({success: false, message: "User not authenticated"});
    }
    else{
        const user = await User.findById(userId);
        req.user = user;
        next()
    }
}