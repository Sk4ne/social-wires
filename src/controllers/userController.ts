import User from '../models/user'
import bcrypt from 'bcryptjs'
import { Request,Response,NextFunction } from 'express' 
import { Types } from 'mongoose';


 export const addUser = async(req:Request,res:Response,next:NextFunction)=>{
   try {
     type returnBody = {
        username: string,
        email: string,
        nameComplete:string,
        password: string
     }
     const body :returnBody = req.body;
     const existEmail = await User.findOne({email:req.body.email});
     if(existEmail){
       return res.status(404).json({
         msg:'email exists'
       })
     }
     const salt = bcrypt.genSaltSync();
     body.password = bcrypt.hashSync(body.password,salt);
     const user = await User.create(body);
     res.status(201).json(user);  
   } catch (err) {
     res.status(500).send({
        message: `An error ocurred ${err}`
     }) 
     next(err);
   }
}
export const getUsers = async(req:Request,res:Response,next:NextFunction)=>{
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
export const getUser = async(req:Request,res:Response,next:NextFunction)=>{
  try {
    type UserID = {
      username: string,
      email: string,
      nameComplete: string,
      password: string,
      createAt: Date,
      state: boolean,
      _id: string | Types.ObjectId  
    }
    let { id } = req.params;
    let userById:UserID | null = await User.findById(id);
    res.status(200).json(userById);  
  } catch (err) {
      res.status(500).send({
      message: `An error ocurred ${err}`
  });
    next();  
  }
} 

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let { id } = req.params;
    let update = req.body;
    let userUpdate = await User.findByIdAndUpdate(id, update, { new: true })
    res.status(200).json({ 
      msg: 'User update',
      userUpdate
    });
  } catch (err) {
    res.status(500).json({
      message: `An error ocurred ${err}`
    })
    next(err);
  }
}

export const deleteUser = async(req:Request,res:Response,next:NextFunction)=>{
  try {
    let { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({
      message: 'User deleted'
    })
  } catch (err) {
    next(err);
  }
}
