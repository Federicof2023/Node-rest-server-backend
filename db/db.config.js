const mongoose = require("mongoose");

const conectarDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_DB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true,
      // useFindAndModify: false,
    });

    console.log("Connected to DB Mongo");

  } catch (error) {
    console.log(error);
    throw new Error("Error en la base de datos");
  }
};

module.exports = { conectarDb };
