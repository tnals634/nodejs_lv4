const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const authMiddleWare = require('../middlewares/auth-middleware');

const { posts, users, comments } = require('../models');

//댓글 작성 API
router.post('/posts/:post_id/comments', authMiddleWare, async (req, res) => {
  const { post_id } = req.params;
  const { comment } = req.body;
  const { user_id } = res.locals.user;

  try {
    const user = await users.findOne({ where: { user_id } });
    const post = await posts.findOne({ where: { post_id } });
    if (!post) {
      return res
        .status(404)
        .json({ errorMessage: '게시글이 존재하지 않습니다.' });
    } else if (!comment) {
      return res.status(400).json({ errorMessage: '댓글을 입력해주세요.' });
    } else if (typeof comment != 'string') {
      return res
        .status(400)
        .json({ errorMessage: '댓글의 형식이 일치하지 않습니다.' });
    }

    await comments.create({
      Post_id: post_id,
      User_id: user_id,
      nickname: user.nickname,
      comment,
    });

    res.status(201).json({ message: '댓글 작성에 성공하였습니다.' });
  } catch (error) {
    return res
      .status(500)
      .json({ errorMessage: '댓글 작성에 실패하였습니다.' });
  }
});

//댓글 조회 API
router.get('/posts/:post_id/comments', async (req, res) => {
  const { post_id } = req.params;
  try {
    const post = await posts.findOne({ where: { post_id } });
    if (!post) {
      return res
        .status(404)
        .json({ errorMessage: '게시글이 존재하지 않습니다.' });
    }
    const Comments = await comments.findAll({
      attributes: [
        'comment_id',
        'User_id',
        'nickname',
        'comment',
        'createdAt',
        'updatedAt',
      ],
      order: [['createdAt', 'DESC']],
      where: { Post_id: post_id },
    });

    res.json({ comments: Comments });
  } catch (error) {
    return res
      .status(500)
      .json({ errorMessage: '댓글 조회에 실패하였습니다.' });
  }
});

module.exports = router;
