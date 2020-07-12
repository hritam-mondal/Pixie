const Product = require('../models/product');
const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');


exports.getProductById = (req, res, next, id) => {
    Product.findById(id).populate("category").exec((err, product) => {
        if (err) {
            return res.status(400).json({
                error: "Product not found"
            })
        }
        req.product = product;
        next();
    })
};

exports.createProduct = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({
                error: "Problem with image"
            })
        }

        const { name, description, price, category, stock } = fields;
        if (!name || !description || !price || !category || !stock) {
            return res.status(400).json({
                error: "please include all fields"
            })
        }

        let product = new Product(fields);

        // Handle file hare
        if (file.photo) {
            if (file.photo.size > 2097152) {
                return res.status(400).json({
                    error: "file size too big! Max size should be 2MB"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type
        }

        // Save to DB
        product.save((err, product) => {
            if (err) {
                res.status(400).json({
                    error: "Saving tshart in db failed"
                })
            }
            res.json(product);
        })
    })
};

exports.getProduct = (req, res) => {
    req.product.photo = undefined
    return res.json(req.product);
};

exports.photo = (req, res, next) => {
    if (req.product.photo.data) {
        res.set("Content-Type", req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }
    next()
};

exports.deleteProduct = (req, res) => {
    let product = req.product;
    product.remove((err, deletedProduct) => {
        if (err) {
            res.status(400).json({
                error: "Failed to delete the product"
            })
        }
        res.json({
            message: "Deletion was success",
            deletedProduct
        })
    })
};

exports.updateProduct = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({
                error: "Problem with image"
            })
        }

        // Updation code
        let product = req.product;
        product = _.extend(product, fields);

        // Handle file hare
        if (file.photo) {
            if (file.photo.size > 2097152) {
                return res.status(400).json({
                    error: "file size too big! Max size should be 2MB"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type
        }

        // Save to DB
        product.save((err, product) => {
            if (err) {
                res.status(400).json({
                    error: "Updation failed!"
                })
            }
            res.json(product);
        })
    })
};

exports.getAllProducts = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 1000;
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    Product.find().select("-photo").populate("category").sort([[sortBy, "asc"]]).limit(limit).exec((err, products) => {
        if (err) {
            return res.status(400).json({
                error: "No product FOUND"
            })
        }
        res.json(products);
    });
};

exports.updateStock = (req, res, next) => {
    let myOperations = req.body.order.products.map(prod => {
        return {
            updateOne: {
                filter: {_id: prod._id},
                update: {$inc: {stock: -prod.count, sold: +prod.count}}
            }
        }
    });

    product.bulkWrite(myOperations, {}, (err, products) => {
        if (err) {
            return res.status(400).json({
                error: "Bulk operation failed"
            })
        }
        next();
    });
};

exports.getAllUniqueCategories = (req, res) => {
    Product.distinct("category", {}, (err, category) => {
        if (err) {
            return res.status(400).json({
                error: "NO Category Found"
            })
        }
        res.json(category);
    });
};