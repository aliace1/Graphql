const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const parser = require('word-text-parser')

//Models
const Classe = require('../../models/classe');
const User = require('../../models/user');
const Article = require('../../models/article');
const Devoir = require('../../models/devoir');
const Commentaire = require('../../models/commentaire');
const Livre = require('../../models/livre');
const RespCommentaire = require('../../models/RespCommentaire');
// const Admin = require('../../models/admin');
// const Ajout = require('../../models/Ajout');

const transformClasse = classe => {
    return { 
        ...classe._doc, 
        _id: classe._doc._id.toString()
     };
}

const commentaire = async commentaireId => {
    try{
        let commentaire = await Commentaire.findById(commentaireId)
        return {
            ...commentaire._doc,
            _id: commentaire.id,
            createdUser: users.bind(this, commentaire.createdUsers)
        };
    }
    catch(err){
        throw err
    }
}

const users = async userIds => {
    try{
        let users = await User.find({_id: {$in: userIds}})
            return users.map(user => {
                return {
                    ...user._doc,
                    _id: user.id,
                    creator: classe.bind(this, user.creator),
                    creator: commentaire.bind(this, user.creator)
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
                creator: classe.bind(this, livre.creator),
                createdCommentaires: commentaires.bind(this, livre._doc.createdCommentaires)
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
                    creator: classe.bind(this, devoir.creator),
                    createdCommentaires: commentaires.bind(this, devoir._doc.createdCommentaires)
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
                createdDevoirs: devoirs.bind(this, classe._doc.createdDevoirs),
                createdLivres: livres.bind(this, classe._doc.createdLivres)
            }
    }
    catch(err){
        throw err
    }
}

const livref = async livreId => {
    try{
        let livre1 = await Livre.findById(livreId)
        return {
            ...livre1._doc,
            _id: livre1.id,
            creator: classe.bind(this, livre1.creator),
            createdCommentaires: commentaires.bind(this, livre1._doc.createdCommentaires)
        };
    }
    catch(err){
        throw err
    }
}

const devoirD = async devoirId => {
    try{
        let devoir = await Devoir.findById(devoirId)
        return {
            ...devoir._doc,
            _id: devoir.id,
            creator: classe.bind(this, devoir.creator),
            createdCommentaires: commentaires.bind(this, devoir._doc.createdCommentaires)
        };
    }
    catch(err){
        throw err
    }
}

const respCommentaires = async respCommentaireIds => {
    try{
        console.log("test");
        let respCommentaires = await RespCommentaire.find({_id: {$in: respCommentaireIds}})
        return respCommentaires.map(respCommentaire => {
            return {
                ...respCommentaire._doc,
                _id: respCommentaire.id,
                createdCommentaires: commentaire.bind(this, respCommentaire._doc.createdCommentaires)
            };
        })
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
                    // creator: article.bind(this, commentaire.creator),
                    // creator: livref(livreId).bind(this, commentaire.creator),
                    // creator: devoirD(devoirId).bind(this, commentaire.creator),
                    createdUsers: users.bind(this, commentaire._doc.createdUsers)
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
                creator: classe.bind(this, article.creator),
                createdCommentaires: commentaires.bind(this, article._doc.createdCommentaires)
            };
    }
    catch(err){
        throw err
    }
}

module.exports = {
    respCommentaires: async (args, req) => {
        if(!req.isAuth){
            throw new Error('Non authorisé!')
        }
        try{
            let respCommentaires = await RespCommentaire.find()
            // return respCommentaires.map(respCommentaire => {
            //     return {
            //         ...respCommentaire._doc,
            //         _id: respCommentaire._doc._id.toString(),
            //         creator: commentaire.bind(this, commentaire._doc.creator)
            //     }
            // });
            // console.log(respCommentaire);
            return respCommentaires;
        }
        catch(err){
            throw err
        }
    },
    createRespCommentaire: async (args, req) => {
        // if(!req.isAuth){
        //     throw new Error('Non authorisé!')
        // }
        // console.log(args.respCommentaireInput);
        const newUser1 = await User.findById(args.respCommentaireInput.createdUsers)
        const respCommentaires = new RespCommentaire({
            idCommentaire:args.respCommentaireInput.idCommentaire,
            commentaire:args.respCommentaireInput.commentaire,
            date:new Date(args.respCommentaireInput.date),
            creator:args.respCommentaireInput.creator,
            createdUsers:newUser1
        });
        let createdCommentaires;
        try{
            // console.log(respCommentaires);
            let result = await respCommentaires.save()
                createdCommentaires = { ...result._doc, _id: result.id, date:new Date(result._doc.date).toISOString() }
                let commentaire = await Commentaire.findById(args.respCommentaireInput.idCommentaire);
                if(!commentaire){
                    throw new Error('Commentaire n\'existe pas');
                }
                commentaire.createdCommentaires.push(respCommentaires);
                await commentaire.save();
                // console.log(respCommentaire);
                return respCommentaires;
        }
        catch(err){
            throw err
        }
    },
    commentaires: async (args, req) => {
        if(!req.isAuth){
            throw new Error('Non authorisé!')
        }
        try{
            let commentaires = await Commentaire.find()
            //     return commentaires.map(commentaire => {
            //         return {
            //             ...commentaire._doc,
            //             _id: commentaire._doc._id.toString(),
            //             // creator: article.bind(this, commentaire._doc.creator)
            //         }
            // })
            return commentaires;
        }
        catch(err){
            throw err;
        }
    },
    createCommentaire: async (args, req) => {
        // if(!req.isAuth){
        //     throw new Error('Non authorisé!')
        // }
        const newUser = await User.findById(args.commentaireInput.createdUsers)
        const commentaire = new Commentaire({
            commentaire:args.commentaireInput.commentaire,
            date:new Date(args.commentaireInput.date),
            creator:args.commentaireInput.creator,
            createdUsers:newUser
        });
        let createdCommentaires;
        try{
            let result = await commentaire
            .save()
                createdCommentaires = { ...result._doc, _id: result.id, date:new Date(commentaire._doc.date).toISOString() }
                let article = await Article.findById(args.commentaireInput.creator);
                if(!article){
                    throw new Error('Article n\'existe pas');
                }
                article.createdCommentaires.push(commentaire);
                await article.save();
                return createdCommentaires;
            //     console.log(result);
            // return result = { ...result._doc, _id: result.id, date: new Date().toISOString() }
        }catch(err){
            throw err;
        };
    },
    deleteCommentaire: async (args, req) => {
        if(!req.isAuth && !req.isAdmin){
            throw new Error('Vous n\'etes pas autorisé à cette opération!!')
        }
        try{
            let commentaire = await Commentaire.findById(args.commentaireId)
            await Commentaire.deleteOne({_id: args.commentaireId});
            if(commentaire){
                return {action:true};
            }
            return {action:false}
        }
        catch(err){
            throw err
        }
    },
    updateCommentaire: async (args, req) => {
        // if(!req.isAuth && !req.isAdmin){
        //     throw new Error('Vous n\'etes pas autorisé à cette opération!!')
        // }
        let commentaire = await Commentaire.findById(args.commentaireId)
        await commentaire.updateOne({commentaire:args.commentaire})
        return commentaire.save();
    },

    //Devoir Resolver
    devoirs: async (args, req) => {
        if(!req.isAuth){
            throw new Error('Non authorisé!')
        }
        try{
            let devoirs = await Devoir.find()
                // return devoirs.map(devoir => {
                //     return {
                //         ...devoir._doc,
                //         _id: devoir._doc._id.toString(),
                //         creator: classe.bind(this, devoir._doc.creator)
                //     }
                // });
                return devoirs;
        }catch(err){
            throw err
        }
    },
    createDevoir: async (args,req) => {
        // if(!req.isAuth){
        //     throw new Error('Non authorisé!')
        // }
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
                let classe = await Classe.findById(args.devoirInput.creator)
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
    deleteDevoir: async (args, req) => {
        if(!req.isAuth && !req.isAdmin){
            throw new Error('Vous n\'etes pas autorisé à cette opération!!')
        }
        try{
            let devoir = await Devoir.findById(args.devoirId)
            await Devoir.deleteOne({_id:args.devoirId});
            if(devoir){
                return {action:true};
            }
            return {action:false}
        }
        catch(err){
            throw err
        }
    },
    updateDevoir: async (args, req) => {
        if(!req.isAuth && !req.isAdmin){
            throw new Error('Vous n\'etes pas autorisé à cette opération!!')
        }
        let devoir = await Devoir.findById(args.devoirId)
        await devoir.updateOne({titre:args.titre, matiere:args.matiere, contenu:args.contenu})
        return devoir.save();
    },

    //Livre Resolver
    livres: async (args, req) => {
        if(!req.isAuth){
            throw new Error('Non authorisé!')
        }
        try{
            let livres = await Livre.find()
            // return livres.map(livre => {
            //     return {
            //         ...livre._doc,
            //         _id: livre._doc._id.toString(),
            //         creator: classe.bind(this, livre._doc.creator)
            //     };
            // });
            return livres;
        }
        catch(err){
            throw err
        }
    },
    createLivre: async (args, req) => {
        // console.log(req.isAuth);
        // if(!req.isAuth){
        //     throw new Error('Non authorisé!')
        // }
        try{
            // console.log("createLivre");
            const livre = new Livre({
                titre:args.livreInput.titre,
                matiere:args.livreInput.matiere,
                contenu:args.livreInput.contenu,
                date:new Date(args.livreInput.date),
                creator:args.livreInput.creator
            });
            let result = await livre.save()
            // console.log(result);
            let classe = await Classe.findById(args.livreInput.creator)
            if(!classe){
                throw new Error('Classe n\'existe pas')
            }
            classe.createdLivres.push(livre)
            await classe.save()
            return result;
        }
        catch(err){
            throw err
        }
    },
    deleteLivre: async (args, req) => {
        if(!req.isAuth && !req.isAdmin){
            throw new Error('Vous n\'etes pas autorisé à cette opération!!')
        }
        try{
            let livre = await Livre.findById(args.livreId)
            await Livre.deleteOne({_id:args.livreId})
            if(livre){
                return {action:true};
            }
            return {action:false};
        }
        catch(err){
            throw err
        }
    },
    updateLivre: async (args, req) => {
        if(!req.isAuth && !req.isAdmin){
            throw new Error('Vous n\'etes pas autorisé à cette opération!!')
        }
        let livre = await Livre.findById(args.livreId)
        await livre.updateOne({titre:args.titre, matiere:args.matiere, contenu:args.contenu})
        return livre.save();
    },

    //Article Resolver
    articles: async(args, req) => {
        // if(!req.isAuth){
        //     throw new Error('Non authorisé!')
        // }
        try{
            let articles = await Article.find()
            
                // return articles.map(async article => {
                //     console.log({classe:Classe.findById(article.creator).exec()});
                //     const classe = await Classe.findById(article.creator).exec()
                    // return {
                    //     ...article._doc,
                    //     _id: article._doc._id.toString(),
                    //     creator: classe.bind(this, article._doc.creator)
                    // };
                    // console.log(article.creator);
                    
                // });
                return articles
                    // return new ResponseArticle({ 
                    //     _id: article._id,
                    //     titre: article.titre,
                    //     matiere: article.matiere,
                    //     contenu: article.contenu,
                    //     date: article.date,
                    //     classe: classe,
                    //     createdCommentaires: article.createdCommentaires
                    //  })
        }
        catch(err){
            throw err
        }
    },
    createArticle: async (args, req) => {
        // console.log(args);
        // if(!req.isAuth){
        //     throw new Error('Non authorisé!')
        // }
        try{
            // console.log("createLivre");
            const article = new Article({
                titre:args.articleInput.titre,
                matiere:args.articleInput.matiere,
                contenu:args.articleInput.contenu,
                date:new Date(args.articleInput.date),
                creator:args.articleInput.creator
            });
            let result = await article.save()
            // console.log(result);
            let classe = await Classe.findById(args.articleInput.creator)
            if(!classe){
                throw new Error('Classe n\'existe pas')
            }
            classe.createdLivres.push(article)
            await classe.save()
            return result;
        }
        catch(err){
            throw err
        }
        
        // parser(args.articleInput.contenu, async (resultList) => {
        //     console.log(resultList)
        //     const article = new Article({
        //         titre:args.articleInput.titre,
        //         matiere:args.articleInput.matiere,
        //         contenu:resultList,
        //         date:new Date(args.articleInput.date),
        //         creator:args.articleInput.creator
        //     });
        //     let createdArticles;
        //     try{
        //         let result = await article
        //         .save()
        //             createdArticles = { ...result._doc, _id: result.id, date:new Date(article._doc.date).toISOString() }
        //             let classe = await Classe.findById(args.articleInput.creator)
        //             if(!classe){
        //                 throw new Error('Classe n\'existe pas')
        //             }
        //             classe.createdArticles.push(article);
        //             await classe.save();
        //             return createdArticles;
        //     }
        //     catch(err){
        //         throw err
        //     }

    },
    deleteArticle: async (args, req ) => {
        if(!req.isAuth && !req.isAdmin){
            throw new Error('Vous n\'etes pas autorisé à cette opération!!')
        }
        try{
            console.log(args.articleId);
            let article = await Article.findById(args.articleId)
            // console.log(article);
            await Article.deleteOne({_id:args.articleId});
            if(article){
                return {action:true};
            }
            // console.log(Article);
            return {action:false};
            
        }
        catch(err){
            throw err
        }
    },
    updateArticle: async (args, req) => {
        // if(!req.isAuth && !req.isAdmin){
        //     throw new Error('Vous n\'etes pas autorisé à cette opération!!')
        // }
        try{
            let article = await Article.findById(args.articleId)
            await article.updateOne({titre:args.titre, matiere:args.matiere, contenu:args.contenu})
            await article.save();
            return article;
        }catch(err){
            throw err
        }
    },

    //Classe Resolver
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
    deleteClasse: async (args, req) => {
        if(!req.isAuth && !req.isAdmin){
            throw new Error('Vous n\'etes pas autorisé à cette opération!!')
        }
        try{
            let classe = await Classe.findById(args.classeId)
            await Classe.deleteOne({_id: args.classeId});
            if(classe){
                return {action:true};
            }
            return {action:false};
        }
        catch(err){
            throw err
        }
    },
    updateClasse: async (args, req) => {
        // console.log(args);
        if(!req.isAuth && !req.isAdmin){
            throw new Error('Vous n\'etes pas autorisé à cette opération!!')
        }
        try{
            let classe = await Classe.findById(args.classeId)
            await classe.updateOne({nom:args.nom});
            return classe.save();
        }
        catch(err){
            throw err
        }
    },

    //Login & User Resolver
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
        const token = jwt.sign({userId: user.id, email: user.email, creator:user.creator}, 'somesupersecretkey', {
            expiresIn: '168h'
        });
        return {userId: user.id, token:token, tokenExpiration: 1, isAdmin:user.isAdmin, isAjout:user.isAjout};
    },
    users: async (args, req) => {
        // if(!req.isAuth){
        //     throw new Error('Non authorisé!')
        // }out
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
    deleteUser: async (args, req) => {
        if(!req.isAuth && !req.isAdmin){
            throw new Error('Vous n\'etes pas autorisé à cette opération!!')
        }
        try{
            let user = await User.findById(args.userId)
            await User.deleteOne({_id: args.userId});
            if(user){
                return {action:true};
            }
            return {action:false};
        }
        catch(err){
            throw err
        }
    },
    updateUser: async (args, req) => {
        // console.log(user);
        if(!req.isAuth && !req.isAdmin){
            throw new Error('Vous n\'etes pas autorisé à cette opération!!')
        }
        try{
            let user = await User.findById(args.userId)
            await user.updateOne({nom:args.nom, prenom:args.prenom, matricule:args.matricule, email:args.email, creator:args.creator, isAdmin:args.isAdmin, isAjout:args.isAjout})
            return user.save();
        }
        catch(err){
            throw err
        }
    }
}