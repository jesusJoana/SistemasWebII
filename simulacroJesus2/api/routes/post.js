const express = require('express');
const router = express.Router();
const dbo = require('../db/conn');
const ObjectId = require('mongodb').ObjectId;
const COLLECTION = 'posts';
const DEFAULT_LIMIT = parseInt(process.env.MAX_RESULTS);

// getPosts()
router.get('/', async (req, res) => {
  const dbConnect = dbo.getDb();
  const limit = parseInt(req.query.limit) || DEFAULT_LIMIT;
  const skip = parseInt(req.query.skip) || 0;
  const tag = req.query.tag;

  let query = {};
  if (tag) {
    query = { tags: tag };
  }

  const results = await dbConnect
    .collection(COLLECTION)
    .find(query)
    .project({title:1, author:1, createdAt:1})
    .sort({ createdAt: 1 })
    .skip(skip)
    .limit(limit)
    .toArray();

  res.json({ results, count: results.length }).status(200);
});

// getLatestPosts()
router.get('/latest', async (req, res) => {
  const dbConnect = dbo.getDb();
  const results = await dbConnect
    .collection(COLLECTION)
    .find({})
    .project({ title: 1, author: 1, createdAt: 1})
    .sort({ createdAt: -1 })
    .limit(3)
    .toArray();

  res.status(200).send(results);
});

// getStats()
router.get('/stats/authors', async (req, res) => {
  const dbConnect = dbo.getDb();
  const pipeline = [
    { $group: { _id: '$author', posts: { $sum: 1 }, totalLikes: { $sum: 1 } } }, 
    {$project:{_id:0, author:"$_id", posts:1, totalLikes:'$likes' } }
  ];

  const results = await dbConnect
    .collection(COLLECTION)
    .aggregate(pipeline)
    .toArray();

  if (!result) {
    res.status(404).send('Not found');
  } else {
    res.status(200).send(result);
  }
});

// getPostById()
router.get('/:id', async (req, res) => {
  const dbConnect = dbo.getDb();
  const query = { _id: new ObjectId(req.params.id) };
  const result = await dbConnect
    .collection(COLLECTION)
    .findOne(query);

    res.status(200).send(result);
});

// addComment()
router.post('/:id/comments', async (req, res) => {
  const dbConnect = dbo.getDb();
  const query = { _id: req.params.id };
  const update = {
    $set: { comments: req.body }
  };

  const result = await dbConnect
    .collection(COLLECTION)
    .updateOne(query, update);

  res.status(200).send(result);
});

// likePost()
router.patch('/:id/likes', async (req, res) => {
  const dbConnect = dbo.getDb();
  const query = { _id: new ObjectId(req.params.id) };
  const result = await dbConnect
    .collection(COLLECTION)
    .updateOne(query, { $inc: { likes: 1 } });

  if (result.matchedCount === 0) {
    res.status(404).send('Post not found');
  } else {
    res.status(200).send(result);
  }
});

// deletePost()
router.delete('/:id', async (req, res) => {
  const dbConnect = dbo.getDb();
  const query = { _id: new ObjectId(req.params.id) };
  const result = await dbConnect
    .collection(COLLECTION)
    .deleteOne(query);

  res.status(200).send(result);

});

module.exports = router;
