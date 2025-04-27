require('module-alias/register');
require('dotenv').config();

const express  = require('express');
const cluster  = require('cluster');
const os       = require('os');
const cors     = require('cors');
const morgan   = require('morgan');
const helmet   = require('helmet');
const app   = express();
const port  = process.env.PORT || 4000;
const CPU   = 2;
const middleWare = require('@middleware');
const authRouter = require('@auth_router');

app.use(morgan('dev'));
app.use(helmet());
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use('/auth', authRouter);
app.use((req, res, next) => {
  if (req.path === '/auth/login') return next();
  middleWare.verifyToken(req, res, next);
});

if (cluster.isMaster) {
  for (let i = 0; i < CPU; i++) {
    cluster.fork();
  }
} else {
  app.listen(port, () => {
    console.log(`[LOG] - FastJobApiSvr Start at Port: ${port}`);
  });
}

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: '서버 에러 발생' });
});

app.use((req, res) => {
  res.status(404).json({ message: '요청하신 페이지를 찾을 수 없습니다.' });
});
