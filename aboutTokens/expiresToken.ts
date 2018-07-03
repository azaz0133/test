var jwt = require('jsonwebtoken')
import jwtInfo from '../aboutTokens/jwtInfo'

export let expired ={
        getExpiredRefersh :function getExpiredRefreshToken(){
            return new Date(new Date().setDate(new Date().getMinutes()+jwtInfo.refreshToken.expiresIn))
        },
        getExpiredAccess : function getExpiredAccessToken(){
            return new Date(new Date().setDate(new Date().getMinutes()+jwtInfo.accessToken.expiresIn))
        }
}
