var express = require('express');
var router = express.Router();
const crypto = require('crypto');
import "reflect-metadata";
import {createConnection,getRepository} from "typeorm";
import {User} from "../src/entity/User";
import {getConnection} from "typeorm";
import { functionDeclaration } from "babel-types";

let connect = createConnection();

/* GET users listing. */
router.get('/show',(req,res)=>{
      connect.then(async connection=>{
            const userRepository = getRepository(User)
            let find = await userRepository.find()
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
  res.set('Content-Type', 'application/json');
  connect.then(async c=>{
    const userRepository = getRepository(User);
  await userRepository.find({ select: ["id","firstName", "lastName","firstName","lastName", "gender","age","status",
  "email","birthdate","tel","university","faculty","major","facebook","edu_year","username"]
  ,where : { id:req.params.id} }).then(date=>{
     res.json(date)
    console.log("wwww")
  })
  })
})
//add user
router.post('/',(req,res)=>{
  connect.then(async connection => {
    let {body} = req;
    let check = [
      "firstname","lastname","email","password"
    ]
    let count =0;
    let i=check.length-1;
      for(i=0;i<check.length;i++){
          if(body[check[i]]!=undefined){
              count++
          }
      }
    if(count==check.length){
    const user = new User();
    user.firstName=req.body.firstname
    user.lastName=req.body.lastname
    user.email=req.body.email
        const password = req.body.password
        const hash = crypto.createHmac('sha512', password)
                    .update('tfosettal')
                   .digest('hex');
  
    user.password=hash
    await connection.manager.save(user);
    res.json({
       status : "ok",
       status_code : 2001010000,
       result : req.body
    }
  )

  }
  else {
    res.json({
      status : 404,
      error : "incomplete information"
    })
  }
  })
  console.log("Insert User Sucessfully !!!!")
  
})
//edit user
router.put('/:id',(req,res)=>{
  connect.then(async c=>{
    await getConnection()
    .createQueryBuilder()
    .update(User)
    .set({ 
      firstName:req.body.firstname,
      lastName:req.body.lastname,
      gender:req.body.gender,
      age:req.body.age,
      status:req.body.status,
      email:req.body.email,
      birthdate:new Date(req.body.birthdate),
      tel:req.body.tel,
      university:req.body.university,
      faculty:req.body.faculty,
      major:req.body.major,
      facebook:req.body.facebook,
      education_status:req.body.educationStatus,
      edu_year:req.body.eduYear,
      username:req.body.username
})
    
    
    .where("id = :id", { id: req.params.id })
    .execute();
  }).then(()=>{
      res.json()
  })
})
//delete
router.delete('/:id',(req,res)=>{
  connect.then(async c=>{
    await getConnection()
    .createQueryBuilder()
    .delete()
    .from(User)
    .where("id = :id", { id: req.params.id })
    .execute();
  }).then(()=>{
    res.send("Delete !")
  })
})
module.exports = router;
