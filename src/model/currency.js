const { Schema, model } = require("mongoose")
const Currency = new Schema(
    {
        code: { type: String, required: true },
        alphaCode: { type: String, required: true },
        numericCode: { type: String, required: true },
        name: { type: String, required: true },
        rate: { type: Number, required: true },
        date: { type: String, required: true },
        inverseRate: { type: Number, required: true }
    });

const Exchange = new Schema(
    {
        name: { type: String },
        data: {
            type: Currency
        }
    },
    {
        timestamps: true
    }
);
module.exports = model("exchange", Exchange);
