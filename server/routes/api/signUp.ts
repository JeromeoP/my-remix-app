// routes/api/signup.ts
import express from 'express';
import User from '../../models/user'; // Update the path as needed
import { hashPassword } from '../../utils/hashPasswords'; // Ensure you have this utility
import mongoose from 'mongoose';

const router = express.Router();

router.post('/', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        const hashedPassword = await hashPassword(password);
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(201).send('User created successfully');
    } catch (error) {
        console.error('Error creating user:', JSON.stringify(error, null, 2));
        return res.status(500).send(`Error creating user with error message: ${error}`);
    }
});

export default router;
