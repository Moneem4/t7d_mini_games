require("dotenv").config();
const miniGamesRoute = require("./routes/miniGames");
const express = require("express");
const connectDB = require("./config/connect_db");

const ecsFormat = require("@elastic/ecs-morgan-format");
const morgan = require("morgan");
const path = require("path");

const app = express();
//expose assets subfolders
app.use("/static", express.static(path.join(__dirname, "/assets")));
app.use("/assets", express.static("./assets"));
app.use(express.json());
app.use("/", miniGamesRoute);

app.use(require("body-parser").urlencoded({ extended: true }));
app.use(morgan(ecsFormat({ format: "tiny" })));
const PORT = process.env.PORT || 3000;

connectDB();

app.listen(PORT, () => {
  console.log(`Mini games Server is listning on port ${PORT}`);
});
