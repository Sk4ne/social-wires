import Post from '../models/post';
import { Request,Response,NextFunction } from 'express' 
import { Types } from 'mongoose';


 export const addPost = async(req:Request,res:Response,next:NextFunction)=>{
   try {
     type returnBody = {
        title: string,
        description: string,
        createAt:string,
        idUser: string
     }
     const body :returnBody = req.body;
     const post = await Post.create(body);
     res.status(201).json(post);  
   } catch (err) {
     res.status(500).send({
        message: `An error ocurred ${err}`
     }) 
     next(err);
   }
}
export const getPosts = async(req:Request,res:Response,next:NextFunction)=>{
  try {
     
      const posts = await Post.find({})
      res.status(200).json(posts);  
  } catch (err) {
      res.status(500).send({
          message: `An error ocurred ${err}`
    });
    next();  
  }
} 
export const getPost = async(req:Request,res:Response,next:NextFunction)=>{
  try {
    type PostID = {
      title: string,
      description: string,
      createAt: Date,
      idUser: String | Types.ObjectId,
      _id: string | Types.ObjectId  
    }
    let { id } = req.params;
    let postById:PostID | null = await Post.findById(id);
    res.status(200).json(postById);  
  } catch (err) {
      res.status(500).send({
      message: `An error ocurred ${err}`
  });
    next();  
  }
} 

export const updatePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let { id } = req.params;
    let update = req.body;
    let postUpdate = await Post.findByIdAndUpdate(id, update, { new: true })
    res.status(200).json({ 
      msg: 'User update',
      postUpdate
    });
  } catch (err) {
    res.status(500).json({
      message: `An error ocurred ${err}`
    })
    next(err);
  }
}

export const deletePost = async(req:Request,res:Response,next:NextFunction)=>{
  try {
    let { id } = req.params;
    await Post.findByIdAndDelete(id);
    res.status(200).json({
      message: 'Post deleted'
    })
  } catch (err) {
    next(err);
  }
}
