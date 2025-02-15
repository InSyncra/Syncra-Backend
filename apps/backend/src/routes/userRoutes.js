import { Router } from "express";
import { prisma } from "@repo/db";

const userRoutes = Router();

// create a new user
userRoutes.post("/signup", async (req, res) => {
    // get the user data from the request body
    const {
        firstName,
        lastName,
        nickname,
        username,
        email,
        password,
        birthdate,
        profession,
        skillLevel,
        avatar,
        bio,
        githubUrl,
        pastProjectsLinks,
        projects,
    } = req.body;

    // try catch block to handle errors
    try {
        // hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);
        // create a new user in the database
        const user = await prisma.user.create({
            data: {
                firstName,
                lastName,
                nickname,
                username,
                email,
                password: hashedPassword,
                birthdate,
                profession,
                skillLevel,
                avatar,
                bio,
                githubUrl,
                pastProjectsLinks,
                projects,
            },
        });
        // send the user data as a response
        res.json(user);
    }
    // catch any errors and send a 500 status code with an error message
    catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while creating the user");
    }

});

// get user account
userRoutes.get("/account/:id", async (req, res) => {
    // get the user id from the request parameters
    const { id } = req.params;

    // try catch block to handle errors
    try {
        // get the user from the db
        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(id),
            },
        })
        // if the user is not found, send a 404 status code
        if (!user) {
            res.status(404).send("User not found");
            return;
        }
        // respond with the user data
        res.json(user);
    } catch(error) {
        console.error(error);
        res.status(500).send("An error occurred while getting the user account");

    }
})
