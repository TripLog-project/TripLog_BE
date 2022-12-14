const express = require('express');

const router = express.Router();

const mongoDB = require('../controllers/api');

// 전체 데이터 저장(POST)
router.post('/1', async (req, res) => {
  const data = await mongoDB.postAlldata(req.body);
  res.send(JSON.stringify(data));
});

// contentid, like 저장(POST)
router.post('/2', async (req, res) => {
  const data = await mongoDB.postEtcdata(req.body);
  res.send(JSON.stringify(data));
});

module.exports = router;
