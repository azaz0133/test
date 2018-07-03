import { Connection } from 'typeorm';
import {createConnection,getRepository} from "typeorm";
import {Token} from '../src/entity/Tokens'
var jwt  =require('jsonwebtoken')
import {User} from '../src/entity/User'
import {generate} from '../aboutTokens/generateToken'
import jwtInfo from '../aboutTokens/jwtInfo'
import {expired} from "../aboutTokens/expiresToken"
    let connect = createConnection()

export async function getAccessToken(req,res){
    if(req.headers.Token){
         connect.then(async connection=>{
        let  tokenRepo = await getRepository(Token);
        let findRefreshToken = await tokenRepo.findOne({
             token: req.headers.token
        },{relations:['token']})
                                            
        if(findRefreshToken !== undefined){
             if(findRefreshToken.expired < new Date()){
                 res.status(401).json({
                     status_name : "token is expired"
                 })
             }
             
        else{
            let findAccessToken = await tokenRepo.findOne({
                token:findRefreshToken.token,
                type : "access token"
          },{relations:['token']})
            if(findAccessToken.expired < new Date()){
                let newAccess = generate.access();
                 findAccessToken.token = newAccess
                 findRefreshToken.token = generate.refresh()
                 findAccessToken.type = 'access token'
                 findAccessToken.expired = expired.getExpiredAccess()
                 findRefreshToken.type = 'refresh token'
                 findRefreshToken.expired = expired.getExpiredRefersh()
            }
            await tokenRepo.save(findRefreshToken)
            await tokenRepo.save(findAccessToken)
            res.json(200).json({
                status_name: "success",
                access_token: findAccessToken,
                refresh_token: findRefreshToken
            })
        }
        
         }
         else {
             res.status(400).json({
                 status_name:"token is Empty"
             })
         }
      })
    }
}
