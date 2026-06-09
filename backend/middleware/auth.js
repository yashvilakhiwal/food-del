import jwt from "jsonwebtoken"

const authMiddleWare = async (req,res,next)=>{
    const {token} = req.headers;
    if (!token) {
        return res.json({success:false,message:"Not authorized Login Again"})
    }
   // try{
     /*   const token_decode=jwt.verify(token,process.env.JWT_SECRET);
        req.body.userId = token_decode.id;
        next();
    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }*/
   try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    console.log("DECODED:", token_decode);   // 👈 ADD THIS
    req.body=req.body||{};
    req.body.userId = token_decode.id;
    next();
} catch (error) {
    console.log("JWT ERROR:", error.message); // 👈 IMPORTANT
    res.json({success:false,message:error.message})
}
}
export default authMiddleWare;