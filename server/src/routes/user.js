const express = require("express");
const userSchema = require("../models/user");

const router = express.Router();

//create user demo
router.post("/user", (req, res) => {
  const user = userSchema(req.body);
  user
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;
