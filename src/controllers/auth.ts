import User from "../models/user";
import bcrypt from 'bcryptjs';
import { generateJwt} from '../helpers/generateJwt';
import { Request,Response,NextFunction } from "express"; 

export const login = async (req:Request,res:Response,next:NextFunction)=>{
  try {
    type returnBody = {
      email:string,
      password:string
    }
    const {email,password } : returnBody = req.body
    const user = await User.findOne({ email });
    // return console.log(user);
    if(!user){
      return res.status(404).json({
        msg:'Email or password are incorrect'
      });
    }

    /* Verificamos que las contrasenas coincidan */
    let validPass:boolean = bcrypt.compareSync(password,user.password);
    if(!validPass){
      return res.status(400).json({
        msg:'Password incorrect'
      })
    }

    /** Generamos JsonWebToken */
    const token = await generateJwt(user.id);
    res.json({
      user,
      token 
    })
  } catch (err) {
    res.status(500).json({
      // msg: 'Speak with the admin' 
      err 
   })
  }
}