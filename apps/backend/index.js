const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const router = require("./app/routers");
const app = express();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100000, 
  standardHeaders: true, 
  legacyHeaders: false, 
});
app.use(limiter);

app.use(express.urlencoded({ extended: true })); 
app.use(express.json()); 


app.use(express.static("public"));
app.use("/api", cors({ 
  origin: "*" 
}), router);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
