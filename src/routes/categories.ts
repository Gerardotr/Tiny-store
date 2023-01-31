import { Router } from 'express';
const router = Router();
import * as categoryCtrl from '../controllers/category';
/**
 * @swagger
 * components:
 *  schemas:
 *    Category:
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *          description: the auto-generated _id of category
 *        name:
 *          type: string
 *          description: the name of the category
 *        description:
 *          type: string
 *          description: the description of the category
 *      required:
 *        - name
 *        - description
 *      example:
 *        _id: 32dasdasdasdasdassda
 *        name: My first category
 *        description: I have to show Something 
 *    CategoryNotFound:
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
 */
/**
 * @swagger
 * tags:
 *  name: Category
 *  description: Categories endpoint
 */
/**
 * @swagger
 * /api/category/create:
 *  post:
 *    summary: create a new category
 *    tags: [Category]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Category'
 *    responses:
 *      200:
 *        description: the category was successfully created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CategoryNotFound'
 *      500:
 *        description: the products no created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CategoryNotFound'
 *
 */
router.post('/create', categoryCtrl.createCategory);
/**
 * @swagger
 * /api/category/update:
 *  put:
 *    summary: update a category
 *    tags: [Category]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Category'
 *    responses:
 *      200:
 *        description: the category was successfully updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CategoryNotFound'
 *      500:
 *        description: the category no updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CategoryNotFound'
 *
 */
router.put('/update', categoryCtrl.updateCategory);
/**
 * @swagger
 * /api/category/show:
 *  get:
 *    summary: return single category
 *    tags: [Category]
 *    parameters:
 *      - in: query
 *        name: idCategory
 *        schema:
 *          type: string
 *        example: 63d2a70e9b4e7c51847e0a56
 *        description: product id
 *    responses:
 *      200:
 *        description: single category
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CategoryNotFound'
 */
router.get('/show', categoryCtrl.getCategoryById);
/**
 * @swagger
 * /api/category/all:
 *  get:
 *    summary: return a list of categories
 *    tags: [Category]
 *    responses:
 *      200:
 *        description: the list of categories
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/CategoryNotFound'
 */
router.get('/all', categoryCtrl.getCategories);
/**
 * @swagger
 * /api/category/delete:
 *  delete:
 *    summary: delete category
 *    tags: [Category]
 *    parameters:
 *      - in: query
 *        name: idCategory
 *        schema:
 *          type: string
 *        example: 63d2a70e9b4e7c51847e0a56
 *        description: category id
 *    responses:
 *      200:
 *        description: the category was successfully deleted
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CategoryNotFound'
 *      500:
 *        description: the category no deleted
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CategoryNotFound'
 *
 */
router.delete('/delete', categoryCtrl.deleteCategory);

export default router;
