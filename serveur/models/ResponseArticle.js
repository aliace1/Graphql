const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const responseArticleSchema = new Schema({
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
    classe:{
        type:String,
        required:true
    },
    createdCommentaires:[
        {
            type:Schema.Types.ObjectId,
            ref:'Commentaire'
        }
    ]
});

module.exports = mongoose.model('ResponseArticle', responseArticleSchema);