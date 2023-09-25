const express = require("express");
require("dotenv").config();
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());

const PORT = 8080;
