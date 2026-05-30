const express = require('express');
const router = express.Router();
const dbo = require('../db/conn');
const ObjectId = require('mongodb').ObjectId;
const MAX_RESULTS = parseInt(process.env.MAX_RESULTS);
const COLLECTION = 'restaurants';

// getRestaurants()
router.get('/', async (req, res) => {
  let limit = MAX_RESULTS;
  if (req.query.limit) {
    limit = Math.min(parseInt(req.query.limit), MAX_RESULTS);
  }

  let next = req.query.next;
  let query = {};
  if (next) {
    query = { _id: { $lt: new ObjectId(next) } };
  }

  const dbConnect = dbo.getDb();
  let results = await dbConnect
    .collection(COLLECTION)
    .find(query)
    .sort({ _id: -1 })
    .limit(limit)
    .toArray()
    .catch(err => res.status(400).send('Error searching for restaurants'));

  next = results.length == limit ? results[results.length - 1]._id : null;
  res.json({ results, next }).status(200);
});

// getRestaurantById()
router.get('/:id', async (req, res) => {
  const dbConnect = dbo.getDb();
  let query = { _id: new ObjectId(req.params.id) };
  let result = await dbConnect
    .collection(COLLECTION)
    .findOne(query);

  if (!result) {
    res.send('Not found').status(404);
  } else {
    res.status(200).send(result);
  }
});

// addRestaurant()
router.post('/', async (req, res) => {
  const dbConnect = dbo.getDb();
  let result = await dbConnect
    .collection(COLLECTION)
    .insertOne(req.body);

  res.status(200).send(result);
});

// deleteRestaurantById()
router.delete('/:id', async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };
  const dbConnect = dbo.getDb();
  let result = await dbConnect
    .collection(COLLECTION)
    .deleteOne(query);

  res.status(200).send(result);
});

module.exports = router;
