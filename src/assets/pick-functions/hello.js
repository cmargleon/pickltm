// const mongoose = require('mongoose');
const Mongoose = require('mongoose'),
    Types = Mongoose.Schema.Types;

Mongoose.connect(
    'mongodb+srv://claudio:Lestat1988@reclut-q4vt0.mongodb.net/test?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

const modelName = 'techDictionaryWithKey';

//Employee Model without any fixed schema
const TechSchema = new Mongoose.Schema(
    { technology: String },
    { strict: false }
);

const Tech = Mongoose.model(modelName, TechSchema);



exports.handler = async (event, context) => {
    const location = event.queryStringParameters.location || "home";
    try {
        const docs = await Tech.find();
        return {
            statusCode: 200,
            body: docs,
        };
    } catch (err) {
        return {
            statusCode: 404,
            body: `404 not found`,
        };
    }
};