const Router = require('express').Router();
const {
    checkout,
    getAllOrders,
    getOrders,
    editStateOfOrder,
} = require('../controllers/orderControllers');
const { isAuth, isAdmin } = require('../controllers/authControllers');
Router.route('/checkout').post(isAuth, checkout);
Router.route('/getOrders').get(isAuth, getOrders);
Router.route('/getAllOrders').get(isAuth, isAdmin, getAllOrders);
Router.route('/updateStateOrder').put(isAuth, isAdmin, editStateOfOrder);

module.exports = Router;
