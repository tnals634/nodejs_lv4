const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const { users } = require('../models');

//회원가입 API
router.post('/signup', async (req, res) => {
  const { nickname, password, confirmPassword } = req.body;
  const isExistUser = await users.findOne({
    where: {
      nickname: nickname,
    },
  });
  //데이터 형식이 맞는지 검사
  const scriptTag = /[~!@#\$%\^&\*\(\)_\+\-={}\[\];:<>,\.\/\?\"\'\/\|\\]/; // 특수문자들
  const validationNickname = /^([a-z]|[A-Z]|[0-9]).{3,20}$/;
  const validationPassword = /^([a-zA-Z]|[0-9]|[!@#$%^*+=-]).{3,20}$/;
  try {
    //작성한 닉네임이 이미 존재할 경우
    if (isExistUser) {
      return res.status(409).json({ errorMessage: '중복된 닉네임입니다.' });
    }

    //body값에서 하나라도 작성을 안한 경우
    else if (!nickname || !password || !confirmPassword) {
      return res.status(400).json({
        errorMessage: '닉네임, 비밀번호, 비밀번호 확인을 확인해주세요.',
      });
    }

    // 닉네임의 형식이 안맞거나 특수문자가 있는 경우
    else if (
      validationNickname.test(nickname) === false ||
      scriptTag.test(nickname === true)
    ) {
      return res
        .status(400)
        .json({ errorMessage: '닉네임 형식이 일치하지 않습니다.' });
    }

    // 비밀번호 형식이 안맞을 경우
    else if (validationPassword.test(password) === false) {
      return res
        .status(400)
        .json({ errorMessage: '비밀번호 형식이 일치하지 않습니다.' });
    }

    //작성한 비밀번호와 비밀번호 확인이 일치하지 않을경우
    else if (password != confirmPassword) {
      return res
        .status(412)
        .json({ errorMessage: '패스워드가 일치하지 않습니다.' });
    }

    //users 생성
    await users.create({ nickname, password });

    return res.status(201).json({ message: '회원 가입에 성공하였습니다.' });
  } catch (error) {
    return res.status(500).json({ errorMessage: '회원가입에 실패하였습니다.' });
  }
});

module.exports = router;
