import Product from '../models/Product';
import { IProductCart } from 'models/Cart';

export const calculateTotalCart = async (products: IProductCart[]) => {
  let total = 0;
  for await (const p of products) {
    const product = await Product.findOne({ _id: p.product, stock: { $gte: 1 } });
    total += Number(product!.price) * p.quantity;
  }

  return total;
};
