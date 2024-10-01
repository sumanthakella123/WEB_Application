const express=require('express');
const app=express();

 const router=require("./router.js");
const db=require('./db.js');

app.use((req,res,next)=>
    {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Allow specific origin
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS'); // Allowed methods
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allowed headers
        next();
    });
    

app.use(router);



db.initDB((err,db)=>
{
    if(err)
    {
        console.log(err);

    }
    else{
        app.listen(3001,()=>
            {
                console.log("server is running on port 3001");
            })
    }

});


