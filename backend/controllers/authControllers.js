const User = require('../models/authModel');
const { hash, compare } = require('bcrypt');
const { validRegister, validLogin } = require('../middleware/validationInputs');
const cookie = require('cookie');
const { sign, verify } = require('jsonwebtoken');
const { token } = require('morgan');
module.exports = {
    Register: async (req, res) => {
        try {
            const {
                firstName,
                lastName,
                username,
                email,
                password,
                confirmPassword,
            } = req.body;
            const { filename } = req.file;

            const { error } = validRegister(req.body); // if true will return err obj

            if (error) {
                return res.status(400).json({
                    success: false,
                    message: error.details[0].message,
                });
            }

            const user = await User.findOne({ email });

            if (user) {
                return res.status(400).json({
                    success: false,
                    message: 'email is already exists',
                });
            }

            const hashPassword = await hash(password, 12);
            const hashConfirmPassword = await hash(confirmPassword, 12);
            const createUser = new User({
                firstName,
                lastName,
                username,
                email,
                password: hashPassword,
                confirmPassword: hashConfirmPassword,
                imageProfile: filename,
            });
            createUser.save(err => {
                if (err) {
                    throw new Error(err.message);
                }
            });
            return res.status(200).json({
                success: true,
                message: 'created successfully',
            });
        } catch (error) {
            if (error) {
                return res.status(500).json({
                    success: true,
                    message: 'something wrong ... try again !',
                });
            }
        }
    },
    login: async (req, res) => {
        // destruction  request body
        const { email, password } = req.body;
        const { error } = validLogin(req.body); // if true will return err obj
        if (error) {
            return res
                .status(400)
                .json({ success: false, message: error.details[0].message });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Ops! :( email or password is incorrect',
            });
        }
        const same = await compare(password, user.password);
        if (!same) {
            return res.status(400).json({
                success: false,
                message: 'Ops! :( email or password is incorrect',
            });
        }

        // generate response if logger is user
        if (user.role === 0) {
            const token = sign(
                { _id: user._id, role: user.role },
                process.env.ACCESS_JWT_SECRET,
                {
                    expiresIn: 1 * 24 * 60 * 60,
                }
            );
            res.setHeader(
                'Set-Cookie',
                cookie.serialize('auth', token, {
                    httpOnly: process.env.NODE_ENV === 'production',
                    secure: process.env.NODE_ENV === 'production',
                    path: '/',
                    sameSite:
                        process.env.NODE_ENV === 'production' ? 'none' : false,
                    maxAge: 60 * 60 * 24 * 7, // 1 week})
                })
            );

            res.header('Authorization', token)
                .status(200)
                .json({
                    success: true,
                    message: {
                        role: user.role,
                        userId: user._id,
                        email: user.email,
                        displayName: user.firstName + ' ' + user.lastName,
                    },
                });
        }
        // generate response if logger is Admin
        if (user.role === 1) {
            const adminToken = sign(
                { _id: user._id, role: user.role },
                process.env.ACCESS_ADMIN_SECRET,
                {
                    expiresIn: 1 * 24 * 60 * 60,
                }
            );
            res.setHeader(
                'Set-Cookie',
                cookie.serialize('admin', adminToken, {
                    httpOnly: process.env.NODE_ENV === 'production',
                    secure: process.env.NODE_ENV === 'production',
                    path: '/',
                    sameSite:
                        process.env.NODE_ENV === 'production' ? 'none' : false,
                    maxAge: 60 * 60 * 24 * 7, // 1 week})
                })
            );

            res.header('Authorization', token)
                .status(200)
                .json({
                    success: true,
                    message: {
                        role: user.role,
                        adminId: user._id,
                        email: user.email,
                        displayName: user.firstName + ' ' + user.lastName,
                    },
                });
        }
    },
    logout: async (req, res) => {
        res.clearCookie('auth');
        res.clearCookie('admin');

        return res
            .status(200)
            .json({ success: true, message: 'see you later ❤' });
    },
    isAuth: async (req, res, next) => {
        const token = req.cookies.auth || req.headers.authorization;

        // check is no user or no admin in req headers
        if (!token) {
            return res.status(403).json({
                success: false,
                message: 'access denied 🔐',
            });
        } else {
            const decoded = await verify(token, process.env.ACCESS_JWT_SECRET);
            if (!decoded) {
                return res.status(401).json({
                    success: false,
                    message:
                        'invalid access resources please register or login',
                });
            }
            req.user = decoded;
            next();
        }
    },
    isAdmin: async (req, res, next) => {
        const { role } = req.admin;
        if (!role && role !== 1) {
            return res.status(403).json({
                success: false,
                message: "you can't access resources",
            });
        }
        next();
    },
};
