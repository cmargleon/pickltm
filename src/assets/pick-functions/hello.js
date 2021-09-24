// const mongoose = require('mongoose');
const Mongoose = require('mongoose'),
    Types = Mongoose.Schema.Types;





//Employee Model without any fixed schema
const TechSchema = new Mongoose.Schema(
    { technology: String },
    { strict: false }
);





exports.handler = async (event, context) => {
    try {
        await Mongoose.connect(
            'mongodb+srv://claudio:Lestat1988@reclut-q4vt0.mongodb.net/test?retryWrites=true&w=majority',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );
        const modelName = 'techDictionaryWithKey';

        const Tech = Mongoose.model(modelName, TechSchema);
        const docs = await Tech.find();
        console.log(docs);
        return {
            statusCode: 200,
            body: JSON.stringify(docs),
        };
    } catch (err) {
        return {
            statusCode: 404,
            body: JSON.stringify(err),
        };
    }
};