var Ingredient = require('../models/ingredients');
var config = require('../config/db');
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var ObjectID = require('mongodb').ObjectID;


exports.addingredient = async function (req, res, next) {

    const ingredient = new Ingredient({
        ingredientName: req.body.ingredientName,
        availableQty: req.body.availableQty,
        thresholdQty: req.body.thresholdQty,
        vendor: req.body.vendor
    });


    dbConnection.model('ingredient').create(ingredient, (err, ingredient) => {
        if (err) {
            if (err.code == 11000) {
                e = "ingredient already exists";
                res.status(500).send({ message: e });
            } else {
                res.status(500).send({ message: err });
                return;
            }
        } else {
            res.status(200).send({ message: "ingredient Added Successfuly" });
        }
    });
}


exports.ingredientlist = async function (req, res) {

    dbConnection.model('ingredient').find({ $where: "this.thresholdQty > this.availableQty" }).exec((err, ingredient) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        } if (!ingredient) {
            return res.status(404).send({ message: "ingredient Not found." });
        } else {
            res.status(200).send({
                message: "Your ingredient list.",
                ingredientList: ingredient
            });
        }
    });

}
exports.vendoringredientlist = async function (req, res) {

    dbConnection.model('ingredient').find({ vendor: req.params.vendorName }).exec((err, ingredient) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        } if (!ingredient) {
            return res.status(404).send({ message: "ingredient Not found." });
        } else {
            res.status(200).send({
                message: "ingredient list.",
                vendoringredientlist: ingredient
            });
        }
    });

}
