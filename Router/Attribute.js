const express = require("express");
const router = express.Router();
const attribute =require('../Model/attribute')
var upload = require("../config/multer");
router.post(
    "/api/attribute",
    
    async function (req, res) {
      const { AttributeName } = req.body;
      try {
        const result1 = new attribute({
          AttributeName: AttributeName,
        });
        console.log(result1);
        const data = await result1.save();
        console.log(data);
        res.status(200).json({ success: true, data: result1 });
      } catch (err) {
        console.log(err);
        res.status(500).json({ success: false });
      }
    }
  );
  router.get("/attribute", async (req, resp) => {
    let result = await attribute.find();
    resp.send(result);
  });
  
  router.get("/MoreAttribute/:AttributeName", async (req, resp) => {
    try {
      const id = req.params.AttributeName;
      console.log("hello", id);
      let result = await attribute.find({ AttributeName: id });
      console.log(result);
      resp.status(200).send(result);
    } catch (err) {
      console.log("err : ", err);
      resp.status(400).json(err);
    }
  });
  
  router.delete("/attribute/:_id", async (req, resp) => {
    let result = await attribute.deleteOne(req.params);
    resp.send(result);
  });
  router.put("/attribute/:_id", async (req, resp) => {
    let result = await attribute.updateOne(req.params, { $set: req.body });
    console.log(req.params);
    resp.send(result);
  });
module.exports = router;