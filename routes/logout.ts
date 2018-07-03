import { createConnection } from "typeorm";
import { Token } from "../src/entity/Tokens";

var express = require('express')
var logout = express.Router()
let connect = createConnection()
logout.post('/',(req,res) => {
    connect.then( async connection => {
        let tokenRepository = connection.getRepository(Token)
      if(req.headers.token){
        let findAccessToken = await tokenRepository.findOne({
            token:req.headers.token,
            type:'access token'
        })
        let findRefreshToken = await tokenRepository.findOne({
            token:findAccessToken.token,
            type:'refresh token'
        })
        await tokenRepository.remove([findAccessToken,findRefreshToken])
        res.status(200).json({
            statusName:"logout success"
        })
      }else{
          res.status(401).json({
              statusName:'required token'
          })
      }  
    })
})

module.exports = logout
