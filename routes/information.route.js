const express = require("express");
const InfoModel = require("../models/information.model");
const authorizeMiddleware = require("../middlewares/authorize.middleware");
const infoRoute = express.Router();

infoRoute.get("/", authorizeMiddleware, async (req, res) => {
  const payload = req.body;
  try {
    const data = await InfoModel.find({ user: payload.user });
    res.status(200).send(data);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

infoRoute.patch("/update/:_id", authorizeMiddleware, async (req, res) => {
  const payload = req.body;
  const { _id } = req.params;
  try {
    await InfoModel.findByIdAndUpdate({ _id }, payload);
    res.status(200).send({ message: "Information updated successfully" });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

module.exports = infoRoute;
