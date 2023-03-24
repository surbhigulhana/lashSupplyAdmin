const express = require("express");
const router = express.Router();
const Order =require("../Model/Order")
const ProductName= require("../Model/AllProduct")
var upload = require("../config/multer");
router.post(
    "/api/order",
    upload.single("filename"),
    async function (req, res) {
      const {Pname,UserName,Phone,PurchaseDate,TotalAmt,ShipAdd,BillingAdd,Status} = req.body;
      try {
        const result1 = new Order({
      Pname:Pname,
      UserName:UserName,
      PurchaseDate:PurchaseDate,
      Phone:Phone,
      ShipAdd:ShipAdd,
      BillingAdd:BillingAdd,
      Status:Status,
      TotalAmt:TotalAmt
        });
        const data = await result1.save();
        console.log(data);
        res.status(200).json({ success: true, data: result1 });
      } catch (err) {
        console.log(err);
        res.status(500).json({ success: false });
      }
    }
  );
 // working
  router.post(
    "/api/Myorder/:Name", upload.single('imgCollection', 1),
    async function (req, res) {
      const id = req.params.Name;
  let result = await ProductName.find({ Name: id },{imgCollection:1});
  console.log(result[0].imgCollection[0]);
      const {orderNumber,UserName, Quantity,AttributeType1,AttributeType2,Status,TotalAmt} = req.body;
      try {
        const result1 = new Order({
     orderNumber:orderNumber,
      Name:id,
      UserName:UserName,
    Quantity:Quantity,
    AttributeType1:AttributeType1,
    AttributeType2:AttributeType2,
    TotalAmt:TotalAmt,
    imgCollection:result[0].imgCollection[0],
    Status:Status,
        });
        const data = await result1.save();
        console.log(data);
        res.status(200).json({ success: true, data: result1 });
      } catch (err) {
        console.log(err);
        res.status(500).json({ success: false });
      }
    }
  );
  router.get("/order", async (req, resp) => {
    let result = await Order.find();
    resp.send(result);
  });
  router.get('/MoreOrder/:UserName',async (req,resp)=>{
    try{
    const id=req.params.UserName;
    console.log(id)
   let result = await Order.find({UserName:id});
    resp.status(200).send({result});
    }
    catch(err){
        console.log("err : ",err)
        resp.status(400).json(err);
    }
  })
 
  router.get("/pendingOrder", async (req, resp) => {
    let result = await Order.find({Status:"Pending"});
    resp.send(result);
  });
  router.get("/completeOrder", async (req, resp) => {
    let result = await Order.find({Status:"Completed"});
    resp.send(result);
  });
  router.get("/Approved", async (req, resp) => {
    let result = await Order.find({Status:"Approved"});
    resp.send(result);
  });router.get("/Processing", async (req, resp) => {
    let result = await Order.find({Status:"Processing"});
    resp.send(result);
  });router.get("/Shipped", async (req, resp) => {
    let result = await Order.find({Status:"Shipped"});
    resp.send(result);
  });router.get("/OutforDelivery", async (req, resp) => {
    let result = await Order.find({Status:"Out for Delivery"});
    resp.send(result);
  });router.get("/Delivered", async (req, resp) => {
    let result = await Order.find({Status:"Delivered"});
    resp.send(result);
  });
  router.delete("/order/:_id", async (req, resp) => {
    let result = await Order.deleteOne(req.params);
    resp.send(result);
  });
  router.put("/order/:_id", async (req, resp) => {
    let result = await Order.updateOne(req.params, { $set: req.body });
    console.log(req.params);
    resp.send(result);
  });
module.exports = router;
