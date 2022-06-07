const jwt = require('jsonwebtoken');

const TOKEN_KEY = "RANDOM_KEY";
function authenticateToken(req, res, next) {
    //const secret = 'Snippet_SecretKEY';
    const authHeader = req.headers.authorization
    if (authHeader != undefined) { 
    
    const token = authHeader && authHeader.split(" ")[1];
    const isCustomAuth = token.length < 500; //check for jwt token or google token
    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, TOKEN_KEY);
      
      req.user = decodedData.data;
    } else {
      decodedData = jwt.decode(token);

        req.user = decodedData?.user;
    }
    }

    next();
}

function generateAccessToken(username) {
    return jwt.sign({data: username}, TOKEN_KEY, {
        expiresIn: '1h'
    });
}

module.exports = {
    authenticateToken,
    generateAccessToken
};