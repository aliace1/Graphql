const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Models
const Classe = require('../../models/classe');
const User = require('../../models/user');
const Article = require('../../models/article');
const Devoir = require('../../models/devoir');
const Commentaire = require('../../models/commentaire');
const Livre = require('../../models/livre');
// const Admin = require('../../models/admin');
// const Ajout = require('../../models/Ajout');

const transformClasse = classe => {
    return { 
        ...classe._doc, 
        _id: classe._doc._id.toString()
     };
}

const users = async userIds => {
    try{
        let users = await User.find({_id: {$in: userIds}})
            return users.map(user => {
                return {
                    ...user._doc,
                    _id: user.id,
                    creator: classe.bind(this, user.creator)
                };
            });
    }
    catch(err) {
        throw err
    }
}

const articles = async articleIds => {
    try{
        let articles = await Article.find({_id: {$in: articleIds}})
            return articles.map(article => {
                return {
                    ...article._doc,
                    _id: article.id,
                    creator: classe.bind(this, article.creator)
                };
            });
    }
    catch(err) {
        throw err
    }
}

const livres = async livreIds => {
    try{
        let livres = await Livre.find({_id: {$in: livreIds}})
        return livres.map(livre => {
            return {
                ...livre._doc,
                _id: livre.id,
                creator: livre.bind(this, livre.creator)
            };
        });
    }
    catch(err) {
        throw err
    }
}

const devoirs = async devoirIds => {
    try{
        let devoirs = await Devoir.find({_id: {$in: devoirIds}})
            return devoirs.map(devoir => {
                return {
                    ...devoir._doc,
                    _id: devoir.id,
                    creator: classe.bind(this, devoir.creator)
                }
            });
    }
    catch(err) {
        throw err;
    }
}

const classe = async classeId => {
    try{
        let classe = await Classe.findById(classeId)
            return { 
                ...classe._doc, 
                _id: classe.id,
                createdUsers: users.bind(this, classe._doc.createdUsers),
                createdArticles: articles.bind(this, classe._doc.createdArticles),
                createdDevoirs: devoirs.bind(this, classe._doc.createdDevoirs) 
            }
    }
    catch(err){
        throw err
    }
}

const commentaires = async commentaireIds => {
    try{
        let commentaires = await Commentaire.find({_id: {$in: commentaireIds}})
            return commentaires.map(commentaire => {
                return {
                    ...commentaire._doc,
                    _id: commentaire.id,
                    creator: article.bind(this, commentaire.creator)
                };
            });
    }
    catch(err) {
        throw err
    }
}

const article = async articleId => {
    try{
        let article = await Article.findById(articleId)
            return {
                ...article._doc,
                _id: article.id,
                createdCommentaires: commentaires.bind(this, article._doc.createdCommentaires)
            };
    }
    catch(err){
        throw err
    }
}

