const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type Classe {
    _id: ID!
    nom: String!
    createdUsers: [User!]
    createdArticles: [Article!]
    createdDevoirs: [Devoir!]
    createdLivres: [Livre!]!

}

type User {
    _id: ID!
    nom: String!
    prenom: String!
    matricule: String!
    email: String!
    isAdmin: String!
    isAjout: String!
    password: String!
    creator: String!
}

type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
    isAdmin: String!
    isAjout: String!
}

type Article {
    _id: ID!
    titre: String!
    matiere: String!
    contenu: String!
    date: String!
    creator: String!
    createdCommentaires: [Commentaire!]
}

type isDelete {
    action: Boolean!
}

type Livre {
    _id: ID!
    titre: String!
    matiere: String!
    contenu: String!
    date: String!
    creator: String!
    createdCommentaires: [Commentaire!]
}

type Devoir {
    _id: ID!
    titre: String!
    matiere: String!
    contenu: String!
    date: String!
    creator: String!
}

type Commentaire {
    _id: ID!
    commentaire: String!
    date: String!
    creator: String!
    createdUsers:[User!]
    createdCommentaires:[Commentaire!]
}

type RespCommentaire {
    _id: ID!
    idCommentaire: String!
    commentaire: String!
    date: String!
    creator: String!
    createdUsers: [User!]
    
}

type ResponseArticle {
    _id: ID!
    titre: String!
    matiere: String!
    contenu: String!
    date: String!
    classe: Classe
    createdCommentaires: [Commentaire!]
}

input ClasseInput {
    nom: String!
}

input UserInput {
    nom: String!
    prenom: String!
    matricule: String!
    email: String!
    password: String!
    isAdmin: String!
    isAjout: String!
    creator: String!
}

input ArticleInput {
    titre: String!
    matiere: String!
    contenu: String!
    date: String!
    creator: String!
}

input LivreInput {
    titre: String!
    matiere: String!
    contenu: String!
    date: String!
    creator: String!   
}

input DevoirInput {
    titre: String!
    matiere: String!
    contenu: String!
    date: String!
    creator: String!
}

input CommentaireInput {
    commentaire: String!
    date: String!
    creator: String!
    createdUsers: String!

}

input RespCommentaireInput {
    idCommentaire: String!
    commentaire: String!
    date: String!
    creator: String!
    createdUsers: String!
}

type RootQuery {
    classes: [Classe!]!
    articles: [Article!]!
    livres: [Livre!]!
    commentaires: [Commentaire!]!
    respCommentaires: [RespCommentaire!]!
    devoirs: [Devoir!]!
    users: [User!]!
    login(email:String!, password:String): AuthData!
}

type RootMutation {
    createClasse(classeInput: ClasseInput):Classe
    createUser(userInput: UserInput): User
    createArticle(articleInput: ArticleInput): Article
    createLivre(livreInput: LivreInput): Livre
    createDevoir(devoirInput: DevoirInput): Devoir
    createCommentaire(commentaireInput: CommentaireInput): Commentaire
    createRespCommentaire(respCommentaireInput: RespCommentaireInput): RespCommentaire
    deleteUser(userId: ID!): isDelete
    deleteArticle(articleId: ID!): isDelete
    deleteLivre(livreId: ID!): isDelete
    deleteClasse(classeId: ID!): isDelete
    deleteCommentaire(commentaireId: ID!): isDelete
    deleteDevoir(devoirId: ID!): isDelete
    updateCommentaire(commentaireId: ID!, commentaire: String!):Commentaire
    updateLivre(livreId: ID!, titre: String!, matiere: String!, contenu: String!): Livre
    updateDevoir(devoirId: ID!, titre: String!, matiere: String!, contenu: String!): Devoir
    updateArticle(articleId: ID!, titre: String!, matiere: String!, contenu: String!): Article
    updateClasse(classeId: ID!, nom: String!): Classe
    updateUser(userId: ID!, nom: String!, prenom: String!, matricule: String!, email: String!, creator: String!, isAdmin: String!, isAjout: String!): User
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`)