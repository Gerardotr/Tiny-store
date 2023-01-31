import Product from '../models/Product';
import Like from '../models/Like';
import { Request, Response } from 'express';

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { ...data } = req.body;
    const newProduct = new Product(data);
    await newProduct.save();
    res.json({
      ok: true,
      message: 'Product has been registered'
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: 'An error occurred while registering the product'
    });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { ...data } = req.body;
    const productUpdated = await Product.findOne({ _id: data._id });

    if (!productUpdated) {
      return res.status(404).json({
        ok: false,
        message: 'The product was not found'
      });
    }
    productUpdated.name = data.name;
    productUpdated.descriptionLarge = data.descriptionLarge;
    productUpdated.descriptionShort = data.descriptionShort;
    productUpdated.price = data.price;
    productUpdated.stock = data.stock;
    productUpdated.status = data.status;
    productUpdated.tags = data.tags;
    productUpdated.photos = data.photos;

    await productUpdated.save();

    res.json({
      ok: true,
      message: 'Product has been updated'
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: 'An error occurred while updating the product'
    });
  }
};

export const changeStatus = async (req: Request, res: Response) => {
  try {
    const { idProduct } = req.query;
    const productUpdate = await Product.findOne({ _id: idProduct });
    if (!productUpdate) {
      return res.json({
        ok: false,
        message: 'This product does not exist'
      });
    }
    const currentStatus = productUpdate.status;
    productUpdate.status = !currentStatus;
    await Product.updateOne(
      { _id: idProduct },
      { $set: { status: productUpdate.status } }
    );
    res.json({
      ok: true,
      message: `The product has been ${
        currentStatus ? 'deactivated' : 'activated'
      } el producto`
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: 'Could not change product status'
    });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { idProduct } = req.query;
    const product = await Product.findByIdAndRemove({ _id: idProduct });

    if (!product) {
      return res.status(404).json({
        ok: false,
        message: 'This product does not exist'
      });
    }
    res.json({
      ok: true,
      message: 'Product has been removed'
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: 'Could not delete product'
    });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  const { idProduct } = req.query;
  const product = await Product.findById(idProduct);
  console.log(product);

  if (!product?.status || product?.stock <= 0) {
    return res.status(500).json({
      ok: false,
      message: 'This product is disable or stock is 0',
      product: product
    });
  }

  res.json({ ok: true, producto: product });
};

export const getProducts = async (req: Request, res: Response) => {
  const { page } = req.query;
  const options = {
    page,
    query: { stock: { $gte: 1 } },
    sort: { createdAt: -1 },
    limit: process.env['PAGINATION_LIMIT']
  };

  const products = await Product.paginate(options);
  const paginationDetails = { ...products };
  delete paginationDetails.docs;
  res.json({
    ok: true,
    products: products!.docs,
    paginationDetails
  });
};

export const likeProduct = async (req: Request, res: Response) => {
  try {
    const { ...data } = req.body;
    const newLike = new Like(data);
    const isLiked = await Like.findOne({
      product: data.product,
      user: data.user
    });
    if (isLiked) {
      return res.status(404).json({
        ok: true,
        message: 'you already liked this product!'
      });
    }
    await newLike.save();
    await Product.findOneAndUpdate(
      { _id: data.product },
      { $inc: { likes: 1 } },
      { new: true }
    );
    res.json({
      ok: true,
      message: 'You like this product!'
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: 'An error occurred while like the product'
    });
  }
};
