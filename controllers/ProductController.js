const db = require('../models');

exports.createProduct = async (req,res,next) => {
    try{
        const product = await db.Products.create(req.body);
        res.json(product);
    }catch (e) {
        next(e);
    }
}

exports.getProducts = async (req,res,next) => {
    try{
        const products = await db.Products.findAll();
        res.json(products);
    }catch (e) {
        next(e);
    }
}

exports.editProduct = async (req,res,next) => {
    try{
        await db.Products.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.json({
            msg: 'Product updated.'
        });
    }catch (e) {
        next(e);
    }
}

exports.deleteProduct = async (req,res,next) => {
    try{
        await db.Products.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json({
            msg: 'Product deleted.'
        });
    }catch (e) {
        next(e);
    }
}

exports.getProduct = async (req,res,next) => {
    try{
        const product = await db.Products.findOne({
            where: {
                id: req.params.id
            }
        });
        res.json(product);
    }
    catch (e) {
        next(e);
    }
}