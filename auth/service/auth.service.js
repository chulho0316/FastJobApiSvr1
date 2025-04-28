const jwt   = require('jsonwebtoken');
const db    = require('@db');
const query = require('@query');

const ACCESS_SECRET  = process.env.ACCESS_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;

exports.login = async (userId, password) => {
  try {
    const { rows } = await db.query(query.login, [userId]);
    const user = rows[0];
    if (!user || user.password !== password) {
      return null;
    }

    const accessToken  = jwt.sign({ id: user.id, userId: user.user_id }, ACCESS_SECRET,  { expiresIn: '15m' });
    const refreshToken = jwt.sign({ id: user.id, userId: user.user_id }, REFRESH_SECRET, { expiresIn: '7d' });

    await db.query(query.loginSuccess, [accessToken, refreshToken, user.user_id]);

    return { accessToken, refreshToken };
  } catch (err) {
    console.error('[auth.service.login ERROR]', err);
    throw err;
  }
};