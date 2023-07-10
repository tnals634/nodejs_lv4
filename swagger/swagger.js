const swaggerUi = require('swagger-ui-express');
const swaggereJsdoc = require('swagger-jsdoc');

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'nodejs_lv4 swagger',
      description:
        '프로젝트 설명 Node.js Swaager swagger-jsdoc 방식 RestFul API 클라이언트 UI',
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
