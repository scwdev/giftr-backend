const router = require("express").Router();
const db = require("../db/connection");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SECRET = "secret" } = process.env;

const Group = require("../models/Group");

// SIGN UP route to create a new group
router.post("/signup", async (req, res) => {
  try {
    // hash the password
    req.body.password = await bcrypt.hash(req.body.password, 10);
    // create a new group
    const group = await Group.create(req.body);
    if (group) {
      //check if pw matches
      const result = await bcrypt.compare(req.body.password, group.password);
      if (result) {
        // sign token and send it in response
        const token = await jwt.sign({ groupName: group.groupName }, SECRET);
        res.json({ token, group });
      }
      // send new group as response
      res.status(200).json(group);
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});

// Login route to verify a group and get a token
router.post("/login", async (req, res) => {
  try {
    // check if the group exists
    const group = await Group.findOne({ groupName: req.body.groupName });
    if (group) {
      //check if password matches
      const result = await bcrypt.compare(req.body.password, group.password);
      if (result) {
        // sign token and send it in response
        const token = await jwt.sign({ groupName: group.groupName }, SECRET);
        res.json({ token, group });
      } else {
        res.status(400).json({ error: "password doesn't match" });
      }
    } else {
      res.status(400).json({ error: "Group doesn't exist" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});

// log out route destroys token // untested
router.put("/:id/delete", async (req, res) => {
  try {
    const id = req.params.id;
    const token = null;
    const updatedGroup = { ...req.body, token };
    const loggedOut = Group.findByIdAndUpdate(id, updatedGroup, { new: true });
    res.status(200).json(loggedOut);
  } catch (err) {
    res.status(400).json({ error: error.message });
  }
});

// update route to add more members // untested
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedMember = req.body;
    console.log(req.body);
    const updatedGroup = Group.findByIdAndUpdate(id, updatedMember, {
      new: true,
    });
    res.status(200).json(updatedGroup);
  } catch (err) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
