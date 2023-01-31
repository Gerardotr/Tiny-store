import mongoose, { Schema, model } from 'mongoose';

import { IProductCart } from './Cart';

const AutoIncrement = require('mongoose-sequence')(mongoose);

export interface IOrder extends Document {
  user: Schema.Types.ObjectId;
  products: IProductCart[];
  discount: string;
  emailTo: string;
  discountAmount: number;
  total: number;
}

const OrderSchema = new Schema(
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
    emailTo: { type: String },
    discount: { type: Boolean, default: false },
    discountAmount: { type: Number, default: 0 },
    total: { type: Number, default: 0 }
  },
  { timestamps: true, versionKey: false }
); 

OrderSchema.plugin(AutoIncrement, {
  id: 'numberOrder',
  inc_field: 'ordenNumber'
});

export default model<IOrder>('Order', OrderSchema);
