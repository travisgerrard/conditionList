import express from 'express';
const router = new express.Router();

router.get('/', (req, res) => {
  res.status(201).json({ success: true });
});

module.exports = router;
