const { Router } = require("express"); // import Router from express
const Item = require("../models/Item"); // import model
const { isLoggedIn } = require("./jwtMiddleware"); // import isLoggedIn custom middleware

const router = Router();

// Index Route with isLoggedIn middleware
router.get("/", async (req, res, next) => {
  // const { groupName } = req.group;
  try {
    const foundItems = Item.find();
    res.status(200).json(foundItems);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
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
router.post("/", async (req, res) => {
  try {
    const item = await Item.create(req.body);
    res.status(200).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
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
router.delete("/", async (req, res) => {
  // const { groupName } = req.group; // get groupName from req.group property created by isLoggedIn middleware
  // const _id = req.params.id;
  //remove Item with same id if belongs to logged in group
  try {
    const deletedStuff = await Item.deleteMany({});
    res.status(200).json(deletedStuff);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
