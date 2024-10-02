const express=require('express');
const router=express.Router();
const {get_dieties}=require('./controllers/get_dieties');

router.get("/get_dieties",get_dieties);

module.exports=router;
