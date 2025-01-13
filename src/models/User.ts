import { Document, Schema, model } from "mongoose";

// User model for reqistering users 

interface IUser extends Document {
  username: string;
  password: string;
  email: string; 
  isAdmin: boolean; 
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, require: true}, 
  isAdmin: { type: Boolean, require: true}
});

const User = model<IUser>("user", UserSchema);

export { User, IUser };

// eof
