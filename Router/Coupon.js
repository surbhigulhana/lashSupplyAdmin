const express = require("express");
const router = express.Router();
const coupon =require('../Model/Coupon')
var upload = require("../config/multer");




router.post("/api/Coupon", upload.single("filename"), async function (req, res) {
    const {  email,CouponName,DiscountPercent } = req.body;
    try {
      const result1 = new coupon({
       
        email: email,
        BillingAdd:BillingAdd,
        ShipAdd:ShipAdd
       
      
      });
      const data = await result1.save();
      console.log(data);
      res.status(200).json({ success: true, data: result1 });
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false,message:"Email already exits" });
    }
  });
  router.get("/Coupon/:email", async (req, resp) => {
    try {
      const id = req.params.email;
      let result = await coupon.find({ email: id });
      console.log(result);
      resp.status(200).send({ result });
    } catch (err) {
      console.log("err : ", err);
      resp.status(400).json(err);
    }
  });




module.exports = router;