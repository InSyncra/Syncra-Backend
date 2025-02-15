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

// update user account
userRoutes.patch("/account/:id", async (req, res) => {
    const { id } = req.params;
    const userId = parseInt(id);

    // Validate that id is a number
    if (isNaN(userId)) {
        return res.status(400).json({ error: "Invalid user ID" });
    }

    try {
        // Check if the user exists
        const existingUser = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!existingUser) {
            return res.status(404).json({ error: "User not found" });
        }

        // Extract only the fields that are provided in the request body
        const updateData = {};
        for (const key in req.body) {
            if (req.body[key] !== undefined) {
                updateData[key] = req.body[key];
            }
        }

        // If no valid fields are provided, return an error
        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({ error: "No valid fields provided for update" });
        }

        // Update the user in the database with only the provided fields
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: updateData,
        });

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ error: "An error occurred while updating the user account" });
    }
});



