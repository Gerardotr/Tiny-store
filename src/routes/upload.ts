import { Router } from 'express';
import {  query } from 'express-validator';
const router = Router();
import { validateFields } from '../middlewares/validatefields';
import multer from 'multer';

import * as uploadCtrl from '../controllers/upload';

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    const productId = req.query.productId;
    const ext = file.originalname.split('.').pop();
    cb(null, `${Date.now()}-${productId}.${ext}`);
  }
});

const upload = multer({ storage });


/**
 * @swagger
 * tags:
 *  name: Upload
 *  description: Upload image to product
 */

/**
 * @swagger
 * /api/upload:
 *  post:
 *    summary: upload image to product
 *    tags: [Upload]
 *    consumes:
 *        - multipart/form-data:
 *    parameters:
 *        - in: formData   
 *          name: file
 *          description: The uploaded file data
 *          required: true
 *          schema:
 *           type: file    
 *        - in: query
 *          name: productId
 *          schema:
 *           type: string
 *          example: 63d84a0be0c5cfea742d3e49
 *          description: product id
 *    responses:
 *      200:
 *        description: the products was successfully created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ProductCreated'
 *      500:
 *        description: the products no created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ProductNoCreated'
 *
 */

router.post(
  '/',
  [
    query('productId')
      .not()
      .isEmpty()
      .trim()
      .withMessage('La descripción de la categoría es necesaria'),
    validateFields,
    upload.single('file')
  ],
  uploadCtrl.uploadImage
);

export default router;
