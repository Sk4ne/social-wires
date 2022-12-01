import { validationResult } from "express-validator";
import { Request,Response,NextFunction } from "express";

export const validationExpress = async(req:Request,res:Response,next:NextFunction)=>{
  const errors = validationResult(req);
  if(!errors){
    return res.status(400).json(errors);
  }
  next();
}