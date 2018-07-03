import {Event} from '../src/entity/Event'
var express = require('express');
var router = express.Router();
import "reflect-metadata";
import {createConnection,getRepository} from "typeorm";
import {getConnection} from "typeorm";

let connect = createConnection()
    router.get('/show',(req,res)=>{
        connect.then(async connection=>{
            const eventRepository = getRepository(Event);
            let find =await eventRepository.find({order:{
                                                            created_at:"DESC"
            }});
            if(find !== undefined){
                 res.status(200).json(find);
            }
           else {
               res.status(400).json({
                   result: "have no title in database please check name of title"
               })
           }
        })
    })

module.exports = router