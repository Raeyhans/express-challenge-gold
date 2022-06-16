const db = require('../models');

exports.createItem = async (req,res,next) => {
    try{
        const item = await db.Items.create(req.body);
        res.json(item);
    }catch (e) {
        next(e);
    }
}

exports.getItems = async (req,res,next) => {
    try{
        const item = await db.Items.findAll();
        res.json(item);
    }catch (e) {
        next(e);
    }
}

exports.editItem = async (req,res,next) => {
    try{
        await db.Items.findByPk(req.params.id).then(function (result) {
            if (!!result) {
                db.Items.update(req.body, {
                    where: {
                        id: req.params.id
                    }
                });
                res.status(200).json({
                    msg: 'Item updated.'
                });
            } 
            return res.status(404).json({
                msg: 'Item not found.'
            });
        });
    }catch (e) {
        next(e);
    }
}

exports.deleteItem = async (req,res,next) => {
    try{
        await db.Items.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json({
            msg: 'Item deleted.'
        });
    }catch (e) {
        next(e);
    }
}

exports.getItem = async (req,res,next) => {
    try{
        const item = await db.Items.findOne({
            where: {
                id: req.params.id
            }
        });
        if(!!item){
            res.json(item);
        }
        return res.status(404).json({
            msg: 'Item not found.'
        });
    }
    catch (e) {
        next(e);
    }
}