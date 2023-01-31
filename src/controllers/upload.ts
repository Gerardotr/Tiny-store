import { helperImg } from '../libs/optimizeImage';
import Product from '../models/Product';
import { Request, Response } from 'express';
export const uploadImage = async (req: Request, res: Response) => {
  try {
    console.log(req.file)
    const urlUpload: string = 'http://localhost:3200/static/rezise-';
    const productId = req.query.productId;
    helperImg(req.file.path, `rezise-${req.file.filename}`, 100);

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        ok: false,
        message: 'This product does not exist'
      });
    }
    const newPhoto = [`${urlUpload}${req.file.filename}`];

    product.photos = [...product.photos, ...newPhoto];
    await Product.updateOne(
      { _id: productId },
      { $set: { photos: product.photos } }
    );

    res.json({
      ok: true,
      message: 'Done'
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      message: 'An error occurred while upload image'
    });
  }
};
