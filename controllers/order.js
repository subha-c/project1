var Order = require('../models/order');
var config = require('../config/db');
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var ObjectID = require('mongodb').ObjectID;


exports.orderfood = async function (req, res, next) {
    let id = req.decoded.userData._id;

    const order = new Order({
        item: req.body.item,
        orderBy: id
    });


    dbConnection.model('order').create(order, (err, order) => {
        if (err) {
            if (err.code == 11000) {
                e = "order already exists";
                res.status(500).send({ message: e });
            } else {
                res.status(500).send({ message: err });
                return;
            }
        } else {
            res.status(200).send({ message: "Order Food Successfuly" });
        }
    });
}


exports.orderfoodlist = async function (req, res) {

    let id = req.decoded.userData._id;

    dbConnection.model('order').find({ "orderBy": ObjectID(id) }).exec((err, order) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        } if (!order) {
            return res.status(404).send({ message: "Order Not found." });
        } else {
            res.status(200).send({
                message: "Your order list.",
                orderList: order
            });
        }
    });

}
