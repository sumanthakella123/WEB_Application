const db=require('../db.js');
exports.get_dieties=(req,res,next)=>
{
    
    
    db.getDB().collection('diety').find({}).toArray()
    .then(result=>
    {
        console.log(result);
        res.json({result:result});

    })
    .catch(err=>
    {
        console.log(err);

    });
    

};