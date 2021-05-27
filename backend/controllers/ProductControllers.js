const Products = require('../models/productsModel');
const { validProduct } = require('../middleware/validationInputs');
const limit = 16;
module.exports = {
    getProductsWithCategory: async (req, res) => {
        try {
            const { categories } = req.params;
            const { page, date, price, color } = req.query;
            if (page || date || price || color) {
                const currentPage = page;
                const products = await Products.find({
                    Category: categories,
                    Color:
                        color === 'All'
                            ? {
                                  $ne: true,
                              }
                            : color,
                    Price:
                        price === 'All'
                            ? {
                                  $ne: true,
                              }
                            : {
                                  $gte: price,
                              },
                })
                    .sort({ createdAt: date === 'newest' || !date ? 1 : -1 })
                    .skip(page ? (currentPage - 1) * limit : 0)
                    .limit(limit);

                return res.status(200).json({
                    success: true,
                    message: {
                        products: products.length > 0 ? products : [],
                        total: products.length > 0 ? products.length : 0,
                    },
                });
            } else {
                const products = await Products.find({
                    Category: categories,
                })
                    .sort({ createdAt: -1 })
                    .skip(0)
                    .limit(limit);

                const totalProduct = await Products.find({
                    Category: categories,
                });

                return res.status(200).json({
                    success: true,
                    message: {
                        products: products.length > 0 ? products : [],
                        total: totalProduct.length,
                    },
                });
            }
        } catch (error) {
            res.status(500).json({
                message: error.message,
            });
        }
    },
    getProductsWithSection: async (req, res) => {
        try {
            const { categories, sections } = req.params;
            const { page, price, color, date } = req.query;
            if (page || price || color || date) {
                const currentPage = +page;

                if (currentPage <= 0) {
                    return res.status(400).json({
                        success: false,
                        message: {
                            products: [],
                            total: 0,
                        },
                    });
                }

                const products = await Products.find({
                    Category: categories,
                    Section: sections,
                    Color:
                        color === 'All' || !color
                            ? {
                                  $ne: true,
                              }
                            : color,
                    Price:
                        price === 'All' || !price
                            ? {
                                  $ne: true,
                              }
                            : {
                                  $gte: price,
                              },
                })
                    .sort({ createdAt: date === 'newest' || !date ? 1 : -1 })
                    .skip(page ? (currentPage - 1) * limit : 0)
                    .limit(limit);

                return res.status(200).json({
                    success: true,
                    message: {
                        products: products.length > 0 ? products : [],
                        total: products.length > 0 ? products.length : 0,
                    },
                });
            } else {
                const currentPage = +page;

                if (currentPage <= 0) {
                    return res.status(400).json({
                        success: false,
                        message: {
                            products: [],
                            total: 0,
                        },
                    });
                }

                const products = await Products.find({
                    Category: categories,
                    Section: sections,
                })
                    .sort({ createdAt: -1 })
                    .skip(0)
                    .limit(limit);
                const totalProduct = await Products.find({
                    Category: categories,
                    Section: sections,
                });

                return res.status(200).json({
                    success: true,
                    message: {
                        products: products.length > 0 ? products : [],
                        total: totalProduct.length,
                    },
                });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getProductsWithBrand: async (req, res) => {
        try {
            const { categories, sections, brands } = req.params;
            const { page, date, price, color } = req.query;
            const currentPage = +page;
            if (page || date || price || color) {
                const products = await Products.find({
                    Category: categories,
                    Section: sections,
                    Brand: brands,
                    Color:
                        color === 'All' || !color
                            ? {
                                  $ne: true,
                              }
                            : color,
                    Price:
                        price === 'All' || !price
                            ? {
                                  $ne: true,
                              }
                            : {
                                  $gte: price,
                              },
                })
                    .skip(page ? (currentPage - 1) * limit : 0)
                    .limit(limit);

                return res.status(200).json({
                    success: true,
                    message: {
                        products: products.length > 0 ? products : [],
                        total: products.length > 0 ? products.length : 0,
                    },
                });
            } else {
                const products = await Products.find({
                    Category: categories,
                    Section: sections,
                    Brand: brands,
                })
                    .skip(0)
                    .limit(limit);

                return res.status(200).json({
                    success: true,
                    message: {
                        products: products.length > 0 ? products : [],
                        total: products.length > 0 ? products.length : 0,
                    },
                });
            }
        } catch (error) {
            res.status(500).json({
                message: error.message,
            });
        }
    },
    getOneProductWithId: async (req, res) => {
        try {
            const { details, categories, sections, brands } = req.params;

            const product = await Products.findOne({
                _id: details,
                Category: categories,
                Section: sections,
                Brand: brands,
            });

            return res.status(200).json({
                success: true,
                message: {
                    products: product,
                },
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    createProduct: async (req, res) => {
        try {
            const {
                Name,
                Category,
                Section,
                Brand,
                Size,
                SDMemory,
                SDHard,
                MemoryRamMobiles,
                MemoryRamLaptops,
                Color,
                Price,
                Qty,
            } = req.body;
            const { filename } = req.file;
            const { error } = validProduct({
                Name,
                Category,
                Section,
                Brand,
                Price,
                Qty,
            });
            if (error) {
                return res.status(400).json({
                    success: false,
                    message: `line 81 ${error.details[0].message}`,
                });
            }
            const createProduct = await new Products({
                Name,
                Title: Section,
                Category,
                Section,
                Brand,
                Size,
                SDMemory,
                SDHard,
                MemoryRamMobiles,
                MemoryRamLaptops,
                Color,
                Price,
                Qty,
                ImageProduct: filename,
            });

            await createProduct.save((error, productsModel) => {
                if (error) {
                    return res.status(500).json({
                        success: true,
                        message: error.message,
                    });
                }
                return res.status(200).json({
                    success: true,
                    message: productsModel,
                });
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};
