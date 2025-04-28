const { json }    = require('express');
const LoginDTO    = require('@auth_dto');
const authService = require('@auth_service');

exports.login = async (req, res, next) => {
  try {
    const { userId, password } = LoginDTO.isValid(req.body);
    const tokens = await authService.login(userId, password);
    if (!tokens) {
      return res.status(401).json({ success: false, message: '잘못된 아이디/비밀번호입니다.' });
    }
    res.json({ success: true, data: tokens });
  } catch (err) {
    if (err.message.includes('userId') || err.message.includes('password')) {
      return res.status(400).json({ success: false, message: err.message });
    }
    next(err);
  }
};