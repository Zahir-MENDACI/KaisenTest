const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const router = express.Router();
const ObjectID = require('mongoose').Types.ObjectId;

const User = require("../models/usersModel");

/**
 * @method - POST
 * @param - /signup
 * @description - User SignUp
 */

router.post(
  "/signup",
  [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({
      min: 6
    })
  ],
  async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await User.create({email, password });
    res.status(201).json({ user: user._id});
  }
  catch(err) {
    console.log(err)
    res.status(200)
  }
}
);

router.post(
  "/login",
  [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({
        email
      });
      if (!user)
        return res.status(400).json({
          message: "User Not Exist"
        });

      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch)
        return res.status(400).json(
            {user: user._id}
          );
      else
        return res.status(400).json({
          message: "Incorrect Password !"
        });
    } catch (e) {
      console.error(e);
      res.status(500).json({
        message: "Server Error"
      });
    }
  }
);


router.delete('/:id', (req, res) => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);
  
    User.findByIdAndRemove(req.params.id, (err, docs) => {
      if (!err) res.send(docs);
      else console.log("Delete error : " + err);
    });
  });

router.get('/', (req, res) => {
    User.find((err, docs) => {
      if (!err) res.send(docs);
      else console.log("Error to get data : " + err);
    })
  });



  
module.exports = router;
