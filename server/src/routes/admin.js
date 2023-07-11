const express = require("express");
const adminSchema = require("../models/admin");

const router = express.Router();

// create admin
router.post("/", (req, res) => {
  const { name, password, setAccess } = req.body;

  if (!name) return res.status(400).json({ message: `Se require Name` })
  if (!password) return res.status(400).json({ message: `Se require password` })
  if (!setAccess) return res.status(400).json({ message: `Se require setAccess` })

  const createAdmin = new adminSchema({
    name,
    password,
    setAccess,
  })

  createAdmin
    .save()
    .then((admin) => {
        res.status(200).json({ message: 'Creado con exito', admin })
    })
    .catch((error) => res.status(500).json({ message: error }));
});

//get all admin
router.get("/", (req, res) => {
  const admin = adminSchema;
  admin
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// put admin
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, password, setAccess } = req.body;
  adminSchema
    .updateOne({ _id: id }, { $set: { name, password, setAccess } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// delete admin by id
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  adminSchema
    .deleteOne({ _id: id })
    .then((data) => {
      res.status(200).json({ message: 'Admin Eliminado!', data })
    })
    .catch((error) => res.json({ message: error }));
});

module.exports = router;
