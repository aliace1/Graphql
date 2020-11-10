const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentaireSchema = new Schema({
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
        ref:'Article'
    }
});

module.exports = mongoose.model('Commentaire', commentaireSchema);