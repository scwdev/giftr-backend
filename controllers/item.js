const { Router } = require("express"); // import Router from express
const Item = require("../models/Item"); // import model
const { isLoggedIn } = require("./jwtMiddleware"); // import isLoggedIn custom middleware

const router = Router();

// Index Route with isLoggedIn middleware
router.get("/", isLoggedIn, async (req, res) => {
  const { groupName } = req.group;
  res.json(
    await Item.find({ groupName }).catch((error) =>
      res.status(400).json({ error })
    )
  );
});

// Show Route with isLoggedIn middleware
router.get("/:id", isLoggedIn, async (req, res) => {
  const { groupName } = req.group; // get groupName from req.group property created by isLoggedIn middleware
  const _id = req.params.id; // get id from params
  //send target item
  res.json(
    await Item.findOne({ groupName, _id }).catch((error) =>
      res.status(400).json({ error })
    )
  );
});

// create Route with isLoggedIn middleware
router.post("/", isLoggedIn, async (req, res) => {
  const { groupName } = req.group; // get groupName from req.group property created by isLoggedIn middleware
  // console.log(groupName)
  req.body.groupName = groupName; // add groupName property to req.body
  //create new Item and send it in response
  res.json(
    await Item.create(req.body).catch((error) =>
      res.status(400).json({ error })
    )
  );
});

// update Route with isLoggedIn middleware
router.put("/:id", isLoggedIn, async (req, res) => {
  const { groupName } = req.group; // get groupName from req.group property created by isLoggedIn middleware
  req.body.groupName = groupName; // add groupName property to req.body
  const _id = req.params.id;
  //update Item with same id if belongs to logged in group
  res.json(
    await Item.updateOne({ groupName, _id }, req.body, {
      new: true,
    }).catch((error) => res.status(400).json({ error }))
  );
});

// update Route with isLoggedIn middleware
router.delete("/:id", isLoggedIn, async (req, res) => {
  const { groupName } = req.group; // get groupName from req.group property created by isLoggedIn middleware
  const _id = req.params.id;
  //remove Item with same id if belongs to logged in group
  res.json(
    await Item.remove({ groupName, _id }).catch((error) =>
      res.status(400).json({ error })
    )
  );
});

module.exports = router;
