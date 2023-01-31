import { Router } from 'express';
const router = Router();

import {
  signup,
  signin,
  profile,
  sendPasswordEmail,
  updatePasswordUser
} from '../controllers/auth';
import { TokenValidation } from '../middlewares/verifyToken';
/**
 * @swagger
 * components:
 *  schemas:
 *    Auth:
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *          description: the auto-generated _id of product
 *        email:
 *          type: string
 *          description: the email user
 *        first_name:
 *          type: string
 *          description: the  first_name user
 *        last_name:
 *          type: string
 *          description: the  last_name user
 *        status:
 *          type: boolean
 *          description: the  status user
 *        username:
 *          type: string
 *          description: the  username user
 *        phone_number:
 *          type: string
 *          description: the  phone_number user
 *        password:
 *          type: string 
 *          description: the  password user
 *        roles:
 *          type: array
 *          description: the  roles user
 *      required:
 *        - email
 *      example:
 *        _id: 32dasdasdasdasdassda
 *        email: test@yopmail.com
 *        first_name: first_name
 *        last_name: last_name
 *        status: true
 *        username: username
 *        phone_number: "898698698"
 *        password: "12345678"
 *        roles: ["Client"]
 *    Login:
 *      type: object
 *      properties:
 * 
 *        email:
 *          type: string
 *          description: the email user
 *        password:
 *          type: string 
 *          description: the  password user

 *      required:
 *        - email
 *        - password
 *      example:
 *        email: admintinystore@yopmail.com
 *        password: "12345678"
 *    UserNotFound:
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
 *        message: A message

 *    UserCreated:
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
 * 
 *    UserSendEmail:
 *      type: object
 *      properties:
 *        ok:
 *          type: boolean
 *          description: status request
 *        token:
 *          type: string
 *          description:  
 *      example:
 *        ok: true
 *        token: 
 * 
 *    UserUpdatePassword:
 *      type: object
 *      properties:
 *        password:
 *          type: string
 *          description: password
 *      example:
 *        password: password
 
 
 
 */

/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: Auth endpoint
 */

/**
 * @swagger
 * /api/auth/signup:
 *  post:
 *    summary: create a new user
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Auth'
 *    responses:
 *      200:
 *        description: the user was successfully created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserCreated'
 *      500:
 *        description: the user no created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserNotFound'
 *
 */
router.post('/signup', signup);
/**
 * @swagger
 * /api/auth/signin:
 *  post:
 *    summary: login
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Login'
 *    responses:
 *      200:
 *        description: the user was successfully created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserCreated'
 *      500:
 *        description: the user no created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserNotFound'
 *
 */

router.post('/signin', signin);
/**
 * @swagger
 * /api/auth/profile:
 *  get:
 *    summary: get profile user
 *    tags: [Auth]
 *    security:
 *       - jwtAuth: []
 */

router.get('/profile', TokenValidation, profile);

/**
 * @swagger
 * /api/order/send-email-password:
 *  get:
 *    summary: send email to recovery password
 *    tags: [Auth]
 *    parameters:
 *      - in: query
 *        name: email
 *        schema:
 *          type: string
 *        example: test1@yopmail.com
 *        description: user email
 *    responses:
 *      200:
 *        description: single order
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserSendEmail'
 */

router.get('/send-email-password', sendPasswordEmail);

/**
 * @swagger
 * /api/auth/change-password:
 *  post:
 *    summary: change password
 *    tags: [Auth]
 *    security:
 *       - jwtAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/UserUpdatePassword'
 *    responses:
 *      200:
 *        description: single order
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserSendEmail'
 */

router.post('/change-password', TokenValidation, updatePasswordUser);


export default router;
