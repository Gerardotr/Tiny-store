import { Router } from 'express';

const router = Router();

import * as cartCtrl from '../controllers/cart';

/**
 * @swagger
 * components:
 *  schemas:
 *    Cart:
 *      type: object
 *      properties:
 *        user:
 *          type: string
 *          description: user id
 *        products:
 *          type: array
 *          description: the arrays of products
 *      required:
 *        - user
 *        - products
 *      example:
 *        user: 32dasdasdasdasdassda
 *        products: [ {"product": "63d2a70e9b4e7c51847e0a56", "quantity": 2}]
 * 
 *    ProductNotFound:
 *      type: object
 *      properties:
 *        ok:
 *          type: boolean
 *          description: status request
 *        message:
 *          type: string
 *          description: A message 
 *      example:
 *        ok: false
 *        message: Products was not found

 *    ProductCreated:
 *      type: object
 *      properties:
 *        ok:
 *          type: boolean
 *          description: status request
 *        message:
 *          type: string
 *          description: A message 
 *      example:
 *        ok: true
 *        message: some message
 * 
 *    ProductNoCreated:
 *      type: object
 *      properties:
 *        ok:
 *          type: boolean
 *          description: status request
 *        message:
 *          type: string
 *          description: some message
 *      example:
 *        ok: false
 *        message: some message
 *      parameters:
 *    idProduct: 
 *      in: path
 *      name: idProduct
 *      required: true
 *      schema:
 *        type: string
 *      description: the product id

 */

/**
 * @swagger
 * tags:
 *  name: Cart
 *  description: Cart endpoint
 */

/**
 * @swagger
 * /api/cart/add:
 *  post:
 *    summary: create a new product
 *    tags: [Cart]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Cart'
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

router.post('/add', cartCtrl.addProductToCart);

/**
 * @swagger
 * /api/cart/my-cart:
 *  get:
 *    summary: return single cart
 *    tags: [Cart]
 *
 *    parameters:
 *      - in: query
 *        name: idCart
 *        schema:
 *          type: string
 *        example: 63d2a70e9b4e7c51847e0a56
 *        description: product id
 *    responses:
 *      200:
 *        description: single product
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Cart'
 */

router.get('/my-cart', cartCtrl.getMyCart);

export default router;
