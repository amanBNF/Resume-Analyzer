// require("dotenv").config()
// const app = require("./src/app")
// const connectToDB = require("./src/config/database")

// connectToDB()

// app.get("/", (req, res) => {
//     res.send("Hello World")
// })

// app.listen(3000, () => {
//     console.log("Server is running on port 3000")
// })

require("dotenv").config();

const app = require("./src/app");
const connectToDB = require("./src/config/database");

// connect DB
connectToDB();

// test route
app.get("/", (req, res) => {
  res.send("Hello World");
});

// ✅ export instead of listen
module.exports = app;