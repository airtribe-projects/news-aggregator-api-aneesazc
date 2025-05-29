const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const usersModel = require('../models/usersModel');

const registerUser = async (req, res) => {
    // const { name, email, password } = req.body;
    const { name, email, password, preferences = [] } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Name, email and password are required' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    try {
        const newUser = new usersModel({
            name,
            email,
            password: hashedPassword,
            preferences
        });
        await newUser.save();
        res.status(200).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }

}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const user = await usersModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


const getUserPreferences = async (req, res) => {
    const userId = req.user.id;
    try {
        const user = await usersModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ preferences: user.preferences || [] });
    } catch (error) {
        console.error('Error retrieving user preferences:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const updateUserPreferences = async (req, res) => {
    const userId = req.user.id;
    const { preferences } = req.body;

    if (!preferences || !Array.isArray(preferences)) {
        return res.status(400).json({ message: 'Preferences must be an array' });
    }

    try {
        const user = await usersModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.preferences = preferences;
        await user.save();
        res.status(200).json({ message: 'Preferences updated successfully' });
    } catch (error) {
        console.error('Error updating user preferences:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


module.exports = {
    registerUser,
    loginUser,
    getUserPreferences,
    updateUserPreferences
};