const { validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const db = require('../models');
const jwt = require('jsonwebtoken');

exports.loginPost = async (req, res, next) => {

    const errors = validationResult(req);
    const { body } = req;

    if (!errors.isEmpty()) {
        return res.json({
            error: errors.array()[0].msg
        });
    }

    try {

        const user = await db.Users.findOne({
            where: {
                username: body.username
            }});

        if (user == null) {
            return res.json({
                error: 'Invalid username.'
            });
        }

        const checkPass = await bcrypt.compare(body.password, user.password);

        if (checkPass === true) {
            const token = jwt.sign({
                id: user.id,
             }, 'secret');
            return res.json({
                msg: 'You have successfully logged in.',
                token
            });
        }

        res.json({
            error: 'Invalid Password.'
        });
    }
    catch (e) {
        next(e);
    }

}

exports.registerPost = async (req, res, next) => {
    const errors = validationResult(req);
    const { body } = req;

    if (!errors.isEmpty()) {
        return res.render('register', {
            error: errors.array()[0].msg
        });
    }

    try {

        const user = await db.Users.findOne({
            where: {
                username: body.username
            }});

        if (user != null) {
            return res.status(400).json({
                error: 'Please choose another username.'
            });
        }

        const hashPass = await bcrypt.hash(body.password, 12);

        await db.Users.create({
            username: body.username,
            name: body.name,
            email: body.email,
            password: hashPass
        });
        
        res.json({
            msg: 'You have successfully registered.'
        });

    } catch (e) {
        next(e);
    }
};