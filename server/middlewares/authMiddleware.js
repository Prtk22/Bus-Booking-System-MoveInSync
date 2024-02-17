const jwt = require("jsonwebtoken");

const isLoggedIn = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).send({
        message: "Auth failed",
        success: false,
      });
    }
    const decodedToken = jwt.verify(token, process.env.jwt_secret);
    req.auth = decodedToken;
    req.params.userId = decodedToken.userId;
    next();
  } catch (error) {
    res.status(401).send({
      message: "Auth failed",
      success: false,
    });
  }
};

const isAdmin = (req,res,next) => {
  if(!req.auth.isAdmin) {
    res.status(401).send({
      message: "Unauthorized Access",
      success: false,
    });
    return;
  }
  next();
}

module.exports = { isLoggedIn, isAdmin }
