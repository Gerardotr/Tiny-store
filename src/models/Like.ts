import { Schema, model, Document } from 'mongoose';

export interface ILike extends Document {
  product: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
  like: boolean;
}

const LikeSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: [true, 'Product is required.']
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required.']
    },
    like: { type: Boolean, default: false }
  },
  { timestamps: true, versionKey: false }
);

export default model<ILike>('Like', LikeSchema);
