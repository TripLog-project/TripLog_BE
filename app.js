const express = require('express');

const app = express();

/* dotenv */
require('dotenv').config();

const PORT = 4000;

/* cors */
const cors = require('cors');
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/*
// 데이터 저장하기 위해 전송 데이터 제한해제
app.use(express.json({
  limit : "50mb"
}));
app.use(express.urlencoded({
  limit:"50mb",
  extended: false
}));

// api
const apiRouter = require('./routes/apiRouter');
app.use('/api', apiRouter);
*/

/* image 저장 위치 */
app.use('/uploads', express.static('uploads'));

/* routes */
// plan
const planRouter = require('./routes/planRouter');
app.use('/plan', planRouter);

// review
const reviewRouter = require('./routes/reviewRouter');
app.use('/review', reviewRouter);

// charge
const chargeRouter = require('./routes/chargeRouter');
app.use('/charge', chargeRouter);

// checklist
const checklist = require('./routes/checklistRouter');
app.use('/checklist', checklist);

// detail
const detail = require('./routes/detailRouter');
app.use('/detail', detail);

// user
const user = require('./routes/userRouter');
app.use('/user', user);

// like
const like = require('./routes/likeRouter');
app.use('/like', like);

// list
const list = require('./routes/listRouter');
app.use('/list', list);

// mypage
const mypage = require('./routes/mypageRouter');
app.use('/mypage', mypage);

/* 오류발생 */
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(err.statusCode || 500);
  res.send(err.message);
});

/* start */
app.listen(PORT, () => {
  console.log(`해당 포트는 ${PORT}에서 작동중 입니다.`);
});
