const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classeSchema = new Schema({
    nom:{
        type:String,
        required:true
    },
    createdUsers:[
        {
            type: Schema.Types.ObjectId,
            ref:'User'
        }
    ],
    createdArticles:[
        {
            type:Schema.Types.ObjectId,
            ref:'Article'
        }
    ],
    createdDevoirs:[
        {
            type:Schema.Types.ObjectId,
            ref:'Devoir'
        }
    ],
    createdLivres:[
        {
            type:Schema.Types.ObjectId,
            ref:'Livre'
        }
    ]
});

module.exports = mongoose.model('Classe', classeSchema);
