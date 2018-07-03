var express = require('express');
var router = express.Router();
import "reflect-metadata";
import {createConnection,getRepository} from "typeorm";
import {regisEvent} from "../src/entity/regisEventModel";


let connect = createConnection();

        // form

        router.get('/',(req,res)=>[
            res.render('register')
        ])


        // register
        router.post("/add",(req,res)=>{
            let {body} = req
            connect.then(async connection=>{
                const regis = new regisEvent()
                regis.tfirstname = body.tfirstname
                regis.tlastname = body.tlastname
                regis.efirstname = body.efirstname
                regis.elastname = body.elastname
                regis.email = body.email
                regis.nick_name = body.nick_name
                regis.birthdate = new Date(body.birthdate)
                regis.tel = body.tel
                regis.status_student = body.status_student
                regis.university = body.university
                regis.faculty = body.faculty
                regis.level_study = body.level_study
                regis.facebook = body.facebook
                regis.line = body.line
                regis.address = body.address
                await connection.manager.save(regis)
                res.status(200).send("succesful!!!!")
            })
        })
module.exports = router