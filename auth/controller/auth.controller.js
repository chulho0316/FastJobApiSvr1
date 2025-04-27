const authService = require('../service/auth.service');

exports.login = (req, res) => {
    const { username, password } = req.body;

    const token = authService.login(username, password);
    if (!token) {
        return res.status(401).json({ message: '로그인 실패' });
    }
    res.json({ token });
};