const User = require("../models/user.model.js");
const data = require("../data.json");
const fs = require("fs");

function getFileWebData(req, res) {
  try {
    fs.readFile("./data.json", (err, data) => {
      const html = JSON.parse(data)
        .map((item) => {
          return `<li>${item._id} - ${item.full_name.first_name}</li>`;
        })
        .join("");
      return res.send(html);
    });
  } catch (error) {
    return res.send({ status: "Error", message: error.message });
  }
}

function getFileJsonData(req, res) {
  try {
    fs.readFile("./data.json", (err, data) => {
      return res.json(JSON.parse(data));
    });
  } catch (error) {
    return res.send({ status: "Error", message: error.message });
  }
}

async function getDBWebData(req, res) {
  const allUsers = await User.find({});
  // console.log(allUsers);
  const html = `<ul>
  ${allUsers
    .map((item) => {
      return `<li>${item.firstName} - ${item.jobTytle}</li>`;
    })
    .join("")}
 </ul>`;
  return res.send(html);
}

async function getDBJsonData(req, res) {
  try {
    const allUsers = await User.find({});
    console.log(allUsers);
    return res.json(allUsers);
  } catch (error) {
    return res.send({ status: "Error", message: error.message });
  }
}

function getUserByIdFromFile(req, res) {
  fs.readFile("./data.json", (err, data) => {
    const new_data = JSON.parse(data);
    const id = Number(req.params.id);
    const user = new_data.find((item) => id === item._id);
    return res.json(user);
  });
}

async function getUserByIdFromDB(req, res) {
  const user = await User.findById(req.params.id);
  return res.json(user);
}

async function createDbUser(req, res) {
  const new_data = req.body;
  if (
    !req.body ||
    !new_data.firstName ||
    !new_data.email ||
    !new_data.lastName ||
    !new_data.jobTytle ||
    !new_data.age ||
    !new_data.gender
  ) {
    return res.send({
      status: "Failed",
      message: "Please fill all the fields",
    });
  } else {
    const result = await User.create(new_data);
    console.log(result);
    return res.send({ status: "Completed", result });
  }
}

function createFileUSer(req, res) {
  console.log(req.body);
  fs.readFile("./data.json", (err, data) => {
    const new_data = JSON.parse(data);
    new_data.push({ ...req.body, _id: new_data.length });
    fs.writeFile("./data.json", JSON.stringify(new_data), (errlog, datalog) => {
      return res.send({ status: "Completed" });
    });
  });
}

module.exports = {
  getFileWebData,
  getFileJsonData,
  getDBWebData,
  getDBJsonData,
  getUserByIdFromFile,
  getUserByIdFromDB,
  createDbUser,
  createFileUSer,
};
