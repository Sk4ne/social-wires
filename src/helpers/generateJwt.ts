import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
import { Types } from 'mongoose'

export const generateJwt = ( id : string | Types.ObjectId = '') =>{
  return new Promise((resolve,reject)=>{
    const payload = { id };
    jwt.sign(payload,process.env.SECRET_OR_PRIVATE_KEY as string,{
       expiresIn:'10d'
    },(err,token)=>{
      if(err){
        reject("I can't generate the token")
      }else{
        resolve(token)
      }
    })
  })
}
