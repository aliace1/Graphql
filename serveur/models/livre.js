const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const livreSchema = new Schema({
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
    },
    createdCommentaires:[
        {
            type:Schema.Types.ObjectId,
            ref:'Commentaire'
        }
    ]
});

module.exports = mongoose.model('Livre', livreSchema);