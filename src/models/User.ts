import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  email: string;
  first_name: string;
  last_name: string;
  status: string;
  username: string;
  phone_number: string;
  password: string;
  roles: string[];
  encrypPassword(password: string): Promise<string>;
  validatePassword(password: string): Promise<boolean>;
}

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, 'email is required.']
    },
    first_name: { type: String },
    last_name: { type: String },
    status: { type: Boolean, default: true },
    username: { type: String, required: [true, 'username is required'] },
    phone_number: { type: String },
    password: { type: String, required: [true, 'password is required.'] },
    roles: [{ ref: 'Roles', type: Schema.Types.ObjectId }]
  },
  {
    timestamps: true
  }
);

userSchema.methods.encrypPassword = async (
  password: string
): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

userSchema.methods.validatePassword = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

export default model<IUser>('User', userSchema);
