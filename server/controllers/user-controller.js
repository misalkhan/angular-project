const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secretKey = 'Paki47tan'
const User = require('../models/userSchema')

exports.signUp = async (req, res) => {
    try {
        let { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
          }
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists with this email" });
        }
        password = await bcrypt.hash(password, 10);
        user = new User({ name, email, password });
        console.log('user from server', user)
        await user.save();
        return res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        return res.status(500).json({ message: "Server error", error: err.message });
    } 
} 
 
exports.login = async (req, res) => {
    const { email, password } = req.body;
    if ( !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }
    let user = await User.findOne({ email });
    console.log(user.password, password.toString())
    if (user) {
        const matchPassword = await bcrypt.compare(password.toString(), user.password);
        console.log(matchPassword, '======')
        if (user.email === email && matchPassword) {
            const token = jwt.sign({ email: email }, secretKey);
            await user.updateOne({ authToken: token })
            return res.status(200).json({
                message: 'Logged in successfully',
                token
            })
        } else {
            return res.status(401).json({
                message: 'Invalid email or password'
            })
        }
    } else {
        return res.status(401).json({
            message: "Email doesn't exist"
        })
    }
}

exports.userInfo = async (req, res) => {
    let user = req.user
    if (user) {
        console.log(user, 'user info')
        return res.json({
            name: user.name,
            email: user.email,
            password: user.password
        });
    } else {
        return res.status(401).json({ message: "User not authenticated" });
    }
}

exports.updateInfo = async (req, res) => {
    let data = req.user
    console.log(data, '----------')
    try {
        let user = await User.findByIdAndUpdate(data._id, req.body, { new: true });
        console.log(user, '*******')
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.json(user);
    } catch (err) {
        return res.status(500).json({ message: "Server error", error: err.message });
    }
}  