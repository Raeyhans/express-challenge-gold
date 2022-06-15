const { set } = require('../app');
const db = require('../models');

exports.createOrder = async (req, res, next) => {
    try {
        const { 
            user : { id: userId },
            body : { orders, products } 
        } = req;

        const total_amount = products.reduce((acc, product) => {
            return acc + product.price * product.qty;
        }, 0);
        
        const data = {
            user_id: userId,
            total: total_amount,
            status: "UNPAID",
            orderdetails: products.map(product => {
                return {
                    product_id: product.id,
                    qty: product.qty,
                    price: product.price,
                }
            })
        }
        const order = await db.Orders.create(data, {
            include: [{
                model: db.Orderdetails,
                as: 'orderdetails',
            }]
        });

        await db.Products.update(req.body, {
            where: {
                id: req.body.id
            },
            set: {
                qty: req.body.qty
            }
        });
        res.json(order);
    } catch (e) {
        next(e);
    }
}

exports.getOrders = async (req, res, next) => {
    try {
        const orders = await db.Orders.findAll();
        res.json(orders);
    } catch (e) {
        next(e);
    }
}

exports.getOneOrder = async (req,res,next) => {
    try{
        const user = await db.Orders.findOne({
            where: {
                id: req.params.id
            }
        });
        res.json(user);
    }
    catch (e) {
        next(e);
    }
}

exports.updateOrder = async (req,res,next) => {
    try{
        await db.Orders.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.json({
            msg: 'Status updated.',
            status: req.body.status
        });
    }catch (e) {
        next(e);
    }
}