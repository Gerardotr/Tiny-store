import { Router } from 'express';

const router = Router();

import * as productCtrl from '../controllers/product';
import { TokenValidation, isManager } from '../middlewares/verifyToken';

/**
 * @swagger
 * components:
 *  schemas:
 *    Product:
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *          description: the auto-generated _id of product
 *        name:
 *          type: string
 *          description: the name of the product
 *        descriptionLarge:
 *          type: string
 *          description: the descriptionLarge of the product
 *        descriptionShort:
 *          type: string
 *          description: the descriptionShort of the product
 *        likes:
 *          type: number
 *          description: the likes of the product
 *        category:
 *          type: string
 *          description: the category of the product
 *        price:
 *          type: number
 *          description: the price of the product
 *        stock:
 *          type: number
 *          description: the stock of the product
 *        status:
 *          type: boolean
 *          description: the status of the product
 *        tags:
 *          type: array
 *          description: the tags of the product
 *        photos:
 *          type: array
 *          description: the photos of the product
 *      required:
 *        - name
 *        - description
 *      example:
 *        _id: 63d93136505fafd7e5255ff4
 *        name: My first Product
 *        category: 63d849e2e0c5cfea742d3e47
 *        descriptionLarge: I have to show Something
 *        descriptionShort: I have to show Something
 *        likes: 10
 *        price: 20
 *        stock: 10
 *        status: true
 *        tags: ["Aplle"]
 *        photos:  []
 *    ProductLike:
 *      type: object
 *      properties:
 *        product:
 *          type: string
 *          description: the product
 *        user:
 *          type: string
 *          description: the user 
 *        like:
 *          type: boolean
 *          description: like
 *     
 *      required:
 *        - product
 *        - user
 *        - like
 *      example:
 *        product: 63d2a70e9b4e7c51847e0a56
 *        user: 63d03adc26c721382d870d2d
 *        like: true
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
 *  name: Products
 *  description: Products endpoint
 */
/**
 * @swagger
 * /api/product/create:
 *  post:
 *    summary: create a new product
 *    tags: [Products]
 *    security:
 *       - jwtAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Product'
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
router.post('/create', TokenValidation, isManager, productCtrl.createProduct);
/**
 * @swagger
 * /api/product/update:
 *  put:
 *    summary: update a product
 *    security:
 *       - jwtAuth: []
 *    tags: [Products]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Product'
 *    responses:
 *      200:
 *        description: the products was successfully updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ProductCreated'
 *      500:
 *        description: the products no updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ProductNoCreated'
 *
 */
router.put('/update', TokenValidation, isManager, productCtrl.updateProduct);
/**
 * @swagger
 * /api/product/status:
 *  post:
 *    summary: update product status
 *    security:
 *       - jwtAuth: []
 *    tags: [Products]
 *    parameters:
 *      - in: query
 *        name: idProduct
 *        schema:
 *          type: string
 *        example: 63d2a70e9b4e7c51847e0a56
 *        description: product id
 *    responses:
 *      200:
 *        description: The Found Product
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/ProductNotFound'
 *      404:
 *        description: the product was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ProductCreated'
 */
router.post('/status', TokenValidation, isManager, productCtrl.changeStatus);
/**
 * @swagger
 * /api/product/delete:
 *  delete:
 *    summary: delete product
 *    tags: [Products]
 *    security:
 *       - jwtAuth: []
 *    parameters:
 *      - in: query
 *        name: idProduct
 *        schema:
 *          type: string
 *        example: 63d2a70e9b4e7c51847e0a56
 *        description: product id
 *    responses:
 *      200:
 *        description: the products was successfully deleted
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ProductCreated'
 *      500:
 *        description: the products no deleted
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ProductNoCreated'
 *
 */
router.delete('/delete', TokenValidation, isManager, productCtrl.deleteProduct);
/**
 * @swagger
 * /api/product/show:
 *  get:
 *    summary: Return single products
 *    tags: [Products]
 *
 *    parameters:
 *      - in: query
 *        name: idProduct
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
 *              $ref: '#/components/schemas/Product'
 */
router.get('/show', productCtrl.getProductById);
/**
 * @swagger
 * /api/product/all:
 *  get:
 *    summary: Returns a list of products
 *    tags: [Products]
 *    responses:
 *      200:
 *        description: the list of products
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Product'
 */
router.get('/all', productCtrl.getProducts);
/**
 * @swagger
 * /api/product/like:
 *  post:
 *    summary: like product
 *    tags: [Products]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/ProductLike'
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
router.post('/like', productCtrl.likeProduct);

router.get('/getByCategory', productCtrl.getProductByCategory);



export default router; 
