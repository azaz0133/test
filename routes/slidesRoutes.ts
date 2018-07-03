var express = require('express');
var router = express.Router();
import "reflect-metadata";
import {createConnection,getRepository} from "typeorm";
import {Slide} from '../src/entity/Slide'
import {getConnection} from "typeorm";

let con = createConnection();
/* GET slides listing. */
router.get('/show', function(req, res, next) {
  con.then(async c=>{
    const slideRepository = getRepository(Slide);
    let find = await slideRepository.find({ select: ["id","name","caption","status","src"],where:{status:1},order:{created_at:"DESC"} }).then(data=>{
      if(data !== undefined){
        res.status(200).send(data)
   }
  else {
      res.status(400).json({
          result: "have no title in database please check name of title"
      })
  }
  })
  })
  
});
//get by ..
router.get('/:id',(req,res)=>{
  con.then(async c=>{
    const slideRepository = getRepository(Slide);
  await slideRepository.find({ select: ["id","name","caption","status","src"],where : { id:req.params.id} }).then(data=>{
    console.log(data)
    res.json(data);
  })
  })
})
//add slide
router.post('/',(req,res)=>{
  con.then(async connection => {
    const slide = new Slide();
    slide.name = req.body.name
    slide.status= req.body.status
    slide.caption = req.body.caption
    slide.src=req.body.src
    
    await connection.manager.save(slide);
  })
})
//edit slide
router.put('/:id',(req,res)=>{
  con.then(async c=>{
    await getConnection()
    .createQueryBuilder()
    .update(Slide)
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
    .from(Slide)
    .where("id = :id", { id: req.params.id })
    .execute();
  })
})

module.exports = router;