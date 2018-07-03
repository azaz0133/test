var express = require('express');
var router = express.Router();
import "reflect-metadata";
import {createConnection,getRepository} from "typeorm";
import {Role} from '../src/entity/Role'
import {getConnection} from "typeorm";


let con = createConnection();
/* GET roles listing. */
router.get('/show',(req,res)=>{
  con.then(async connection=>{
        const roleRepository = getRepository(Role)
        let find = await roleRepository.find()
        if(find !== undefined){
          res.status(200).json(find)
        }
        else {
          res.status(400).json({
            result: "fail ... something"
          })
        }
  })
})
//get by ..
router.get('/:id',(req,res)=>{
  con.then(async c=>{
    const roleRepository = getRepository(Role);
  await roleRepository.find({ select: ["id","name"],where : { id:req.params.id} }).then(data=>{
    console.log(data)
    res.json(data);
  })
  })
})
//add role
router.post('/',(req,res)=>{
  con.then(async connection => {
    const role = new Role();
    role.name =req.body.name
    await connection.manager.save(role);
  })
})
//edit role
router.put('/:id',(req,res)=>{
  con.then(async c=>{
    await getConnection()
    .createQueryBuilder()
    .update(Role)
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
    .from(Role)
    .where("id = :id", { id: req.params.id })
    .execute();
  })
})

module.exports = router;