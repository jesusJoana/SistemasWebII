const express = require('express');
const router = express.Router();
const dbo = require('../db/conn');
const ObjectId = require('mongodb').ObjectId;
const COLLECTION = 'courses';
const DEFAULT_LIMIT = parseInt(process.env.MAX_RESULTS);

// getCourses()
router.get('/', async (req, res) => {
  const dbConnect = dbo.getDb();
  const limit = parseInt(req.query.limit) || DEFAULT_LIMIT;
  const skip = parseInt(req.query.skip) || 0;
  const skill = req.query.skill;

  let query = {};
  if (skill) {
    query = { skills: [skill] };
  }

  const results = await dbConnect
    .collection(COLLECTION)
    .find(query)
    .sort({ startDate: 1 })
    .skip(skip)
    .limit(limit)
    .toArray();

  res.json({ results }).status(200);
});

// getFeaturedCourses()
router.get('/featured', async (req, res) => {
  const dbConnect = dbo.getDb();
  const results = await dbConnect
    .collection(COLLECTION)
    .find({ active: true })
    .project({ title: 1, teacher: 1, startDate: 1, students: 1 })
    .sort({ enrolled: 1 })
    .limit(3)
    .toArray();

  res.status(200).send(results);
});

// getStatsByLevel()
router.get('/stats/levels', async (req, res) => {
  const dbConnect = dbo.getDb();
  const pipeline = [
    { $group: { _id: '$level', courses: { $sum: 1 } } }
  ];

  const results = await dbConnect
    .collection(COLLECTION)
    .aggregate(pipeline)
    .toArray();

  res.status(200).send(results);
});

// getCourseById()
router.get('/:id', async (req, res) => {
  const dbConnect = dbo.getDb();
  const query = { _id: new ObjectId(req.params.id) };
  const result = await dbConnect
    .collection(COLLECTION)
    .findOne(query);

  if (!result) {
    res.send('Not found').status(404);
  } else {
    res.status(200).send(result);
  }
});

// addStudent()
router.post('/:id/students', async (req, res) => {
  const dbConnect = dbo.getDb();
  const query = { _id: req.params.id };
  const update = {
    $set: { students: req.body }
  };

  const result = await dbConnect
    .collection(COLLECTION)
    .updateOne(query, update);

  res.status(200).send(result);
});

// publishCourse()
router.patch('/:id/publish', async (req, res) => {
  const dbConnect = dbo.getDb();
  const query = { _id: new ObjectId(req.params.id) };
  const result = await dbConnect
    .collection(COLLECTION)
    .updateOne(query, { $set: { active: true } });

  res.status(200).send(result);
});

// deleteCourse()
router.delete('/:id', async (req, res) => {
  const dbConnect = dbo.getDb();
  const query = { _id: new ObjectId(req.params.id) };
  const result = await dbConnect
    .collection(COLLECTION)
    .deleteOne(query);

  res.status(200).send(result);
});

module.exports = router;
