require("dotenv").config();
require("./db/connection");
const express = require("express");
const rowdy = require("rowdy-logger");
const morgan = require("morgan");
const cors = require("cors");

//App Variables
const PORT = process.env.PORT || 4000;
const app = express();
const rowdyResults = rowdy.begin(app);

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Controllers
const groupRouter = require("./controllers/group");
const itemRouter = require("./controllers/item");

// Routes
app.get("/", (req, res) => {
  res.json({ msg: "Back end server for Giftr!" });
});
app.use("/group", groupRouter);
app.use("/item", itemRouter);

// Start the server
app.listen(PORT, () => {
  rowdyResults.print();
  console.log(`🌊 Server listening on port ${PORT}`);
});
