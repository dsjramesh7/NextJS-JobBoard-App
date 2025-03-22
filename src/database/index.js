import * as mongoose from "mongoose";
const connectToDB = async () => {
  const mongodbURL = `mongodb+srv://${USERNAME}:${PASSWORD}@jobboardapp.cl7k7.mongodb.net/`;
  await mongoose
    .connect(mongodbURL)
    .then(() => console.log("Job Board Database is connected successfully"))
    .catch((error) => console.log(error));
};

export default connectToDB;
