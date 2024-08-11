import express from "express";
import cors from "cors";
// import prisma from "../utils/lib/prisma";

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  res.send("This is the backend server!");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
