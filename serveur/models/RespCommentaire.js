const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const respCommentaireSchema = new Schema({
    idCommentaire:{
        type:String,
        required:true
    },
    commentaire:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    creator:{
        type:Schema.Types.ObjectId,
        ref:'Commentaire'
    },
    createdUsers:[
        {
            type:Schema.Types.ObjectId,
            ref:'User'
        }
    ],
});

module.exports = mongoose.model('RespCommentaire', respCommentaireSchema);