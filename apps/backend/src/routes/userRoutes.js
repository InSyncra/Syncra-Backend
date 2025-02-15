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


