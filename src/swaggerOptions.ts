export const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Tiny store',
      version: '1.0.0',
      description: 'You can choose the target of your business, be creative!.'
    },
    components: {
      securitySchemes: {
        jwtAuth: {
          type: 'apiKey',
          name: 'token',
          in: 'header',
          description: ''
        }
      }
    },
    servers: [
      {
        url: 'http://localhost:3200'
      }
    ]
  },
  apis: ['./src/routes/*.ts']
};
