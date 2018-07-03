var express = require('express');
var router = express.Router();
import "reflect-metadata";
import {createConnection,getRepository} from "typeorm";
import {User} from "../src/entity/User";
import {Slide} from '../src/entity/Slide'
import {Gallery} from '../src/entity/Gallery'
import {Article} from '../src/entity/Article'
import {Permission} from '../src/entity/Permission'
import {Role} from '../src/entity/Role'
import {Tag} from '../src/entity/Tag'
import {Event} from '../src/entity/Event'
import {getConnection} from "typeorm";

/* GET permiss listing. */
router.get('/', function(req, res, next) {
  createConnection().then(async c=>{
    const permisRepository = getRepository(Permission);
  await permisRepository.find({ select: ["id","name" ] }).then(data=>{
    console.log(data)
    res.json(data);
  })
  })
  
});
//get by ..
router.get('/:id',(req,res)=>{
  createConnection().then(async c=>{
    const permisRepository = getRepository(Permission);
  await permisRepository.find({ select: ["id","name"],where : { id:req.params.id} }).then(data=>{
    console.log(data)
    res.json(data);
  })
  })
})
//add permis
router.post('/',(req,res)=>{
  createConnection().then(async connection => {
    const permis = new Permission();
    permis.name =req.body.name
    await connection.manager.save(permis);
  })
})
//edit permis
router.put('/:id',(req,res)=>{
  createConnection().then(async c=>{
    await getConnection()
    .createQueryBuilder()
    .update(Permission)
    .set({ })
    .where("id = :id", { id: req.params.id })
    .execute();
  })
})
//delete
router.delete('/:id',(req,res)=>{
  createConnection().then(async c=>{
    await getConnection()
    .createQueryBuilder()
    .delete()
    .from(Permission)
    .where("id = :id", { id: req.params.id })
    .execute();
  })
})
module.exports = router;