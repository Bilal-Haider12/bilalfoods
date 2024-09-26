const express = require('express')
const router = express.Router()
const Order = require('../models/Orders')

router.post('/orderData', async (req,res) =>{
    let data = req.body.order_data
    await data.splice(0, 0, { Order_date: req.body.order_date})
 
    //  if email is not existing in db then create: else:InsertMany()
      let eId = await Order.findOne({email:req.body.email})
      console.log(eId)
      if (eId === null){
        try{
            await Order.create({
                email : req.body.email,
                order_data :[data]
            }).then(() =>{
                res.status(201).json({ success: true });
            })
        } catch(error){
            console.log(error.message)
            res.status(500).send({ error: "Server Error", message: error.message });
        }
      }
      else{
        try{
            await Order.findOneAndUpdate({email:req.body.email},
                {$push:{ order_data:data }}).then(()=>{
                    res.status(200).json({ success: true });
                })
        } catch(error){
            res.status(500).send({ error: "Server Error", message: error.message });
        }
      }
})

router.post('/myorderData', async (req, res) => {
    console.log('Request received:', req.body); // Log the incoming request
    try {
        let myData = await Order.findOne({'email': req.body.email});
        console.log('Fetched data from DB:', myData); // Log fetched data for debugging
        if (myData) {
            res.json({ orderData: myData });
        } else {
            res.json({ orderData: null }); // Return null if no data is found
        }
    } catch (error) {
        res.status(500).send({ error: "Server Error", message: error.message });
    }
});

module.exports = router;