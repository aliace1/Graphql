const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const devoirSchema = new Schema({
    titre:{
        type:String,
        required:true
    },
    matiere:{
        type:String,
        required:true
    },
    contenu:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    creator:{
        type:Schema.Types.ObjectId,
        ref:'Classe'
    }
});

module.exports = mongoose.model('Devoir', devoirSchema);