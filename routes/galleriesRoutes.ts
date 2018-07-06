var express = require('express');
var router = express.Router();
import "reflect-metadata";
import {createConnection,getRepository} from "typeorm";
import {Gallery} from '../src/entity/Gallery'
import {getConnection} from "typeorm";

let con = createConnection();
/* GET gallerys listing. */
router.get('/show',(req,res)=>{
  con.then(async connection=>{
      const galleryRepository = getRepository(Gallery);
      let find =await galleryRepository.find({order:{
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