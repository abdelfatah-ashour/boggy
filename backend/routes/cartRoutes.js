const router = require('express').Router();
const { isAuth } = require('../controllers/authControllers');
const {
    addToCart,
    getAllInCart,
    getOneItemAndDelete,
    deleteCart,
    getOneItemAndUpdate,
} = require('../controllers/cartControllers');

router.route('/addToCart').post(isAuth, addToCart);
router.route('/getAllInCart').get(isAuth, getAllInCart);
router.route('/getOneItemAndDelete').get(isAuth, getOneItemAndDelete);
router.route('/getOneItemAndUpdate').put(isAuth, getOneItemAndUpdate);
router.route('/deleteCart').delete(isAuth, deleteCart);

module.exports = router;
