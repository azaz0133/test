var express = require('express');
var router = express.Router();
import "reflect-metadata";
import {createConnection,getRepository} from "typeorm";
import {Gallery} from '../src/entity/Gallery'
import {getConnection} from "typeorm";

let con = createConnection();
/* GET gallerys listing. */
router.get('/', function(req, res, next) {
  con.then(async c=>{
    const galleryRepository = getRepository(Gallery);
  await galleryRepository.find({ select: [ "id","image","name"] }).then(data=>{
    console.log(data)
    res.json(data);
  })
  })
  
});
//get by ..
router.get('/:id',(req,res)=>{
  con.then(async c=>{
    const galleryRepository = getRepository(Gallery);
  await galleryRepository.find({ select: ["id","image","name"],where : { id:req.params.id} }).then(data=>{
    console.log(data)
    res.json(data);
  })
  })
})
//add gallery
router.post('/',(req,res)=>{
  con.then(async connection => {
    const gallery = new Gallery();
    gallery.image =req.body.image
    gallery.name=req.body.name
    await connection.manager.save(gallery);
  })
})
//edit gallery
router.put('/:id',(req,res)=>{
  con.then(async c=>{
    await getConnection()
    .createQueryBuilder()
    .update(Gallery)
    .set({ })
    .where("id = :id", { id: req.params.id })
    .execute();
  })
})
//delete
router.delete('/:id',(req,res)=>{
  con.then(async c=>{
    await getConnection()
    .createQueryBuilder()
    .delete()
    .from(Gallery)
    .where("id = :id", { id: req.params.id })
    .execute();
  })
})

module.exports = router;