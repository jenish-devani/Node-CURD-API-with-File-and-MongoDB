const express = require("express");

const {
  getFileWebData,
  getFileJsonData,
  getDBWebData,
  getDBJsonData,
  getUserByIdFromDB,
  getUserByIdFromFile,
  createDbUser,
  createFileUSer,
  deleteFileUser,
  deleteDbUser,
} = require("../controller/user.controllers.js");
const router = express.Router();

router
  .get("/file/web", getFileWebData)
  .get("/file", getFileJsonData)
  .get("/db/web", getDBWebData)
  .get("/db", getDBJsonData);

router.get("/file/:id", getUserByIdFromFile).get("/db/:id", getUserByIdFromDB);

router.post("/db", createDbUser).post("/file", createFileUSer);

router.delete("/file/:id", deleteFileUser).delete("/db/:id", deleteDbUser);

router
  .put("/file/:id", (req, res) => {
    const id = Number(req.params.id);
    const updated_user = req.body;
    const updated_data = data.filter((item) => Number(id) !== Number(item._id));
    updated_data.push({ ...updated_user, _id: Number(id) });
    fs.writeFile("./data.json", JSON.stringify(updated_data), (err, data) => {
      return res.send({ status: "Completed" });
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
    console.log(updated_field);
    const updated_record = data.find((item) => id === item._id);
    const new_data = data.filter((item) => id !== item._id);
    new_data.push({ ...updated_record, ...updated_field });
    fs.writeFile("./data.json", JSON.stringify(new_data), (err, data) => {
      return res.send({ status: "Completed" });
    });
  })
  .patch("/db/:id", async (req, res) => {
    const id = req.params.id;
    await User.findByIdAndUpdate(id, req.body);
    return res.send({ status: "Completed" });
  });

module.exports = router;
