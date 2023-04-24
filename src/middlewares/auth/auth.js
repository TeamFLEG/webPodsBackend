// Description : This file contains the middleware function for authentication system
const User = require("../../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Login middleware function
const login = async (req, res) => {
    console.log(req.body);
    try {
        const { email, password } = req.body;

        // Validate the user data
        if (!email || !password) {
            return res.status(400).json({ message: "Bad request" });
        }

        // Check if the user exists
        const user = await User.findOne({ username: email });
        // If user does not exist
        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }
        // If user exists then compare the password with the encrypted password
        if (user && bcrypt.compareSync(password, user.password)) {
            // Generate access token and refresh token
            const accessToken = generateAccessToken({ username: user.username, password: user.password });
            const refreshToken = generateRefreshToken({ username: user.username, password: user.password });

            res.status(200).json({ accessToken: accessToken, refreshToken: refreshToken });
        } else {
            res.status(401).json({ message: "Unauthorized" });
        }
    } catch (error) {
        console.log(error);
    }
};

// Register middleware function
const register = async (req, res) => {
    console.log(req.body);
    try {
        const { email, password } = req.body;

        // Validate the user data
        if (!email || !password) {
            return res.status(400).json({ message: "Bad request" });
        }

        // Check if the user already exists
        if (await User.findOne({ username: email })) {
            return res.status(400).json({ message: "Username already exists" });
        }

        // Else save user data to the database
        console.log(process.env.BCRYPT_SALT_ROUNDS);
        const encryptedPassword = bcrypt.hashSync(password, parseInt(process.env.BCRYPT_SALT_ROUNDS));

        // Add data to the database and save
        const user = new User({ username: username, password: encryptedPassword });
        user.save();

        // Generate access token and refresh token
        const accessToken = generateAccessToken({ username: user.username, password: user.password });
        const refreshToken = generateRefreshToken({ username: user.username, password: user.password });

        res.status(201).json({ accessToken: accessToken, refreshToken: refreshToken });
    } catch (error) {
        console.log(error);
    }
};

// Refresh token middleware function
const authenticateUser = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    jwt.verify(token, process.env.JWT_ACCESS_TOKEN_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Forbidden" });
        }
        req.user = user;
        res.status(200).json({ message: "Authorized" });
    });
};

const generateAccessToken = (user) => {
    return jwt.sign(user, process.env.JWT_ACCESS_TOKEN_KEY, { expiresIn: "5m" });
};

const generateRefreshToken = (user) => {
    return jwt.sign(user, process.env.JWT_REFRESH_TOKEN_KEY, { expiresIn: "1d" });
};

module.exports = {
    login,
    register,
    authenticateUser
}