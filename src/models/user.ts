import mongoose,{Schema,/* Types,Document */} from 'mongoose'
let validRoles = {
  values:['STUDENT_ROLE','ADMIN_ROLE'],
  message:'{VALUE} is not a valid role'
}

// TS
// image?:string property optional
interface User extends mongoose.Document{
  name:string;
  username:string;
  email:string;
  password:string;
  image:string;
  role:string;
  //Types.ObjectId
  // organization:Types.ObjectId;
}

const UserSchema = new Schema({
  name:String,
  username:String,
  email:{
    type:String,
    unique:true,
    required:[true,'email is required'],
  },
  password:{
    type:String,
    required:[true,'password is required']
  },
  image:String,
  role:{
    type:String,
    default:'STUDENT_ROLE',
    enum:validRoles
  },
  createAt:{type:Date,default: Date.now()},
  state:{type:Boolean,default:true}  
},{versionKey:false})

// JS
// const User = mongoose.model('User',UserSchema);
// TS
const User = mongoose.model<User>('User',UserSchema);

export default User;
