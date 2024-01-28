// routes/api/signin.ts
import express from 'express';
import User from '../../models/user';
import bcrypt from 'bcrypt';

const router = express.Router();

router.post('/', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).send('Invalid credentials');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send('Invalid credentials');
        }

        // Generate a token or handle login logic
        res.send('Login successful');
    } catch (error) {
        console.error('Error during sign in:', error);
        res.status(500).send('Internal server error');
    }
});

export default router;
