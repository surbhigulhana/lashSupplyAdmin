const express = require("express");
const router = express.Router();
const product =require("../Model/Product")
var upload = require("../config/multer");
router.post(
    "/api/product",
    upload.single("filename"),
    async function (req, res) {
      const { Name } = req.body;
      try {
        const result1 = new product({
          Name: Name,
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
  router.get("/product", async (req, resp) => {
    let result = await product.find();
  
    // resp.json({ success: true,statuscode:200 ,result:result});
      resp.send(result);
  });
  router.delete("/product/:_id", async (req, resp) => {
    let result = await product.deleteOne(req.params);
    resp.send(result);
  });
  router.put("/product/:_id", async (req, resp) => {
    let result = await product.updateOne(req.params, { $set: req.body });
    console.log(req.params);
    resp.send(result);
  });
  
  router.get("/product/:CateName", async (req, resp) => {
    try {
      const id = req.params.CateName;
      console.log("hello", id);
      let result = await product.find({ CateName: id });
      console.log(result);
      resp.status(200).send(result);
    } catch (err) {
      console.log("err : ", err);
      resp.status(400).json(err);
    }
  });
module.exports = router;