require('dotenv').config();
// const prisma = require("../prisma/prismaClient");
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000 || process.env.PORT;
app.use(express.json());
app.use(cors());

app.use("/api", require("./routes/users"));

app.listen(PORT, async () => {
  console.log(`-> listen on port ${PORT}`);
});
