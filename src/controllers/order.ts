import Order from '../models/Order';
import Cart from '../models/Cart';
import { Request, Response } from 'express';
import { sendEmailBuyOrder } from '../helpers/sendgrid';

export const buyProducts = async (req: Request, res: Response) => {
  try {
    const { ...data } = req.body;
    console.log(data);
    const cart = await Cart.findOne({ _id: data.cart });
    if (cart) {
      const dbProducts = cart.products.map((p) => {
        return { product: p.product.toString(), quantity: p.quantity };
      });
      const newOrder = new Order({
        products: dbProducts,
        total: cart.total,
        user: cart.user,
        discount: data.discount,
        discountAmount: data.discountAmount,
        emailTo: data.emailTo
      });
      const order = await (
        await (await newOrder.save()).populate('user')
      ).populate('products.product');
      await Cart.findOneAndRemove({ _id: cart._id });
      await sendEmailBuyOrder(order);
      return res.json({
        ok: true,
        message: 'Order created'
      });
    } else {
      res.json({
        ok: true,
        message: "Cart doesn't exist"
      });
    }
  } catch (error: any) {
    res.status(500).json({
      ok: false,
      message: 'An error occurred while buying the products'
    });
  }
};

export const showMyOrder = async (req: Request, res: Response) => {
  const { idOrder } = req.query;

  const order = await Order.findById(idOrder);

  res.json({ ok: true, order });
};

export const showAllOrders = async (req: Request, res: Response) => {

  try {
    const orders = await Order.find();
    res.json({ ok: true, orders });

  } catch (error) {
    res.status(500).json({
      ok: false,
      message: 'An error occurred while getting the orders'
    });

  }


}
