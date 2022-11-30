import User from '../models/user'
import bcrypt from 'bcryptjs'
import { Request,Response,NextFunction } from 'express' 

export default {
 addUser: async(req:Request,res:Response,next:NextFunction)=>{
   try {
     const body= req.body;
     const existEmail = await User.findOne({email:req.body.email});
     if(existEmail){
       return res.status(404).json({
         msg:'email exists'
       })
     }
     const salt = bcrypt.genSaltSync();
     body.password = bcrypt.hashSync(body.password,salt);
     const user = await User.create(body);
     res.status(200).json(user);  
   } catch (err) {
     res.status(500).send({
        message: `An error ocurred ${err}`
     }) 
     next(err);
   }
 },
  getUsers: async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const users = await User.find({})
        res.status(200).json(users);  
      } catch (err) {
        res.status(500).send({
           message: `An error ocurred ${err}`
      });
      next();  
    }
  } 
}