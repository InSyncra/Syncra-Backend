import express from "express";
import cors from "cors";
import prisma from "../utils/lib/prisma";

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.post("/users", async (req, res) => {
  const { name, email, password } = req.body;

  const authenticatedUser = await createUserWithEmailAndPassword(auth, email, password);

  if (authenticatedUser) {
    const newUser = await prisma.user.create({
      data: {
        id: authenticatedUser.uid,
        email: email,
        name: name
      }
    })

    return res.json(newUser)

  }

})
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
