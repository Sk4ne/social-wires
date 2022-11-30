import mongoose,{Schema,/* Types,Document */} from 'mongoose'

// TS
interface User extends mongoose.Document{
  username:string;
  email:string;
  nameComplete:string;
  password:string;
}

const UserSchema = new Schema({
  username:String,
  email:{
    type:String,
    unique:true,
    required:[true,'email is required'],
  },
  nameComplete:String,
  password:{
    type:String,
    required:[true,'password is required']
  },
  createAt:{type:Date,default: Date.now()},
  state:{type:Boolean,default:true}  
},{versionKey:false})
// TS
const User = mongoose.model<User>('User',UserSchema);

export default User;
