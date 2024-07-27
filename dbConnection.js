const mongoose = require("mongoose");

const DB_Connect = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      "mongodb+srv://jd007:Jenish123@jdcluster.pwzpa4h.mongodb.net/demoDB"
    );
    console.log("Mongo DB Connected:", connectionInstance.connection.host);
  } catch (error) {
    console.log("Mongo DB Connection Error:", error);
    process.exit(1);
  }
};

module.exports = { DB_Connect };
