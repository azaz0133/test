var express = require('express');
var router = express.Router();
import "reflect-metadata";
import {createConnection,getRepository} from "typeorm";
import {Article} from '../src/entity/Article'
import {getConnection} from "typeorm";

let con = createConnection();
/* GET articles listing. */
router.get('/show', function(req, res, next) {
  con.then(async c=>{
    const articleRepository = getRepository(Article);
   let find =await articleRepository.find({order:{
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
// asdasdsadsasddasdas
router.get('/:id',(req,res)=>{
  con.then(async c=>{
    const articleRepository = getRepository(Article);
  await articleRepository.find({where:req.params.id}).then(data=>{
    console.log(data)
    if(articleRepository!==undefined){
      res.status(200).json(data);
    }
    else {
      res.status(400).send("not found")
    }
  })
  })
})
//add article
router.post('/',(req,res)=>{
  con.then(async connection => {
    const article = new Article();
    let {body}=req
    article.title =body.title
    article.description=body.description
    article.type= body.type
    article.pic = body.pic
    await connection.manager.save(article);
  })
})
//edit article
router.put('/:id',(req,res)=>{
  con.then(async c=>{
    await getConnection()
    .createQueryBuilder()
    .update(Article)
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
    .from(Article)
    .where("id = :id", { id: req.params.id })
    .execute();
  })
})

module.exports = router;