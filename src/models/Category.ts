import { Schema, model } from 'mongoose';

export interface ICategory extends Document {
    name: string;
    description: string;
}
 
const CategorySchema = new Schema(
    {
        name: { type: String, required: [true, 'name is required.'] },
        description: { type: String }
    },
    { timestamps: true, versionKey: false }
);

export default model<ICategory>('Category', CategorySchema);
