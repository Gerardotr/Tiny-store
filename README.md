# Tiny-store
Tiny store

POSTMAN DOCUMENTATION

https://documenter.getpostman.com/view/6224863/2s935iumL8

## Technical requirements

- PostgreSQL and Prisma 
I use mongoDB for the database because I have more experience with that technology, I know a bit about PostgreSQL but haven't used it in a long time
- Express or NestJs (Express Done)
- Typescript (Done)
- Jest (Done)
- Prettier (Done)
- ESLint (Done)
- REST or GraphQL (Rest Done)
- Github repository named Ravn-Challenge-V2-<your name>

## Mandatory features

1. Authentication endpoints (sign up, sign in, sign out) (Done)
2. List products with pagination (Done)
3. Search products by category ≈
4. Add 2 kind of users (Manager, Client)
    1. As a Manager I can:
        1. Create products √
        2. Update products √
        3. Delete products √
        4. Disable products √
        5. Show client orders √
        6. Upload images per product √
    2. As a Client I can:
        1. See products √
        2. See the product details √
        3. Buy products √
        4. Add products to cart √
        5. Like products √
        6. Show my order √
5. The product information(including images) should be visible for logged and not logged users √
6. Swagger/Postman documentation √
7. Tests, with a least a 80% coverage √

## Extra points

- e2e testing, this will be considered very valuable x
- When the stock of a product reaches 3, notify the last user that liked it and not purchased the product yet with an email. Use a background job and make sure to include the product's image in the email. x
- Add forgot password functionality. √
- Send an email when the user change the password (with sendgrid) √
- Deploy on Heroku √
