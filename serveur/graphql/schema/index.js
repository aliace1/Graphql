const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type Classe {
    _id: ID!
    nom: String!
    createdUsers: [User!]
    createdArticles: [Article!]
    createdDevoirs: [Devoir!]
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
    creator: Article!
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
}

input CommentaireInput {
    commentaire: String!
    date: String!
}

type RootQuery {
    classes: [Classe!]!
    articles: [Article!]!
    livres: [Livre!]!
    commentaires: [Commentaire!]!
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
    deleteUser(userId: ID!): User
    deleteArticle(articleId: ID!): Article
    deleteLivre(livreId: ID!): Livre
    deleteClasse(classeId: ID!):Classe
    deleteCommentaire(commentaireId: ID!):Commentaire
    deleteDevoir(devoirId: ID!): Devoir
    updateClasse(classeId: ID!, nom: String!): Classe
    updateUser(userId: ID!, nom: String!, prenom: String!, matricule: String!, email: String!): User
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`)