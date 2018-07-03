// import {Event} from '../src/entity/Event'
// import {Article} from '../src/entity/Article'
// import { Connection } from 'typeorm';
// import {createConnection,getRepository} from "typeorm";
// var express = require('express');
// var router = express.Router();

// let connect = createConnection();


//     router.post('/:id',(req,res)=>{
//         connect.then(async connection=>{
//             const articleRepository = connection.getRepository(Article)
//             let y = await articleRepository.findByIds([1])
//             const eventRepository = connection.getRepository(Event)
//             let x =await eventRepository.findOne(req.params.id)
//             x.has = y[0]
//             await connection.manager.save(x);
//         })
//     })

//     module.exports = router