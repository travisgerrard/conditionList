import express from 'express';
const router = new express.Router();
const Condition = require('mongoose').model('Condition');
import authenticate from '../middleware/authenticate';


router.get('/', authenticate, (req, res) => {
  const filter = { catagory: req.query.specialty};
  console.log(filter);
  Condition.find(filter).exec((err, docs) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ errors: {global: "something went wrong"} });
      }
      return res.status(200).json(docs);
    });
});

router.post('/', authenticate, (req, res) => {
  var disease = Condition(req.body);
  disease.save((err, docs) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ errors: {global: "something went wrong"} });
    }
    return res.status(200).json(docs);
  });
});

router.post('/:_id', authenticate, (req, res) => {
  var id = req.params._id;
  var disease = req.body;
  Condition.findByIdAndUpdate(id, disease, {new: true}, function(err, docs) {
    if (err) {
      console.error(err);
      return res.status(500).json({ errors: {global: "something went wrong"} });
    }
    return res.status(200).json(docs);
  })

});

module.exports = router;