module.exports = {
    commentaires: async (args, req) => {
        if(!req.isAuth){
            throw new Error('Non authorisé!')
        }
        try{
            let commentaires = await Commentaire.find()
                return commentaires.map(commentaire => {
                    return {
                        ...commentaire._doc,
                        _id: commentaire._doc._id.toString(),
                        creator: article.bind(this, commentaire._doc.creator)
                    }
            })
        }
        catch(err){
            throw err;
        }
    },
    createCommentaire: async (args, req) => {
        if(!req.isAuth){
            throw new Error('Non authorisé!')
        }
        const commentaire = new Commentaire({
            commentaire:args.commentaireInput.commentaire,
            date:new Date(args.commentaireInput.date),
            creator:args.commentaireInput.creator
        });
        let createdCommentaires;
        try{
            let result = await commentaire
            .save()
                createdCommentaires = { ...result._doc, _id: result.id, date:new Date(commentaire._doc.date).toISOString() }
                let article = await Article.findById(args.articleInput.articleId);
                if(!article){
                    throw new Error('Article n\'existe pas');
                }
                article.createdCommentaires.push(commentaire);
                await article.save();
                return createdCommentaires;
        }catch(err){
            throw err;
        };
    },
    deleteCommentaire: async (args) => {
        try{
            let commentaire = await Commentaire.findById()
            await Commentaire.deleteOne({_id: args.commentaireId});
            return commentaire;
        }
        catch(err){
            throw err
        }
    },
    devoirs: async (args, req) => {
        if(!req.isAuth){
            throw new Error('Non authorisé!')
        }
        try{
            let devoirs = await Devoir.find()
                return devoirs.map(devoir => {
                    return {
                        ...devoir._doc,
                        _id: devoir._doc._id.toString(),
                        creator: classe.bind(this, devoir._doc.creator)
                    }
                });
        }catch(err){
            throw err
        }
    },
    createDevoir: async (args,req) => {
        if(!req.isAuth){
            throw new Error('Non authorisé!')
        }
        const devoir = new Devoir({
            titre:args.devoirInput.titre,
            matiere:args.devoirInput.matiere,
            contenu:args.devoirInput.contenu,
            date:new Date(args.devoirInput.date),
            creator:args.devoirInput.creator
        });
        let createdDevoirs;
        try{
            let result = await devoir
            .save()
                createdDevoirs = { ...result._doc, _id: result.id, date:new Date(devoir._doc.date).toISOString() }
                let classe = await Classe.findById(args.classeInput.classeId)
                if(!classe){
                    throw new Error('Classe n\'existe pas')
                }
                classe.createdDevoirs.push(devoir);
                await classe.save();
                return createdDevoirs;
        }catch(err){
            throw err;
        };
    },
    deleteDevoir: async (args) => {
        try{
            let devoir = await Devoir.findById(args.devoirInput.devoirId)
            await Devoir.deleteOne({_id:args.devoirId});
            return devoir
        }
        catch(err){
            throw err
        }
    },
    livres: async (args, req) => {
        if(!req.isAuth){
            throw new Error('Non authorisé!')
        }
        try{
            let livres = await Livre.find()
            return livres.map(livre => {
                return {
                    ...livre._doc,
                    _id: livre._doc._id.toString(),
                    creator: classe.bind(this, livre._doc.creator)
                };
            });
        }
        catch(err){
            throw err
        }
    },
    createLivre: async (args, req) => {
        if(!req.isAuth){
            throw new Error('Non authorisé!')
        }
        const livre = new Livre({
            titre:args.articleInput.titre,
            matiere:args.articleInput.matiere,
            contenu:args.articleInput.contenu,
            date:new Date(args.articleInput.date),
            creator:args.livreInput.creator
        });
        let createdLivres;
        try{
            let result = await livre
            .save()
                createdLivres = { ...result._doc, _id: result.id, date:new Date(livre._doc.date).toISOString() }
                let classe = await Classe.findById(args.classeInput.classeId)
                if(!classe){
                    throw new Error('Classe n\'existe pas')
                }
                classe.createdLivres.push(livre)
                await classe.save()
                return createdLivres;
        }
        catch(err){
            throw err
        }
    },
    deleteLivre: async (args) => {
        try{
            let livre = await Livre.findById(args.livreInput.livreIds)
            await Livre.deleteOne({_id:args.livreId})
            return livre;
        }
        catch(err){
            throw err
        }
    },
    articles: async(args, req) => {
        if(!req.isAuth){
            throw new Error('Non authorisé!')
        }
        try{
            let articles = await Article.find()
                return articles.map(article => {
                    return {
                        ...article._doc,
                        _id: article._doc._id.toString(),
                        creator: classe.bind(this, article._doc.creator)
                    };
                });
        }
        catch(err){
            throw err
        }
    },
    createArticle: async (args,req) => {
        if(!req.isAuth){
            throw new Error('Non authorisé!')
        }
        const article = new Article({
            titre:args.articleInput.titre,
            matiere:args.articleInput.matiere,
            contenu:args.articleInput.contenu,
            date:new Date(args.articleInput.date),
            creator:args.articleInput.creator
        });
        let createdArticles;
        try{
            let result = await article
            .save()
                createdArticles = { ...result._doc, _id: result.id, date:new Date(article._doc.date).toISOString() }
                let classe = await Classe.findById(args.classeInput.classeId)
                if(!classe){
                    throw new Error('Classe n\'existe pas')
                }
                classe.createdArticles.push(article);
                await classe.save();
                return createdArticles;
        }
        catch(err){
            throw err
        }
    },
    deleteArticle: async (args) => {
        try{
            let article = await Article.findById(args.articleInput.articleId)
            await Article.deleteOne({_id:args.articleId});
            return article
        }
        catch(err){
            throw err
        }
    },
    classes: async () => {
        try{
            let classes = await Classe.find()
                return classes.map(classe => {
                    // console.log({ ...classe._doc });
                    return transformClasse(classe);
                });
        }catch(err){
            throw err
        }
    },
    createClasse: async (args) => {
        const classe = new Classe({
            nom:args.classeInput.nom
        });
        try{
            let result = await classe
            .save()
            return result = { ...result._doc, _id: result._doc._id.toString() };
        }
        catch(err){
            throw err;
        }
    },
    deleteClasse: async (args) => {
        try{
            let classe = await Classe.findById(args.classeInput.classeId)
            await Classe.deleteOne({_id: args.classeId});
            return classe;
        }
        catch(err){
            throw err
        }
    },
    updateClasse: async (args, req) => {
        console.log(args);
        try{
            let classe = await Classe.findById(args.classeId)
            await Classe.updateOne({_id: args.classeId});
            return classe;
        }
        catch(err){
            throw err
        }
    },
    login: async ({email, password}) => {
        let user = await User.findOne({email: email});
        if(!user){
            throw new Error('Utulisateur n\'existe pas');
        }
        if(user.isAjouter == 'n'){
            throw new Error('Vous n\'etes pas encore ajouter!')
        }
        let isEqual = await bcrypt.compare(password, user.password);
        if(!isEqual){
            throw new Error('Mots de passe incorrecte!')
        }
        const token = jwt.sign({userId: user.id, email: user.email}, 'somesupersecretkey', {
            expiresIn: '1h'
        });
        return {userId: user.id, token:token, tokenExpiration: 1};
    },
    users: async (args, req) => {
        // if(!req.isAuth){
        //     throw new Error('Non authorisé!')
        // }
        try{
            let users = await User.find()
                // return users.map(user => {
                //     return {
                //         ...user._doc,
                //         _id: user._doc._id.toString(),
                //         creator: classe.bind(this)
                //     };
                // });
                return users;

        }
        catch(err){
            throw err;
        }
    },
    createUser: async (args) => {
        // if(!req.isAuth){
        //     throw new Error('Non authorisé!')
        // }
        try{
            let existingUser = await User.findOne({ email:args.userInput.email })
                if(existingUser){
                    throw new Error('Utulisateur existe déjà!')
                }
                const hashedPassword = await bcrypt.hash(args.userInput.password, 12)
                const user = new User({
                    nom:args.userInput.nom,
                    prenom:args.userInput.prenom,
                    matricule:args.userInput.matricule,
                    email:args.userInput.email,
                    password:hashedPassword,
                    creator:args.userInput.creator,
                    isAdmin:args.userInput.isAdmin,
                    isAjout:args.userInput.isAjout
                });
            
                let result = await user.save()
                let classe = await Classe.findById(args.userInput.creator)
                if(!classe){
                    throw new Error('Classe n\'existe pas');
                }
                classe.createdUsers.push(user);
                classe.save();
                return result;
        }
        catch(err){
            throw err
        }
    },
    deleteUser: async (args) => {
        try{
            let user = await User.findById(req.userId)
            await User.deleteOne({_id: args.userId});
            return user;
        }
        catch(err){
            throw err
        }
    },
    updateUser: async (args) => {
        // console.log(user);
        try{
            let user = await User.findByIdAndUpdate(args.userId)
            await User.updateOne({_id:args.userId})
            return user;
        }
        catch(err){
            throw err
        }
    }
}