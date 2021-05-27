const router = require('express').Router();

// import all middleware of products
const {
    createProduct,
    getProductsWithCategory,
    getProductsWithSection,
    getProductsWithBrand,
    getOneProductWithId,
} = require('../controllers/ProductControllers');

// import middleware for authorization
const { isAuth } = require('../controllers/authControllers');
const multer = require('multer');

// config multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/temp');
    },
    filename: function (req, file, cb) {
        let today = new Date();
        let date =
            today.getFullYear() +
            '-' +
            (today.getMonth() + 1) +
            '-' +
            today.getDate();
        '-' + today.getTime();
        cb(
            null,
            date +
                '-' +
                file.originalname +
                '.' +
                require('mime').extension(file.mimetype)
        );
    },
});
const upload = multer({ storage: storage });

// product routes
router
    .route('/create')
    .post(isAuth, upload.single('ImageProduct'), createProduct);
router.route('/get/:categories').get(getProductsWithCategory);
router.route('/get/:categories/:sections').get(getProductsWithSection);
router.route('/get/:categories/:sections/:brands').get(getProductsWithBrand);
router
    .route('/get/:categories/:sections/:brands/:details')
    .get(getOneProductWithId);

// export all route as a module
module.exports = router;
