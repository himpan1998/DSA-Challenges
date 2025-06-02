const jwt = require('jsonwebtoken')
const extractUserInfo = (req : any, res : any, next : any) => {
    const result : any = req.headers['authorization'] ? jwt.decode(req.headers['authorization'].split(' ')[1]) : ''
    req.user_id = result?.id || 0;
    next();
}

export default extractUserInfo