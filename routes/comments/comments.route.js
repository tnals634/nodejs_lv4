const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const authMiddleWare = require('../../middlewares/auth-middleware');

const { Posts, Users, Comments } = require('../../models');

//댓글 작성 API
router.post('/posts/:post_id/comments', authMiddleWare, async (req, res) => {
  const { post_id } = req.params;
  const { comment } = req.body;
  const { user_id } = res.locals.user;

  try {
    const user = await Users.findOne({ where: { user_id } });
    const post = await Posts.findOne({ where: { post_id } });
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

    await Comments.create({
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
    const post = await Posts.findOne({ where: { post_id } });
    if (!post) {
      return res
        .status(404)
        .json({ errorMessage: '게시글이 존재하지 않습니다.' });
    }
    const comments = await Comments.findAll({
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

    res.json({ comments });
  } catch (error) {
    return res
      .status(500)
      .json({ errorMessage: '댓글 조회에 실패하였습니다.' });
  }
});

//게시글 수정 API
router.put(
  '/posts/:post_id/comments/:comment_id',
  authMiddleWare,
  async (req, res) => {
    const { post_id, comment_id } = req.params;
    const { comment } = req.body;
    const { user_id } = res.locals.user;

    try {
      const post = await Posts.findOne({ where: { post_id } });
      const findComment = await Comments.findOne({ where: { comment_id } });
      if (!post) {
        return res
          .status(404)
          .json({ errorMessage: '게시글이 존재하지 않습니다.' });
      } else if (!findComment) {
        return res
          .status(404)
          .json({ errorMessage: '댓글이 존재하지 않습니다.' });
      } else if (!comment) {
        return res.status(400).json({ errorMessage: '댓글을 입력해주세요.' });
      } else if (typeof comment != 'string') {
        return res
          .status(400)
          .json({ errorMessage: '댓글의 형식이 일치하지 않습니다.' });
      } else if (user_id != findComment.User_id) {
        return res
          .status(403)
          .json({ errorMessage: '댓글의 수정 권한이 존재하지 않습니다.' });
      }

      await Comments.update(
        { comment },
        {
          where: {
            [Op.and]: [
              { comment_id },
              { Post_id: post_id },
              { User_id: user_id },
            ],
          },
        }
      );

      res.json({ message: '댓글을 수정하였습니다.' });
    } catch (error) {
      return res
        .status(500)
        .json({ errorMessage: '댓글 수정에 실패하였습니다.' });
    }
  }
);

//댓글 삭제 API
router.delete(
  '/posts/:post_id/comments/:comment_id',
  authMiddleWare,
  async (req, res) => {
    const { post_id, comment_id } = req.params;
    const { user_id } = res.locals.user;

    try {
      const post = await Posts.findOne({ where: { post_id } });
      const comment = await Comments.findOne({ where: { comment_id } });
      if (!post) {
        return res
          .status(404)
          .json({ errorMessage: '게시글이 존재하지 않습니다.' });
      } else if (!comment) {
        return res
          .status(404)
          .json({ errorMessage: '댓글이 존재하지 않습니다.' });
      } else if (user_id != comment.User_id) {
        return res
          .status(403)
          .json({ errorMessage: '댓글의 삭제 권한이 존재하지 않습니다.' });
      }

      await Comments.destroy({
        where: {
          [Op.and]: [
            { comment_id },
            { Post_id: post_id },
            { User_id: user_id },
          ],
        },
      });

      res.json({ message: '댓글을 삭제하였습니다.' });
    } catch (error) {
      return res
        .status(500)
        .json({ errorMessage: '댓글 삭제에 실패하였습니다.' });
    }
  }
);
module.exports = router;
