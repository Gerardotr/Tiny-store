import { Router } from 'express';

const router = Router();

import * as orderCtrl from '../controllers/order';
import { TokenValidation, isManager } from '../middlewares/verifyToken';

/**
 * @swagger
 * components:
 *  schemas:
 *    Order:
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *          description: the auto-generated _id of product
 *        name:
 *          type: string
 *          description: the name of the product
 *      required:
 *        - name
 *        - description
 *      example:
 *        _id: 32dasdasdasdasdassda
 *        name: My first Product
 *        descriptionLarge: I have to show Something
 *    OrderSchema:
 *      type: object
 *      properties:
 *        user:
 *          type: string
 *          description: the product
 *        cart:
 *          type: string
 *          description: the user 
 *        emailTo:
 *          type: boolean
 *          description: geratobe@gmail.com
 *        discount:
 *          type: boolean
 *          description: like
 *        discountAmount:
 *          type: number
 *          description: 0
 *     
 *      required:
 *        - user
 *        - cart
 *        - emailTo
 *        - discount
 *        - discountAmount 
 *      example:
 *        user: 63d2a70e9b4e7c51847e0a56
 *        cart: 63d03adc26c721382d870d2d
 *        emailTo: geratobe@gmail.com
 *        discount: false
 *        discountAmount: 0
 *    OrderResponse:
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
 * 
 *    OrderList:
 *      type: object
 *      properties:
 *        ok:
 *          type: boolean
 *          description: status request
 *        orders:
 *          type: array
 *          description: A array 
 *      example:
 *        ok: false
 *        orders: []
 */

/**
 * @swagger
 * tags:
 *  name: Order
 *  description: Order endpoint
 */
/**
 * @swagger
 * /api/order/buy:
 *  post:
 *    summary: create a new product
 *    tags: [Order]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/OrderSchema'
 *    responses:
 *      200:
 *        description: the order was successfully created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/OrderResponse'
 *      500:
 *        description: the order no created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/OrderResponse'
 *
 */

router.post('/buy', orderCtrl.buyProducts);

/**
 * @swagger
 * /api/order/show:
 *  get:
 *    summary: return single order
 *    tags: [Order]
 *    parameters:
 *      - in: query
 *        name: idOrder
 *        schema:
 *          type: string
 *        example: 63d2a70e9b4e7c51847e0a56
 *        description: order id
 *    responses:
 *      200:
 *        description: single order
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CategoryNotFound'
 */

router.get('/show', orderCtrl.showMyOrder);

/**
 * @swagger
 * /api/order/all:
 *  get:
 *    summary: return a list of orders
 *    tags: [Order]
 *    security:
 *       - jwtAuth: []
 *    responses:
 *      200:
 *        description: the list of orders
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/OrderList'
 */

router.get('/all', TokenValidation, isManager,  orderCtrl.showAllOrders);



export default router;
