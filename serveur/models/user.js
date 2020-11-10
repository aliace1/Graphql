const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    nom:{
        type:String,
        required:true
    },
    prenom:{
        type:String,
        required:true
    },
    matricule:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    creator:{
        type: Schema.Types.ObjectId,
        ref:'Classe'
    },
    isAdmin:{
        type: String,
        ref:'Admin'
    },
    isAjout:{
        type: String,
        ref:'Ajout'
    }
});

module.exports = mongoose.model('User', userSchema);