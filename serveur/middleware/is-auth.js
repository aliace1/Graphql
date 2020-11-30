const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    // console.log({authHeader});
    if(!authHeader){
        req.isAuth = false;
        req.isAdmin = "n";
        return next();
    }

    const token = authHeader.split(' ')[1];
    if(!token || token === ''){
        req.isAuth = false;
        req.isAdmin = "n";
        return next();
    }
    
    let decodedToken;
    try{
        decodedToken = jwt.verify(token, 'somesupersecretkey');
    }
    catch(err){
        req.isAuth = false;
        req.isAdmin = "n";
        return next();
    }
    if(!decodedToken){
        req.isAdmin = false;
        req.isAuth = false;
        return next();
    }
    req.isAuth = true;
    req.isAdmin = "y";
    req.userId = decodedToken.userId;
    next();
}