const userRouter = require('express').Router();
const userController = require('./users.route');

/**
 * @swagger
 *
 * /signup:
 *  post:
 *    summary: "유저 등록"
 *    description: "POST 방식으로 유저를 등록한다."
 *    tags: [Users]
 *    requestBody:
 *      description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다. (유저 등록)
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              nickname:
 *                type: string
 *                description: "유저 닉네임"
 *              password:
 *                type: string
 *                description: "유저 비밀번호"
 *              confirmPassword:
 *                type: string
 *                description: "비밀번호 확인"
 */
userRouter.post('/signup', userController);

/**
 * @swagger
 *
 * /login:
 *  post:
 *    summary: "유저 로그인"
 *    description: "POST 방식으로 유저가 로그인한다."
 *    tags: [Users]
 *    security:
 *      - cookieAuth: []
 *    requestBody:
 *      description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다. (유저 로그인)
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              nickname:
 *                type: string
 *                description: "유저 닉네임"
 *              password:
 *                type: string
 *                description: "유저 비밀번호"
 *    responses:
 *      "200":
 *        description: OK
 *        headers:
 *          set-cookie:
 *              description: >
 *                Contains the session cookie named `authorization`.
 *                Pass this cookie back in subsequent requests.
 *              schema:
 *                  type: string
 */
userRouter.post('/login', userController);
