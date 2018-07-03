import {User} from "../src/entity/User";
import "reflect-metadata";
import {createConnection,getRepository} from "typeorm";
const crypto = require('crypto');
var express = require('express');
var router = express.Router();

let connect = createConnection();
    
router.post('/register',(req,res,next)=>{
    let {body} = req
    let check = [
        "email","password","username"   
    ]
    let count =0;
  let i=check.length-1;
    for(i=0;i<check.length;i++){
        if(body[check[i]]!=undefined){
            count++
        }
    }
  if(count==check.length){
      connect.then(async connection=>{
        const regis = new User();
        regis.firstName = body.email
        regis.username = body.username
        const pass = body.password
        const encryptPassword = crypto.createHmac('sha256',pass)
                                .update('tfosettal')
                                .digest('hex')
        regis.password = encryptPassword;
        await connection.manager.save(regis);
        res.send("complete");
        
    })
  }
  else{
      res.status(400).send("input incorrect")
  }
    
})

module.exports = router;

