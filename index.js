require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const AuthRoute = require("./Routes/AuthRoute");
const ProductRoute = require("./Routes/ProductRoute");
const OrderRoute = require("./Routes/OrderRoute");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err));
const app = express();
app.use(cors());
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
app.use("/", AuthRoute);
app.use("/", ProductRoute);
app.use("/", OrderRoute)
app.listen(process.env.PORT, () => console.log("SERVER IS RUNNING"));
