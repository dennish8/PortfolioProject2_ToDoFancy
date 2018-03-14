const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../../configuration');

module.exports = (req,res,next)=>{
    try{
        const token = req.headers.authorization;
        const decoded = jwt.verify(token,JWT_SECRET);
        console.log(decoded);
        next()
    } catch (err){
        res.status(400).json({message:`Authentication error: ${err}`});
    }
}