const mongoClient = require('../routes/mongo');

const _client = mongoClient.connect();

const likeDB = {
  likeIncPlus: async (data) => {
    const client = await _client;
    
    const reviewData = client.db('triplog').collection(`${data.region}`);
    const likePlus = await reviewData.updateOne(
      { contentid: data.contentid },
      { $inc: { like: +1 } }
    );

    const likeData = client.db('triplog').collection('contentid');
    const likeInc =  await likeData.updateOne(
      { contentid: data.contentid },
      { $inc: { like: +1 } }
    )
    const likeUserUpdata = await likeData.updateOne(
      { contentid: data.contentid },
      { $push: { likeuser: data.nickName } }
    );

    if (likePlus.acknowledged && likeUserUpdata.acknowledged && likeInc.acknowledged) {
      return likePlus;
    } else {
      throw new Error('통신 이상');
    }
  },

  likeIncMinus: async (data) => {
    const client = await _client;
    
    const reviewData = client.db('triplog').collection(`${data.region}`);
    const likePlus = await reviewData.updateOne(
      { contentid: data.contentid },
      { $inc: { like: -1 } }
    );

    const likeData = client.db('triplog').collection('contentid');
    const likeInc =  await likeData.updateOne(
      { contentid: data.contentid },
      { $inc: { like: -1 } }
    )
    const likeUserUpdata = await likeData.updateOne(
      { contentid: data.contentid },
      { $pull: { likeuser: data.nickName } }
    );

    if (likePlus.acknowledged && likeUserUpdata.acknowledged && likeInc.acknowledged) {
      return likePlus;
    } else {
      throw new Error('통신 이상');
    }
  },

  // setData
  setData: async () => {
    const client = await _client;
    const db = client.db('triplog').collection('likes');
    const result = await db.insertOne(init);
    if (result.acknowledged) {
      return '업데이트 성공';
    } else {
      throw new Error('통신 이상');
    }
  },
  // 사용자의 좋아요 항목 가져오기
  getLikes: async ({ nickName }) => {
    const client = await _client;
    const db = client.db('triplog').collection('likes');
    const data = await db.findOne({ nickName: nickName });
    if (data === null) {
      const insertRes = await db.insertOne({
        nickName: nickName,
        likes: [],
      });
      if (insertRes.acknowledged) {
        return insertRes;
      } else {
        throw new Error('통신 이상');
      }
    } else {
      return data;
    }
  },
  // 좋아요 아이템 추가
  arrLike: async (like) => {
    console.log('like', like);
    const client = await _client;
    const db = client.db('triplog').collection('likes');
    const result = await db.updateOne(
      { nickName: like.nickName },
      { $set: { likes: like.newLike } }
    );
    if (result.acknowledged) {
      return like;
    } else {
      throw new Error('통신 이상');
    }
  },
};

module.exports = likeDB;
