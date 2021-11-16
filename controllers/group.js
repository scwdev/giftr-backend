const router = require('express').Router();
const db = require('../db/connection');
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {SECRET = "secret"} = process.env;

const Group = require("../models/Group");


// SIGN UP route to create a new group
router.post("/signup", async (req, res) => {
    try {
      // hash the password
      req.body.password = await bcrypt.hash(req.body.password, 10);
      // create a new group
      const group = await Group.create(req.body);
      // send new group as response
      res.json(group);
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
          res.json({ token });
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

module.exports = router;