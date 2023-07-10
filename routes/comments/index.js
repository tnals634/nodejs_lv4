const commentRouter = require('express').Router();
const commentController = require('./comments.route');
/**
 * @swagger
 *
 * /posts/{post_id}/comments:
 *  post:
 *    summary: "댓글 등록"
 *    description: "POST 방식으로 댓글을 등록한다."
 *    tags: [Comments]
 *    parameters:
 *      - in: path
 *        name: post_id
 *        required: true
 *        description: 게시글 아이디
 *        schema:
 *          type: integer
 *    requestBody:
 *      description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다. (댓글 등록)
 *      required: true
 *      content:
 *        localhost:3010/posts/:post_id/comments:
 *          schema:
 *            type: object
 *            properties:
 *              comment:
 *                type: string
 *                description: "댓글 내용"
 */
commentRouter.post('/posts/:post_id/comments', commentController.createComment);

/**
 * @swagger
 *  /posts/{post_id}/comments:
 *    get:
 *      summary: "댓글 조회"
 *      description: "요청 경로에 값을 담아 서버에 보낸다"
 *      tags: [Comments]
 *      parameters:
 *      - in: path
 *        name: post_id
 *        required: true
 *        description: 게시글 아이디
 *        schema:
 *          type: integer
 *      responses:
 *        "200":
 *          description: 댓글 정보
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    comments:
 *                      type: object
 *                      example:
 *                          [
 *                            {
 *                              "comment_id": 2,
 *                              "user_id": 1,
 *                              "nickname": "Developer",
 *                              "comment": "안녕하세요 2번째 댓글입니다.",
 *                              "createdAt": "2022-07-25T07:54:24.000Z",
 *                              "updatedAt": "2022-07-25T07:54:24.000Z"
 *                              },
 *                              {
 *                              "comment_id": 1,
 *                              "user_id": 1,
 *                              "nickname": "Developer",
 *                              "comment": "안녕하세요 댓글입니다.",
 *                              "createdAt": "2022-07-25T07:53:31.000Z",
 *                              "updatedAt": "2022-07-25T07:53:31.000Z"
 *                              }
 *                          ]
 */
commentRouter.get('/posts/:post_id/comments', commentController.getComments);

/**
 * @swagger
 * /posts/{post_id}/comments/{comment_id}:
 *   put:
 *    summary: "특정 게시글 특정 댓글 수정"
 *    description: "PUT 방식을 통해 댓글 수정(단일 데이터를 수정할 때 사용함)"
 *    tags: [Comments]
 *    parameters:
 *      - in: path
 *        name: post_id
 *        required: true
 *        description: 게시글 아이디
 *        schema:
 *          type: integer
 *      - in: path
 *        name: comment_id
 *        required: true
 *        description: 댓글 아이디
 *        schema:
 *          type: integer
 *    requestBody:
 *      description: 댓글 수정
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              comment:
 *                type: string
 *                description: "수정된 댓글"
 *    responses:
 *      "200":
 *        description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다.(댓글 수정)
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example:
 *                    [
 *                      { "message":"댓글을 수정하였습니다." }
 *                    ]
 */
commentRouter.put(
  '/posts/:post_id/comments/:comment_id',
  commentController.updateOneComment
);

/**
 * @swagger
 * /posts/{post_id}/comments/{comment_id}:
 *   delete:
 *    summary: "특정 댓글 삭제"
 *    description: "요청 경로에 값을 담아 서버에 보낸다."
 *    tags: [Comments]
 *    parameters:
 *      - in: path
 *        name: post_id
 *        required: true
 *        description: 게시글 아이디
 *        schema:
 *          type: integer
 *      - in: path
 *        name: comment_id
 *        required: true
 *        description: 댓글 아이디
 *        schema:
 *          type: integer
 *    responses:
 *      "200":
 *        description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다. (댓글 삭제)
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example:
 *                    [
 *                      { "message":"댓글을 삭제하였습니다." }
 *                    ]
 */
commentRouter.delete(
  '/posts/:post_id/comments/:comment_id',
  commentController.delComment
);

module.exports = commentRouter;
