import app from '../src/app'
import request from 'supertest'
import mongoose, { ConnectOptions } from 'mongoose';
import { createRoles } from '../src/libs/initialSetup';

import dotenv from 'dotenv';
dotenv.config();

beforeAll(async () => {
    await mongoose.connect('mongodb+srv://tinystore:uxWJ71808QXoczcS@tinystore.itxyh0z.mongodb.net/?retryWrites=true&w=majority', {
        useUnifiedTopology: true, useNewUrlParser: true
    } as ConnectOptions)
    createRoles();
});

describe("POST /auth/signup", () => {
    describe("signup given a user data", () => {
        const newUser = {
            email: "test1@yopmail.com",
            first_name: "test",
            last_name: "test",
            username: "test",
            phone_number: "12345678",
            password: "12345678",
            roles: ["Client"]
        };

        // should respond with a 500 status code becouse email already exists
        test("should respond with a 500 status code becouse email already exists", async () => {
            const response = await request(app).post("/api/auth/signup").send(newUser);
            expect(response.statusCode).toBe(500);
        });

        // should respond with a 200 status code wend user is created
        // test("should respond with a 200 status code wend user is created", async () => {
        //     const response = await request(app).post("/api/auth/signup").send(newUser);
        //     expect(response.statusCode).toBe(200);
        // });

        // should respond a json as a content type
        test("should have a Content-Type: application/json header", async () => {
            const response = await request(app).post("/api/auth/signup").send(newUser);
            expect(response.headers["content-type"]).toEqual(
                expect.stringContaining("json")
            );
        });
    });

    describe("when the data is missing", () => {
        // should respond with a 500 code
        test("shoud respond with a 500 status code", async () => {
            const fields = [
                {},
                { any: "some any" },
            ];
            for (const body of fields) {
                const response = await request(app).post("/api/auth/signup").send(body);
                expect(response.statusCode).toBe(500);
            }
        });
    });
});

describe("POST /auth/signin", () => {
    describe("signin given data", () => {
        const credentials = {
            email: "test1@yopmail.com",
            password: "12345678"
        };
        // should respond with a 200 status code
        test("should respond with a 200 status code", async () => {
            const response = await request(app).post("/api/auth/signin").send(credentials);
            expect(response.statusCode).toBe(200);
        });
    });

});

describe("GET /product/all", () => {
    test("should response with a 200 status code", async () => {
        const response = await request(app).get('/api/product/all').send();
        expect(response.statusCode).toBe(200);
    });
});

describe("GET /product/show", () => {
    test("should response with a 200 status code", async () => {
        const idProduct = '63d6d429e6320c32d54c0d02';
        const response = await request(app).get('/api/product/show').query({idProduct}).send();
        expect(response.statusCode).toBe(200);
    });
});

describe("POST /product/create", () => {
    describe("product given data", () => {
        const product = {
            name: "Test product",
            descriptionLarge: "...",
            descriptionShort: "...",
            price: 10.00,
            stock: 5,
            status: true,
            tags: ["test"]
        };
        // should respond with a 200 status code
        test("should respond with a 200 status code", async () => {
            const response = await request(app).post("/api/product/create").send(product);
            expect(response.statusCode).toBe(200);
        });
    });

});

describe("PUT /product/update", () => {
    describe("product update given data", () => {
        const product = {
            _id: "63d5f644e107d0a41763f4b7",
            name: "Test product update",
            descriptionLarge: "...",
            descriptionShort: "...",
            price: 10.00,
            stock: 5,
            status: true,
            tags: ["test"]
        };
        // should respond with a 200 status code
        test("should respond with a 200 status code", async () => {
            const response = await request(app).put("/api/product/update").send(product);
            expect(response.statusCode).toBe(200);
        });
    });

});

describe("POST /product/status", () => {
    // should respond with a 200 status code
    test("should respond with a 200 status code", async () => {
        const idProduct = '63d2a70e9b4e7c51847e0a56';
        const response = await request(app).post("/api/product/status").query({idProduct}).send();
        expect(response.statusCode).toBe(200);
    });

});

describe("DELETE /product/delete", () => {
    // should respond with a 200 status code
    test("should respond with a 200 status code", async () => {
        const idProduct = '63d6d429e6320c32d54c0d02';
        const response = await request(app).delete("/api/product/delete").query({idProduct}).send();
        expect(response.statusCode).toBe(200);
    });

});

describe("GET /my-cart?idCart", () => {
    test('should query have a cart id', async () => {
        const idCart = '63d5d309723a9adf4a2d5374';
        expect(idCart).toBeDefined()
    });

    test("should response with a 200 status code", async () => {
        const idCart = '63d5d309723a9adf4a2d5374';
        const response = await request(app).get('/api/cart/my-cart').query({ idCart }).send();
        expect(response.statusCode).toBe(200);
    });

    test('should respond with a object with ok = true', async () => {
        const idCart = '63d5d309723a9adf4a2d5374';
        const response = await request(app).get('/api/cart/my-cart').query({ idCart }).send();
        expect(response.body).toBeInstanceOf(Object)
    });
});

afterAll(async () => {
    await mongoose.disconnect();
})


