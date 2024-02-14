const jwt = require("jsonwebtoken")

function authenticate(req, res) {
 
    const { username, password } = req.body;
    console.log(password===process.env.PASSWORD)

    if (username.toLowerCase() === process.env.USER_NAME.toLowerCase() && password === process.env.PASSWORD) {
        const token = jwt.sign({username:username},process.env.JWT_SEC,{expiresIn:'3d'});
        res.json({success:true, token: token})

    } else {
        res.status(401).json({ success: false, error: "login failed." });
    }
}

async function verify(req,res,next){
    try {
        const token = req.headers["auth-token"];
        
        const result = jwt.verify(token, process.env.JWT_SEC);
        if (result.username.toLowerCase() === process.env.USER_NAME.toLowerCase()) {
          next();
        } else {
          res.json({ success: false, error: "Invalid Token" });
        }
      } catch (error) {
        res.json({ success: false, error: "Token verification failed" });
      }
}

module.exports = {authenticate, verify}