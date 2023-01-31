import { Schema, model, Document } from 'mongoose';

export interface IProductCart extends Document {
  product: Schema.Types.ObjectId;
  quantity: number;
}

export interface ICart extends Document {
  user: Schema.Types.ObjectId;
  products: IProductCart[];
  total: number;
}

const CartSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required.']
    },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: [true, 'Product is required.']
        },
        quantity: { type: Number, required: [true, 'quantity is required.'] }
      }
    ],
    total: { type: Number, default: 0 }
  },
  { timestamps: true, versionKey: false }
);

export default model<ICart>('Cart', CartSchema);
