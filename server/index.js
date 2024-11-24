require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const router= require('./routes/route')
const PORT = process.env.PORT

require("./model/db");

// Middleware
app.use(cors(
  {
    
    origin: "*",
    credentials: true
  }
));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 


app.use(router)


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
