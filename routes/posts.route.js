const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const authMiddleWare = require('../middlewares/auth-middleware');

const { posts, users, post_likes, count_likes } = require('../models');

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

//게시글 상세 조회 API
router.get('/posts/:post_id', async (req, res) => {
  const { post_id } = req.params;
  try {
    const post = await posts.findOne({
      attributes: [
        'post_id',
        'User_id',
        'nickname',
        'title',
        'content',
        'createdAt',
        'updatedAt',
      ],
      where: { post_id },
    });
    if (!post) {
      return res
        .status(403)
        .json({ errorMessage: '게시글이 존재하지 않습니다.' });
    }

    res.json({ post });
  } catch (error) {
    return res
      .status(500)
      .json({ errorMessage: '게시글 조회에 실패하였습니다.' });
  }
});

//게시글 수정 API
router.put('/posts/:post_id', authMiddleWare, async (req, res) => {
  const { post_id } = req.params;
  const { user_id } = res.locals.user;
  const { title, content } = req.body;

  try {
    const post = await posts.findOne({ where: { post_id } });
    if (!post) {
      return res
        .status(404)
        .json({ errorMessage: '게시글이 존재하지 않습니다.' });
    } else if (!title || !content) {
      return res
        .status(400)
        .json({ errorMessage: '데이터 형식이 올바르지 않습니다.' });
    } else if (user_id != post.User_id) {
      return res
        .status(403)
        .json({ errorMessage: '게시글 수정 권한이 존재하지 않습니다.' });
    } else if (typeof title != 'string') {
      return res
        .status(400)
        .json({ errorMessage: '게시글 제목의 형식이 일치하지 않습니다.' });
    } else if (typeof content != 'string') {
      return res
        .status(400)
        .json({ errorMessage: '게시글 내용의 형식이 일치하지 않습니다.' });
    }

    await posts.update(
      { title, content },
      {
        where: {
          [Op.and]: [{ post_id }, { User_id: user_id }],
        },
      }
    );

    res.json({ message: '게시글을 수정하였습니다.' });
  } catch (error) {
    return res
      .status(500)
      .json({ errorMessage: '게시글 수정에 실패하였습니다.' });
  }
});

//게시글 삭제 API
router.delete('/posts/:post_id', authMiddleWare, async (req, res) => {
  const { post_id } = req.params;
  const { user_id } = res.locals.user;
  try {
    const post = await posts.findOne({ where: { post_id } });
    if (!post) {
      return res
        .status(404)
        .json({ errorMessage: '게시글이 존재하지 않습니다.' });
    } else if (user_id != post.User_id) {
      return res
        .status(403)
        .json({ errorMessage: '게시글 삭제 권한이 존재하지 않습니다.' });
    }

    await posts.destroy({
      where: { [Op.and]: [{ post_id }, { User_id: user_id }] },
    });

    res.json({ message: '게시글이 삭제되었습니다.' });
  } catch (error) {
    return res
      .status(500)
      .json({ errorMessage: '게시글 삭제에 실패하였습니다.' });
  }
});

//게시글 좋아요 API
router.put('/posts/:post_id/like', authMiddleWare, async (req, res) => {
  const { post_id } = req.params;
  const { user_id } = res.locals.user;

  try {
    const post = await posts.findOne({ where: { post_id } });
    if (!post) {
      return res
        .status(404)
        .json({ errorMessage: '게시글이 존재하지 않습니다.' });
    }
    const postLiked = await post_likes.findOne({
      where: {
        [Op.and]: [{ Post_id: post_id }, { User_id: user_id }],
      },
    });
    if (postLiked) {
      //좋아요가 존재할 경우
      await postLiked.destroy();
      const countPostLike = await post_likes.findAll({
        where: { Post_id: post_id },
      });
      await posts.update(
        { likes: countPostLike.length },
        {
          where: {
            [Op.and]: [{ post_id }],
          },
        }
      );
      return res
        .status(200)
        .json({ message: `${post.title}의 좋아요를 취소하였습니다.` });
    }
    await post_likes.create({ Post_id: post_id, User_id: user_id });

    const countPostLike = await post_likes.findAll({
      where: { Post_id: post_id },
    });
    await posts.update(
      { likes: countPostLike.length },
      {
        where: {
          [Op.and]: [{ post_id }],
        },
      }
    );

    res.json({ message: `${post.title}의 좋아요를 등록하였습니다.` });
  } catch (error) {
    return res.status(500).json({ errorMessage: '좋아요에 실패하였습니다.' });
  }
});

//좋아요 게시글 조회 API
router.get('/like/posts', authMiddleWare, async (req, res) => {
  try {
    //게시글중 좋아요가 0초과인 것의 게시글만
    const post = await posts.findAll({
      attributes: [
        'post_id',
        'User_id',
        'nickname',
        'title',
        'likes',
        'createdAt',
        'updatedAt',
      ],
      where: { likes: { [Op.gt]: 0 } },
    });
    res.json({ posts: post });
  } catch (error) {
    return res
      .status(500)
      .json({ errorMessage: '좋아요 게시글 조회에 실패하였습니다.' });
  }
});

module.exports = router;
