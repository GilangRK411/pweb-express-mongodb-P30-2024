const mongoose = require('mongoose');
const uri = "mongodb://gilangraya869:1oNardSEpLj2Ffc2@gilangrk-shard-00-00.5zron.mongodb.net:27017,gilangrk-shard-00-01.5zron.mongodb.net:27017,gilangrk-shard-00-02.5zron.mongodb.net:27017/?ssl=true&replicaSet=atlas-er76vw-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Gilangrk";

export const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  }
};