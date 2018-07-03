var express = require('express')
var jwt = require('jsonwebtoken')
var crypto = require('crypto')
import {User} from "../src/entity/User";
import "reflect-metadata";
import {createConnection,getRepository} from "typeorm";
import {generate} from '../aboutTokens/generateToken'
import { Token } from "../src/entity/Tokens";
import {expired} from '../aboutTokens/expiresToken'
var router = express.Router()
let connect = createConnection()

router.post('/',(req,res)=>{
       let username = req.body.username
       let password = req.body.password
       const hash = crypto.createHmac('sha512', password)
                    .update('tfosettal')
                   .digest('hex');
        if(username&&password){
            connect.then(async connection =>{
                let userRepo = getRepository(User)
                let finduser = await userRepo.findOne({
                    username : username,
                    password : hash
                })

                if(finduser!== undefined){
                    console.log("sssssssssss",jwt.sign({},"aaaa"))
                    console.log("sssssssss")
                    
                    let accessToken = generate.access()
                    let refreshToken =  generate.refresh()
                    
                    let tokenRefresh = new Token()
                    let tokenAccess  = new Token()
                    tokenAccess.token = accessToken
                    tokenAccess.type  = 'access token'
                    tokenAccess.expired = expired.getExpiredAccess()
                    tokenRefresh.token = refreshToken
                    tokenRefresh.type = 'refresh token'
                    tokenRefresh.expired = expired.getExpiredRefersh();
                  await connection.manager.save(tokenRefresh)
                  await connection.manager.save(tokenAccess)
                  
                    finduser.token = [tokenAccess,tokenRefresh]
                await connection.manager.save(finduser)
                    //console.log("sssssssss")
                    res.status(200).json({
                        status : "OK",
                        status_login : "login complete"
                    })
                }
                else {
                    res.status(400).json({
                        status : "Error",
                        status_login : "username or password are incomplete."
                    })
                }
            })
        }

        else {
            res.json({
                message:"please insert username or password "
            })
        }
})

module.exports= router;
