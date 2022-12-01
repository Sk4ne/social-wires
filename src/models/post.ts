import mongoose,{ Schema } from 'mongoose'
import { Types } from 'mongoose';

interface Post extends mongoose.Document{
  title:string;
  description:string;
  createAt:Date;
  idUser:Types.ObjectId  
}

const PostSchema = new Schema({
  title:String,
  description:String,
  createAt:{type:Date,default: Date.now()},
  idUser: {type: Schema.Types.ObjectId,ref:'User'}
},{versionKey:false})

const Post = mongoose.model<Post>('Post',PostSchema)

export default Post; 
