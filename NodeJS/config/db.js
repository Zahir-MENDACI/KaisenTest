const mongoose = require("mongoose");

// mongoose
//   .connect(
//     `mongodb+srv://zahir:${process.env.DB_USER_PASS}@cluster0.p2anx.mongodb.net/reseau-social`,
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       useCreateIndex: true,
//       useFindAndModify: false
//     }
//   )
//   .then(() => console.log("Connected to mongoDB"))
//   .catch((err) => console.log("Failed to connect ", err));

mongoose
  .connect(
    `mongodb://localhost:27017/kaisenTest`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    },
    (err) =>
    {
        if(!err) console.log("MongoDB connected")
        else console.log("Connection erro:", err)
    }
  )
