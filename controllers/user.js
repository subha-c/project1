var User = require('../models/user');
var config = require('../config/db');
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var ObjectID = require('mongodb').ObjectID;





exports.signup = async function (req, res, next) {

    const user = new User({
        userName: req.body.userName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    });


    dbConnection.model('user').findOne({ email: req.body.email }).exec((err, users) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        } if (users) {
            return res.status(404).send({ message: "This email already registered." });
        } else {
            dbConnection.model('user').create(user, (err, user) => {
                if (err) {
                    if (err.code == 11000) {
                        e = "User already exists";
                        res.status(500).send({ message: e });
                    } else {
                        res.status(500).send({ message: err });
                        return;
                    }
                } else {
                    res.status(200).send({ message: "User Register Successfuly" });
                }
            });

        }
    });
}

exports.signin = async function (req, res, next) {

    dbConnection.model('user').findOne({ email: req.body.email }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        } if (!user) {
            return res.status(404).send({ message: "User Not found." });
        } else {
            var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null, message: "Invalid Password!"
                });
            } else {
                var token = jwt.sign({ userData: user }, config.secret, {
                    expiresIn: 86400 // 24 hours
                });

                res.status(200).send({
                    id: user._id,
                    userName: user.userName,
                    email: user.email,
                    accessToken: token
                });
            }
        }
    });
}



exports.pwdreset = async function (req, res) {

    let id = req.decoded.userData._id;

    var passwordIsValid = bcrypt.compareSync(req.body.oldPassword, req.decoded.userData.password);

    if (!passwordIsValid) {
        return res.status(401).send({
            accessToken: null, message: "Invalid Old Password!"
        });
    } else {
        let newPassword = bcrypt.hashSync(req.body.newPassword, 8);

        dbConnection.model('user').findByIdAndUpdate({ _id: id }, { "password": newPassword },
            (err, users) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                } else {
                    res.status(200).send({ message: "user password changed successfully!" });
                }
            });
    }
}

exports.deactivate = async function (req, res) {

    let id = req.decoded.userData._id;
    let status = "Inactive";

    dbConnection.model('user').findByIdAndUpdate({ _id: id }, { "status": status }, { new: true },
        (err, users) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            } else {
                res.status(200).send({ message: "user deactivate successfully!", users });
            }
        });
}

