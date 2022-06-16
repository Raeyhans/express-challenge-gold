const {
    set
} = require('../app');
const db = require('../models');

exports.createOrder = async (req, res, next) => {
    try {
        const {
            user: {
                id: userId
            },
            body: {
                orders,
                items
            }
        } = req;

        const total_amount = items.reduce((acc, item) => {
            return acc + item.price * item.qty;
        }, 0);

        const data = {
            user_id: userId,
            total: total_amount,
            status: req.body.orders.status,
            orderdetails: items.map(item => {
                return {
                    item_id: item.id,
                    qty: item.qty,
                    price: item.price,
                }
            })
        }
        const order = await db.Orders.create(data, {
            include: [{
                model: db.Orderdetails,
                as: 'orderdetails',
            }]
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

exports.getOneOrder = async (req, res, next) => {
    try {
        const user = await db.Orders.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!!user) {
            res.json(user);
        }
        return res.status(404).json({
            msg: 'Order not found.'
        });
            
    } catch (e) {
        next(e);
    }
}

exports.updateOrder = async (req, res, next) => {
    try {
        await db.Orders.findByPk(req.params.id).then(function (result) {
            if (!!result) {
                db.Orders.update(req.body, {
                    where: {
                        id: req.params.id
                    }
                });
                res.status(200).json({
                    msg: 'Status updated.',
                    status: req.body.status
                });
            } 
            return res.status(404).json({
                msg: 'Order not found.'
            });
        });
    } catch (e) {
        next(e);
    }
}