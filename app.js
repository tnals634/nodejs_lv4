const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3010;

const userRouter = require('./routes/users/users.route');
const postRouter = require('./routes/posts/posts.route');
const commentRouter = require('./routes/comments/comments.route');
app.use(express.json());
app.use(cookieParser());

app.use('/', [userRouter, postRouter, commentRouter]);
const { swaggerUi, specs } = require('./swagger/swagger');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸습니다.');
});
