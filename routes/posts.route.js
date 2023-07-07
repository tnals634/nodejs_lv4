const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const authMiddleWare = require('../middlewares/auth-middleware');

const { posts, users } = require('../models');

//게시글 작성 API
router.post('/posts', authMiddleWare, async (req, res) => {
  const { title, content } = req.body;
  const { user_id } = res.locals.user;

  const user = await users.findOne({ where: { user_id } });
  try {
    if (!title || !content) {
      return res
        .status(400)
        .json({ errorMessage: '데이터 형식이 올바르지 않습니다.' });
    } else if (typeof title != 'string') {
      return res
        .status(400)
        .json({ errorMessage: '게시글 제목의 형식이 일치하지 않습니다.' });
    } else if (typeof content != 'string') {
      return res
        .status(400)
        .json({ errorMessage: '게시글 내용의 형식이 일치하지 않습니다.' });
    }

    await posts.create({
      User_id: user_id,
      nickname: user.nickname,
      title,
      content,
    });

    return res.status(201).json({ message: '게시글 작성에 성공하였습니다.' });
  } catch (error) {
    return res
      .status(500)
      .json({ errorMessage: '게시글 작성에 실패하였습니다.' });
  }
});

//게시글 목록 조회 API
router.get('/posts', async (req, res) => {
  try {
    const Posts = await posts.findAll({
      attributes: [
        'post_id',
        'User_id',
        'nickname',
        'title',
        'createdAt',
        'updatedAt',
      ],
      order: [['createdAt', 'DESC']],
    });

    res.json({ posts: Posts });
  } catch (error) {
    return res
      .status(500)
      .json({ errorMessage: '게시글 조회에 실패하였습니다.' });
  }
});

module.exports = router;
