const jwt = require('jsonwebtoken');

exports.login = (username, password) => {
  const users = [
    { id: 1, username: '이승탁', password: '1111' },
    { id: 2, username: '김철호', password: '2222' }
  ];
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return null;
  }
  return jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};