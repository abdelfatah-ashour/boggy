const joi = require('joi');

function validRegister(userData) {
    const schema = joi.object({
        firstName: joi.string().min(3).max(25).required(),
        lastName: joi.string().min(3).max(25).required(),
        username: joi.string().min(3).max(25).required(),
        email: joi.string().min(3).max(255).required().email(),
        password: joi.string().min(8).max(255).required(),
        confirmPassword: joi
            .string()
            .min(8)
            .max(255)
            .equal(joi.ref('password'))
            .required(),
    });

    return schema.validate(userData);
}

function validLogin(userData) {
    const schema = joi.object({
        email: joi.string().min(3).max(255).required().email(),
        password: joi.string().min(8).max(255).required(),
    });

    return schema.validate(userData);
}
function validProduct(productData) {
    const schema = joi.object({
        Name: joi.string().min(3).max(255).required(),
        Category: joi.string().min(3).max(255).required(),
        Section: joi.string().min(3).max(255).required(),
        Brand: joi.string().min(1).max(255).required(),
        Price: joi.string().min(1).max(255).required(),
        Qty: joi.string().min(1).max(255).required(),
    });

    return schema.validate(productData);
}

exports.validRegister = validRegister;
exports.validLogin = validLogin;
exports.validProduct = validProduct;
