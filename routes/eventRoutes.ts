var express = require('express');
var router = express.Router();
import "reflect-metadata";
import {createConnection,getRepository} from "typeorm";
import {Event} from '../src/entity/Event'
import {getConnection} from "typeorm";

let con = createConnection();
/* GET events listing. */
router.get('/', function(req, res, next) {
  con.then(async c=>{
    const eventRepository = getRepository(Event);
  await eventRepository.find({ select: ["id","title","start_date","end_date","status",
  "event_times","regis_start_day","regis_end_day","cover_image","article_id"] 
}).then(data=>{
    console.log(data)
    res.json(data);
  })
  })
  
});
//get by ..
router.get('/:id',(req,res)=>{
  con.then(async c=>{
    const eventRepository = getRepository(Event);
  await eventRepository.find({ select: ["id","title","start_date","end_date","status","event_times","regis_start_day","regis_end_day","cover_image","article_id"],where : { id:req.params.id} }).then(data=>{
    console.log(data)
    res.json(data);
  })
  })
})
// add event
router.post('/',(req,res)=>{
  con.then(async connection => {
    const event = new Event();
    let {body} = req
  event.title = body.title
  event.start_date = new Date(body.start_date)
  event.end_date=new Date(body.end_date)
  event.status= body.status
  event.event_times= body.event_times
  event.regis_start_day= new Date(body.regis_start_day) 
  event.regis_end_day= new Date(body.regis_end_day)
  event.cover_image= body.cover_image
    await connection.manager.save(event);
  })
})
// edit event
router.put('/:id',(req,res)=>{
  con.then(async c=>{
    await getConnection()
    .createQueryBuilder()
    .update(Event)
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
    .from(Event)
    .where("id = :id", { id: req.params.id })
    .execute();
  })
})

module.exports = router;