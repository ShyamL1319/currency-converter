const express = require("express");
const router = express.Router();
const Exchange = require("../model/currency");
// const { data, data1 } = require("../sample/sample_data");
const getExchangeRate = async (req, res) => {
    const { from, to, amount } = req.params;
    const fromExcchangeData = await Exchange.findOne({ name: from.toLowerCase() })
    const toExcchangeData = await Exchange.findOne({ name: to.toLowerCase() })
    if (!fromExcchangeData || !toExcchangeData) {
        res.status(404).json({ msg: "Data Not Found", data: [] });
        return;
    }
    const convertedAmount = ((toExcchangeData.data.rate / fromExcchangeData.data.rate) * parseFloat(amount))
    res.json({ msg: "Success", convertedAmount })
    res.end();
}

const getCurrencyList = async (req, res) => {
    const listdata = await Exchange.aggregate([{ $project: { _id: 0, name: 1, data: 1 } }]);
    res.json({ listdata });
    res.end();
}
router.get("/:from/:to/:amount", getExchangeRate);

router.post("/seed", async (req, res, next) => {
    let seedingData = [];//JSON.parse(JSON.stringify(data1))
    const countDocument = await Exchange.countDocuments();
    let data = [];
    for (let key of Object.keys(seedingData)) {
        data.push({ name: key, data: seedingData[key] });
    }
    const exchangeData = await Exchange.insertMany(data);
    res.json(countDocument);
    res.end();
}
);

router.get("/", getCurrencyList);
module.exports = router;