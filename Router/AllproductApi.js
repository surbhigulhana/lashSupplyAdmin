const express = require("express");
const router = express.Router();
var upload = require("../config/multer");
const productData=require('../Model/AllProduct')
router.post(
    "/api/productData",
    upload.single("filename"),
    async function (req, res) {
      const {
        Name,
        Desc,
        CateName,
        MinPrice,
        MaxPrice,
        SkuNo,
        AttributeName1,
        AttributeName2,
        AttributeType1,
        AttributeType2,
      
        Price,
        // Inventory,
        myfilename,
      } = req.body;
      try {
        const result1 = new productData({
          Name: Name,
          Desc: Desc,
          CateName: CateName,
          MinPrice: MinPrice,
          MaxPrice: MaxPrice,
          SkuNo: SkuNo,
          AttributeName1: AttributeName1,
          AttributeName2: AttributeName2,
          AttributeType1: AttributeType1,
          AttributeType2: AttributeType2,
          Price: Price,
          // Inventory: Inventory,
          filename: myfilename,
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
   router.get("/productData", async (req, resp) => {
    let result = await productData.find();
    resp.send(result);
//     resp.status(200).json({ success: true,statuscode:200, data: result });
  });
router.get("/MoreData/:Name", async (req, resp) => {
    try {
      const id = req.params.Name;
      // console.log("hello", id);
      let result = await productData.find({ Name: id });
      console.log(result);
      resp.status(200).send(result);
//       resp.status(200).json({ success: true,statuscode:200, data: result });
    } catch (err) {
      console.log("err : ", err);
      resp.status(400).json(err);
    }
  });
  router.get("/ProductData/:CateName", async (req, resp) => {
    try {
      const id = req.params.CateName;
      console.log("hello", id);
      let result = await productData.find({ CateName: id });
      console.log(result);
      resp.status(200).send(result);
    } catch (err) {
      console.log("err : ", err);
      resp.status(400).json(err);
    }
  });
  router.delete("/productData/:_id", async (req, resp) => {
    let result = await productData.deleteOne(req.params);
    resp.send(result);
  });
  // router.put('/productData/:_id',upload.single("filename"),async (req,resp)=>{
  //   let result = await productData.updateOne(req.params,{$set:req.body});
  //   console.log(req.params);
  //   resp.send(result);
  // })
  
  router.post(
    "/productData/:_id",
    upload.single("filename"),
    async (req, resp) => {
      const {  Name,
        Desc,
        CateName,
        MinPrice,
        MaxPrice,
        SkuNo,
        AttributeName,
        AttributeType,
        Price,
        Inventory,
        myfilename,} = req.body;
      let result = await productData.updateOne(req.params, {
        $set: {Name:Name,
          Desc:Desc,
          MinPrice:MinPrice,
          MaxPrice:MaxPrice,
          Price:Price,
          SkuNo:SkuNo,
          AttributeName:AttributeName,
          AttributeType:AttributeType,Inventory:Inventory,
           filename: myfilename ,CateName:CateName},
      });
      console.log(req.params);
      resp.send(result);
    }
  );
module.exports = router;
