const swaggerUi = require('swagger-ui-express');
const swaggereJsdoc = require('swagger-jsdoc');
const jwt = require('jsonwebtoken');
const authMiddleWare = require('../middlewares/auth-middleware');

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'nodejs_lv4 swagger',
      description:
        '프로젝트 설명 Node.js Swaager swagger-jsdoc 방식 RestFul API 클라이언트 UI',
    },
    components: {
      securitySchemes: {
        cookieAuth: {
          type: 'apiKey',
          name: 'authorization',
          in: 'cookie',
        },
      },
    },
    security: {
      cookieAuth: [],
    },
    servers: [
      {
        url: 'http://localhost:3010', // 요청 URL
      },
    ],
  },
  apis: [
    './routes/index.js',
    './routes/users/*',
    './routes/posts/*',
    './routes/comments/*',
    './swagger/*',
  ],
};
const specs = swaggereJsdoc(options);

module.exports = { swaggerUi, specs };
