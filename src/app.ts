import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';

const app: Application = express();

import AuthController from './routes/auth';
import ProductController from './routes/product';
import CartController from './routes/cart';
import OrderController from './routes/order';
import UploadController from './routes/upload';
import CategoryController from './routes/categories';
//Swagger
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import { options } from './swaggerOptions';

const specs = swaggerJsDoc(options);
// initial Setup

// createRoles();

// settings
app.set('port', 3200 || process.env.PORT);

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/static', express.static(path.join(__dirname, 'optimize')));
app.use(express.json({ limit: '100mb' }));
app.use(
  express.urlencoded({
    extended: true,
    limit: '100mb',
    parameterLimit: 1000000
  })
);

// Routes

app.use('/api/auth', AuthController);
app.use('/api/upload', UploadController);
app.use('/api/product', ProductController);
app.use('/api/category', CategoryController);
app.use('/api/cart', CartController);
app.use('/api/order', OrderController);
app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(specs));

export default app;
