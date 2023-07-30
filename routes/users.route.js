const express = require("express");
const UserModel = require("../models/user.model");
const InfoModel = require("../models/information.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRoute = express.Router();

userRoute.post("/register", async (req, res) => {
  const payload = req.body;
  try {
    const User = await UserModel.findOne({ email: payload.email });

    if (User) {
      res.status(200).send({ message: "Email already exists" });
    } else {
      bcrypt.hash(payload.password, 3, async function (err, hash) {
        if (err) {
          res.status(400).send({ error: err.message });
        } else {
          const newUser = new UserModel({ ...payload, password: hash });
          await newUser.save();
          const samePerson = await UserModel.findOne({ email: payload.email });
          const newInfo = new InfoModel({
            age: null,
            city: null,
            contact: null,
            user: samePerson._id,
          });
          await newInfo.save();
          res.status(200).send({ message: "User registered successfully" });
        }
      });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

userRoute.post("/login", async (req, res) => {
  const payload = req.body;
  try {
    const User = await UserModel.findOne({ email: payload.email });

    if (User) {
      bcrypt.compare(payload.password, User.password, function (err, result) {
        if (err) {
          res.status(400).send({ error: err.message });
        } else {
          res.status(200).send({
            message: "Login successful",
            token: jwt.sign(
              {
                user: User._id,
              },
              "guviAssignment",
              { expiresIn: "1h" }
            ),
          });
        }
      });
    } else {
      res.status(400).send({ message: "User not found" });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

module.exports = userRoute;
