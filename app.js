import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import express from "express";
const app = express();
app.use(express.json());

// Create a new user
app.post("/users", async (req, res) => {
    const { name, email } = req.body;
    try {
        const user = await prisma.users.create({
            data: {
                name,
                email,
            },
        });
        res.status(201).send("User created successfully");
    } catch (err) {
        console.error("Error creating user", err);
        res.status(500).send("Error creating user");
    }
});

// Get all users
app.get("/users", async (req, res) => {
    try {
        const users = await prisma.users.findMany();
        res.status(200).json(users);
    } catch (err) {
        console.error("Error getting users", err);
        res.status(500).send("Error getting users");
    }
});

// Get a specific user by ID
app.get("/users/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const user = await prisma.users.findUnique({
            where: {
                id,
            },
        });
        if (!user) {
            res.status(404).send("User not found");
        } else {
            res.status(200).json(user);
        }
    } catch (err) {
        console.error("Error getting user", err);
        res.status(500).send("Error getting user");
    }
});

// Update a specific user by ID
app.put("/users/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email } = req.body;
    try {
        const user = await prisma.users.update({
            where: {
                id,
            },
            data: {
                name,
                email,
            },
        });
        if (!user) {
            res.status(404).send("User not found");
        } else {
            res.status(200).send("User updated successfully");
        }
    } catch (err) {
        console.error("Error updating user", err);
        res.status(500).send("Error updating user");
    }
});

// Delete a specific user by ID
app.delete("/users/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const user = await prisma.users.delete({
            where: {
                id,
            },
        });
        if (!user) {
            res.status(404).send("User not found");
        } else {
            res.status(200).send("User deleted successfully");
        }
    } catch (err) {
        console.error("Error deleting user", err);
        res.status(500).send("Error deleting user");
    }
});

// Start the server
app.listen(3000, () => {
    console.log("Server listening on port 3000");
});