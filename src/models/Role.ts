import { Schema, model } from 'mongoose';

export interface IRole extends Document {
  name: string;
}

export const ROLES = ['Manager', 'Client'];

const RoleSchema = new Schema(
  {
    name: { type: String, unique: true, required: [true, 'name is required.'] }
  },
  { timestamps: true, versionKey: false }
);
export default model<IRole>('Roles', RoleSchema);
