import { Schema, model, Document } from 'mongoose';
import { mongoosePagination, Pagination } from 'mongoose-paginate-ts';

export interface IProduct extends Document {
  name: string;
  descriptionLarge: string;
  descriptionShort: string;
  likes: number;
  price: number;
  stock: number;
  status: boolean;
  tags: string[];
  photos: string[];
}

const productSchema = new Schema(
  {
    name: { type: String, required: [true, 'Name is required.'] },
    descriptionLarge: {
      type: String
    },
    descriptionShort: {
      type: String,
      required: [true, 'Short description is required.']
    },
    likes: { type: Number, default: 0 },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    status: { type: Boolean, required: true, default: true },
    tags: [{ type: String }],
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Category is required.']
    },
    photos: [{ type: Schema.Types.Mixed, required: false, default: [] }]
  },
  { timestamps: true, versionKey: false }
);

productSchema.plugin(mongoosePagination);

export default model<IProduct, Pagination<IProduct>>('Product', productSchema);

// export default model<IProduct>('Product', productSchema);
