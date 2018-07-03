var jwt = require('jsonwebtoken')

 const jwtInfo = {
     refreshToken:{
         key : 'latte',
        type:'refresh token',
     expiresIn: 60*60*24*20
     },
     accessToken:{
         key:'latte',
         type:'access token',
         expiresIn:60*60
     }
     
 }
 export default jwtInfo