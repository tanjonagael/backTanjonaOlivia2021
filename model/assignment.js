/*let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let AssignmentSchema = Schema({
    id: Number,
    dateDeRendu: Date,
    nom: String,
    rendu: Boolean
});*/

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
//module.exports = mongoose.model('Assignment', AssignmentSchema);

let mongoose = require("mongoose");
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");
let Schema = mongoose.Schema;

let AssignmentSchema = Schema({
 id: Number,
 dateDeRendu: Date,
 nom: String,
 rendu: Boolean,
 idMatiere: Number,
 note: Number,
 remarque: String,
 auteur: String,
});


AssignmentSchema.plugin(aggregatePaginate);
// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model("Assignment", AssignmentSchema,"assignments");
