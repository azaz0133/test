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
let connections = createConnection();
/* GET tags listing. */
router.get('/', function(req, res, next) {
  connections.then(async c=>{
    const tagRepository = getRepository(Tag);
  await tagRepository.find({ select: ["id","title" ] }).then(data=>{
    console.log(data)
    res.json(data);
  })
  })
  
});
//get by ..
router.get('/:id',(req,res)=>{
  connections.then(async c=>{
    const tagRepository = getRepository(Tag);
  await tagRepository.find({ select: ["id","title"],where : { id:req.params.id} }).then(data=>{
    console.log(data)
    res.json(data);
  })
  })
})
//add tag
router.post('/',(req,res)=>{
  connections.then(async connection => {
    const tag = new Tag();
    tag.title =req.body.title
    console.log(tag)
    await connection.manager.save(tag);
  })
  res.json(req.body)
})
//edit tag
router.put('/:id',(req,res)=>{
  connections.then(async c=>{
    await getConnection()
    .createQueryBuilder()
    .update(Tag)
    .set({ })
    .where("id = :id", { id: req.params.id })
    .execute();
  })
})
//delete
router.delete('/:id',(req,res)=>{
  connections.then(async c=>{
    await getConnection()
    .createQueryBuilder()
    .delete()
    .from(Tag)
    .where("id = :id", { id: req.params.id })
    .execute();
  }).then(()=>{
    res.send("Delete !")
  })
})

module.exports = router;