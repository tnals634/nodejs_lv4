const postRouter = require('express').Router();
const postController = require('./posts.route');

/**
 * @swagger
 *
 * /posts:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    summary: "게시글 등록"
 *    description: "POST 방식으로 게시글을 등록한다."
 *    tags: [Posts]
 *    requestBody:
 *      description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다. (게시글 등록)
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              title:
 *                type: string
 *                description: "게시글 제목"
 *              content:
 *                type: string
 *                description: "게시글 내용"
 *    responses:
 *      "200":
 *        description: 게시글 등록
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  message:
 *                      type: object
 *                      example: [{"message":"게시글을 등록하였습니다."}]
 */
postRouter.post('/posts', postController);

/**
 * @swagger
 * paths:
 *  /posts:
 *    get:
 *      summary: "게시글 전체조회"
 *      description: "서버에 데이터를 보내지 않고 Get방식으로 요청"
 *      tags: [Posts]
 *      responses:
 *        "200":
 *          description: 전체 게시글 정보
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    posts:
 *                      type: object
 *                      example:
 *                          [
 *                            {
 *                              "post_id": 2,
 *                              "user_id": 1,
 *                              "nickname": "Developer",
 *                              "title": "안녕하세요 2번째 게시글 제목입니다.",
 *                              "createdAt": "2022-07-25T07:45:56.000Z",
 *                              "updatedAt": "2022-07-25T07:45:56.000Z"
 *                              },
 *                              {
 *                              "post_id": 1,
 *                              "user_id": 1,
 *                              "nickname": "Developer",
 *                              "title": "안녕하세요 게시글 제목입니다.",
 *                              "createdAt": "2022-07-25T07:45:15.000Z",
 *                              "updatedAt": "2022-07-25T07:45:15.000Z"
 *                               }
 *                          ]
 */
postRouter.get('/posts', postController);

/**
 * @swagger
 * /posts/{post_id}:
 *  get:
 *    summary: "특정 게시글 조회"
 *    description: "요청 경로에 값을 담아 서버에 보낸다."
 *    tags: [Posts]
 *    parameters:
 *      - in: path
 *        name: post_id
 *        required: true
 *        description: 게시글 아이디
 *        schema:
 *          type: integer
 *    responses:
 *      "200":
 *        description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다. (게시글 조회)
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                post:
 *                  type: object
 *                  example: [
 *                              "post": {
 *                                  "post_id": 2,
 *                                  "user_id": 1,
 *                                  "nickname": "Developer",
 *                                  "title": "안녕하새요 수정된 게시글 입니다.",
 *                                  "content": "안녕하세요 content 입니다.",
 *                                  "createdAt": "2022-07-25T07:45:56.000Z",
 *                                  "updatedAt": "2022-07-25T07:52:09.000Z"
 *                                  }]
 */
postRouter.get('/posts/:post_id', postController);

/**
 * @swagger
 * /posts/{post_id}:
 *   put:
 *    summary: "특정 게시글 수정"
 *    description: "PUT 방식을 통해 게시글 수정(단일 데이터를 수정할 때 사용함)"
 *    tags: [Posts]
 *    parameters:
 *      - in: path
 *        name: post_id
 *        required: true
 *        description: 게시글 아이디
 *        schema:
 *          type: integer
 *    requestBody:
 *      description: 게시글 수정
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              title:
 *                type: string
 *                description: "수정된 게시글 제목"
 *              content:
 *                type: string
 *                description: "수정된 게시글 내용"
 *    responses:
 *      "200":
 *        description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다.(게시글 수정)
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example:
 *                    [
 *                      { "message":"게시글을 수정하였습니다." }
 *                    ]
 */
postRouter.put('/posts/:post_id', postController);

/**
 * @swagger
 * /posts/{post_id}:
 *   delete:
 *    summary: "특정 게시글 삭제"
 *    description: "요청 경로에 값을 담아 서버에 보낸다."
 *    tags: [Posts]
 *    parameters:
 *      - in: path
 *        name: post_id
 *        required: true
 *        description: 게시글 아이디
 *        schema:
 *          type: integer
 *    responses:
 *      "200":
 *        description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다. (게시글 삭제)
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example:
 *                    [
 *                      { "message":"게시글을 삭제하였습니다." }
 *                    ]
 */
postRouter.delete('/posts/:post_id', postController);

/**
 * @swagger
 * /posts/{post_id}/like:
 *   put:
 *    summary: "특정 게시글 좋아요"
 *    description: "PUT 방식을 통해 게시글 좋아요(단일 데이터를 수정할 때 사용함)"
 *    tags: [Posts]
 *    parameters:
 *      - in: path
 *        name: post_id
 *        required: true
 *        description: 게시글 아이디
 *        schema:
 *          type: integer
 *    responses:
 *      "200":
 *        description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다.(게시글 좋아요)
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example:
 *                    [
 *                      { "if":"좋아요를 등록할 경우","message":"게시글의 좋아요를 등록 하였습니다." },
 *                      { "if":"좋아요를 취소할 경우","message":"게시글의 좋아요를 취소 하였습니다."}
 *                    ]
 */
postRouter.put('/posts/:post_id/like', postController);

/**
 * @swagger
 * paths:
 *  /like/posts:
 *    get:
 *      summary: "좋아요 게시글 전체조회"
 *      description: "서버에 데이터를 보내지 않고 Get방식으로 요청"
 *      tags: [Posts]
 *      responses:
 *        "200":
 *          description: 전체 좋아요가 있는 게시글 정보
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    posts:
 *                      type: object
 *                      example:
 *                          [
 *                            {
 *                              "post_id": 2,
 *                              "user_id": 1,
 *                              "nickname": "Developer",
 *                              "title": "안녕하세요 2번째 게시글 제목입니다.",
 *                              "likes": 1,
 *                              "createdAt": "2022-07-25T07:45:56.000Z",
 *                              "updatedAt": "2022-07-25T07:45:56.000Z"
 *                              },
 *                              {
 *                              "post_id": 1,
 *                              "user_id": 1,
 *                              "nickname": "Developer",
 *                              "title": "안녕하세요 게시글 제목입니다.",
 *                              "likes": 3,
 *                              "createdAt": "2022-07-25T07:45:15.000Z",
 *                              "updatedAt": "2022-07-25T07:45:15.000Z"
 *                               }
 *                          ]
 */
postRouter.get('/like/posts', postController);
module.exports = postRouter;
