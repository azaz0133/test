var jwt = require('jsonwebtoken')
import jwtInfo from '../aboutTokens/jwtInfo'


export let generate = {
                         refresh : function getRefreshToken(){
                        return jwt.sign({},jwtInfo.refreshToken.key,{expiresIn:jwtInfo.refreshToken.expiresIn})
                    },
                         access : function getAccessToken(){
                        return jwt.sign({},jwtInfo.accessToken.key,{expiresIn:jwtInfo.accessToken.expiresIn})
                    }
}



