const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secretKey = 'Paki47tan'
const User= require('../models/userSchema')

exports.authenticateToken = async (req, res, next) => {
    let token = req.headers.token
    console.log(token,'header token')
    let parsedToken = JSON.parse(token)
    console.log('helllo', parsedToken)
    if (parsedToken) {
        let decoded = jwt.verify(parsedToken, secretKey)
        console.log('decode', decoded)
        let user = await User.findOne({ email: decoded.email })
        console.log('user', user)
        if (!user) {
            return res.status(403).json({ message: "Invalid token" });
        }
        req.user = user
        console.log('authentication completed')
        next() 
    }
    else {
        return res.status(401).json({
            message: 'Token is required'
        })
    }
}
