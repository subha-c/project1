var Food = require('../models/food');


exports.addfood = async function (req, res) {

    const food = new Food({
        foodName: req.body.foodName,
        productionCost: req.body.productionCost,
        sellingCost: req.body.sellingCost
    });

    dbConnection.model('food').create(food, (err, food) => {
        if (err) {
            if (err.code == 11000) {
                e = "food already exists";
                res.status(500).send({ message: e });
            } else {
                res.status(500).send({ message: err });
                return;
            }
        } else {
            res.status(200).send({ message: "Food added Successfuly" });
        }
    });
}


exports.foodlist = async function (req, res) {

    dbConnection.model('food').find({ $where: "this.productionCost > this.sellingCost" }).exec((err, food) => {
        console.log(err)
        console.log(food)
        if (err) {
            res.status(500).send({ message: err });
            return;
        } if (!food) {
            return res.status(404).send({ message: "food Not found." });
        } else {
            res.status(200).send({
                foodList: food
            });
        }
    });

}
