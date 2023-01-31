import { calculateTotalCart } from '../libs/calculateTotal';
import Cart, { IProductCart } from '../models/Cart';
import { Request, Response } from 'express';

export const addProductToCart = async (req: Request, res: Response) => {
  try {
    const { ...data } = req.body;
    const cart = await Cart.findOne({ user: data.user });
    if (cart) {
      const dbProducts = cart.products.map((p) => {
        return { product: p.product.toString(), quantity: p.quantity };
      });
      const productQuantities = data.products.filter(
        (p: IProductCart, index: number) => {
          if (p.product.toString() === dbProducts[index].product) {
            p.quantity += dbProducts[index].quantity;
            return p;
          }
        }
      );
      const total = await calculateTotalCart(productQuantities);
      cart.products = productQuantities;
      cart.total = total;
      await cart.save();
      return res.json({
        ok: true,
        message: 'Cart updated'
      });
    }
    const total = await calculateTotalCart(data.products);
    const newCart = new Cart({ ...data, total });
    await newCart.save();
    res.json({
      ok: true,
      message: 'Cart created'
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: 'An error occurred while registering the cart'
    });
  }
};

export const getMyCart = async (req: Request, res: Response) => {
  try {
    const { idCart } = req.query;
    const cart = await Cart.findById(idCart);

    res.status(200).json({ ok: true, cart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, message: 'something went wrong' });
  }
};
