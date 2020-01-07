const mongoose = require('mongoose');

var Schema = mongoose.Schema;
var itemSchema = new Schema({
    _id: Schema.Types.ObjectId,
    Name: { type: String },
    Designation: { type: String },
    Salary:{ type: String }
});

// the schema is useless so far
// we need to create a model using it
var Items = mongoose.model('Items', itemSchema,'Items');
module.exports = Items;
