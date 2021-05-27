const mongoose = require('mongoose');
const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            trim: true,
            lowercase: true,
            minlength: 3,
            maxlength: 25,
            required: [true, 'First Name is required'],
        },

        lastName: {
            type: String,
            trim: true,
            lowercase: true,
            minlength: 3,
            maxlength: 25,
            required: [true, 'Last Name is required'],
        },
        username: {
            type: String,
            trim: true,
            lowercase: true,
            minlength: 3,
            maxlength: 25,
            unique: [true, 'Username is already token!'],
            required: [true, 'Username is required'],
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
            minlength: 3,
            maxlength: 255,
            unique: [true, 'Email is already token!'],
            required: [true, 'Email is required'],
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
        },
        confirmPassword: {
            type: String,
            required: [true, 'Confirm Password is required'],
        },
        role: {
            type: Number,
            default: 0,
        },
        imageProfile: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            default: 'user',
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('User', userSchema);
