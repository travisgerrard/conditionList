import express from 'express';
const router = new express.Router();
const Condition = require('mongoose').model('Condition');

router.get('/', (req, res) => {
  Condition.find().exec((err, docs) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ errors: {global: "something went wrong"} });
      }
      return res.status(200).json(docs);
    });
});

router.post('/', (req, res) => {
  var disease = Condition(req.body);
  disease.save((err, docs) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ errors: {global: "something went wrong"} });
    }
    return res.status(200).json(docs);
  });
});

router.post('/:_id', (req, res) => {
  var id = req.params._id;
  console.log(req.body);
  var disease = req.body;
  console.log(disease);
  Condition.findByIdAndUpdate(id, disease, {new: true}, function(err, docs) {
    if (err) {
      console.error(err);
      return res.status(500).json({ errors: {global: "something went wrong"} });
    }
    return res.status(200).json(docs);
  })

});

module.exports = router;
