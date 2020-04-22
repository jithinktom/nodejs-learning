var express = require('express');
var router = express.Router();
const User = require('../models/User');

/* GET users listing. */
router.get('/', function (req, res, next) {
  User.find({})
    .then(data => {
      console.log("Data back from database : " + data)
      res.send(data)
    })
    .catch(err => {
      console.log("Error from database: ", err);
      res.status(500).send(err)
    })
});

router.get('/:id', function (req, res, next) {
  User.find({ _id: req.params.id })
    .then(data => {
      console.log("Data back from database : " + data)
      res.send(data)
    })
    .catch(err => {
      console.log("Error from database: ", err);
      res.status(500).send(err)
    })
});

router.post('/', (req, res) => {
  if (!req.body.name)
    return res.status(400).send("Username is required.")
  const user = new User(req.body)

  user.save()
    .then((data) => {
      console.log("Data back from database: ", data);
      res.send(data);
    })
    .catch(err => {
      console.log("Error from database: ", err);
      res.status(500).send(err)
    })
})

router.put('/:id', (req, res) => {
  const newUser = new User(req.body)
  async function findAndUpdateUser(id) {
    try {
      var user = await User.find({ _id: id })
      user = user[0]
      if (user) {
        user.set({
          "role": newUser.role || user.role,
          "name": newUser.name || user.name,
          "age": newUser.age || user.age,
          "gender": newUser.gender || user.gender,
          "salary": newUser.salary || user.salary
        })

        new User(user).save()
          .then((data) => res.send(data))
          .catch(err => res.status(500).send(err))
      }
      else {
        res.status(404).send("User not found with this id.")
      }
    }
    catch (err) {
      return res.status(404).send("User not found with this id.")
    }
  }
  findAndUpdateUser(req.params.id)
})

router.delete('/:id', function (req, res, next) {
  User.deleteOne({ _id: req.params.id })
    .then(data => {
      console.log("Data back from database : " + data)
      res.send(data)
    })
    .catch(err => {
      console.log("Error from database: ", err);
      res.status(500).send(err)
    })
})

module.exports = router;
