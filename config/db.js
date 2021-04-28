const mongoose = require("mongoose");
var jwt = require("jsonwebtoken");



var connections = {};

const secret = "FOOD-secret-key";



const tokenVerify = (req, res, next) => {

  var token = req.headers['x-access-token'];
  if (!token) {
    return res.status(401).send({ auth: false, message: 'No token provided.' });
  } else {
    jwt.verify(token, secret, function (err, decoded) {
      if (err) {
        console.log("err : ", err);
        return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      } else {
        req.decoded = decoded;
        let id = req.decoded.userData._id;
        // user found or not
        dbConnection.model('user').findOne({ _id: id }).exec((err, userData) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          } if (!userData) {
            return res.status(404).send({ message: "User Not found." });
          } else {
            console.log("----------userfound----------")
            next();
          }
        });
      }
    });
  }
}


const InitiateMongoServer = (dbName) => {

  try {
    if (connections[dbName]) {
      console.log("Already connected to DB!!", dbName);
    } else {
      connections[dbName] = mongoose.createConnection('mongodb://localhost:27017/' + dbName, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      });
      console.log("Connected to DB!!", dbName)
      return connections[dbName];
    }
  } catch (e) {
    console.log("MongoDB Connection :", e);
    throw e;
  }
};



module.exports = {
  tokenVerify,
  InitiateMongoServer,
  connections,
  secret,
};



