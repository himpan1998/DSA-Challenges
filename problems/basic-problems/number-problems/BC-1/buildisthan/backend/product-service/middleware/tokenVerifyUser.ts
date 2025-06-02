const { verify } = require('jsonwebtoken')
require('dotenv').config()


/**
 * 
 * @param req 
 * @param res 
 * create category
 * PassToke:  HeaderName:Authorization Toker:Bearer or Token
 */

 const Auth = {
    checkToken: (req:any, res:any, next:any) => {

        let token = req.get('authorization');

        if (token) {
            token = token.slice(7);
            verify(token, process.env.SECRET_KEY, (err:any, result:any) => {
                if (err) {
                    res.json({
                        status: 401,
                        success: "failed",
                        message: 'Invalid Token'
                    });
                }
                else {
                    next();
                }
            })
        }
        else {
            res.json({
                status: 401,
                success: "Failed",
                message: 'Access denied! unauthorized user'
            })
        }
    }
}
export default Auth
