const express = require("express");
const data = require("../data.json");
const fs = require("fs");
const User = require("../models/user.model");

const {
  getFileWebData,
  getFileJsonData,
  getDBWebData,
  getDBJsonData,
  getUserByIdFromDB,
  getUserByIdFromFile,
  createDbUser,
  createFileUSer,
} = require("../controller/user.controllers.js");
const router = express.Router();

router
  .get("/file/web", getFileWebData)
  .get("/file", getFileJsonData)
  .get("/db/web", getDBWebData)
  .get("/db", getDBJsonData);

router.get("/file/:id", getUserByIdFromFile).get("/db/:id", getUserByIdFromDB);

router.post("/db", createDbUser).post("/file", createFileUSer);

router
  .put("/file/:id", (req, res) => {
    const id = Number(req.params.id);
    const updated_user = req.body;

    fs.readFile("./data.json", (err, data) => {
      let new_data = JSON.parse(data);
      const updated_data = new_data.filter(
        (item) => Number(id) !== Number(item._id)
      );
      updated_data.push({ ...updated_user, _id: Number(id) });
      fs.writeFile("./data.json", JSON.stringify(updated_data), (err, data) => {
        return res.send({ status: "Completed" });
      });
    });
  })
  .put("/db/:id", async (req, res) => {
    const id = req.params.id;
    await User.findByIdAndUpdate(id, req.body);
    return res.send({ status: "Completed" });
  });

router
  .patch("/file/:id", (req, res) => {
    const id = Number(req.params.id);
    const updated_field = req.body;

    fs.readFile("./data.json", (err, data) => {
      let new_data = JSON.parse(data);
      const updated_record = new_data.find((item) => id === item._id);
      const updated_data = new_data.filter(
        (item) => Number(id) !== Number(item._id)
      );
      updated_data.push({ ...updated_record, ...updated_field });
      fs.writeFile("./data.json", JSON.stringify(updated_data), (err, data) => {
        return res.send({ status: "Completed" });
      });
    });
  })
  .patch("/db/:id", async (req, res) => {
    const id = req.params.id;
    await User.findByIdAndUpdate(id, req.body);
    return res.send({ status: "Completed" });
  });

router
  .delete("/file/:id", (req, res) => {
    const id = Number(req.params.id);
    fs.readFile("./data.json", (err, data) => {
      data = JSON.parse(data);
      const updated_data = data.filter(
        (item) => Number(id) !== Number(item._id)
      );
      fs.writeFile("./data.json", JSON.stringify(updated_data), (err, data) => {
        return res.send({ status: "Completed" });
      });
    });
  })
  .delete("/db/:id", async (req, res) => {
    console.log(req.params.id);
    await User.findByIdAndDelete(req.params.id);
    return res.send({ status: "Completed" });
  });

module.exports = router;
