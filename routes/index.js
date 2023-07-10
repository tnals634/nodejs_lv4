const router = require('express').Router();
const user = require('./users');
const post = require('./posts');
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: 유저 회원가입 로그인
 */
router.use('/', user);
/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: 게시글 작성 전체조회 상세조회 수정 삭제
 */
router.use('/', post);

module.exports = router;
