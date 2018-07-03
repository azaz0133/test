import {User} from '../src/entity/User'
import {Role} from '../src/entity/Role'
import { Connection } from 'typeorm';
import {createConnection,getRepository} from "typeorm";
let express = require('express')
let router = express.Router();
let connect = createConnection();

    router.post('/:id',(req,res)=>{
        connect.then(async connection=>{
           
            
            const eventRapository = connection.getRepository(Role)
            const userRepository = connection.getRepository(User);
            let x = await userRepository.findOne(req.params.id)
            let y = await eventRapository.findByIds([])
            const user = x;
            user.has = [];
            await connection.manager.save(user);
        })
    })



module.exports = router