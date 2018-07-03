import {User} from '../src/entity/User'
import {Event} from '../src/entity/Event'
import { Connection } from 'typeorm';
import {createConnection,getRepository} from "typeorm";
var express = require('express');
var router = express.Router();

let connect = createConnection();
    
    //register event
    router.post('/:id',(req,res)=>{
        connect.then(async connection=>{
           
            
            const eventRapository = connection.getRepository(Event)
            const userRepository = connection.getRepository(User);
            let x = await userRepository.findOne(req.params.id)
            let y = await eventRapository.findByIds([1,2])
            const user = x;
            user.categories = [y[0],y[1]];
            await connection.manager.save(user);

        })
    })

    //undo event

        router.delete('/:id',(req,res)=>{
            connect.then(async connection=>{
            const eventRapository = connection.getRepository(Event)
            const userRepository = connection.getRepository(User);
            let x = await userRepository.findOne(req.params.id)
            let user = x
            user.categories = [];
            await connection.manager.save(user);
            })
        })



module.exports = router