const express = require("express");
const router = express.Router();
const Inquiry =require("../Model/Inquiry")
var upload = require("../config/multer");
router.post(
    "/api/Inquiry",
    upload.single("filename"),
    async function (req, res) {
      const { UserName,UserEmail,Message } = req.body;
      try {
        const result1 = new Inquiry({
   UserName:UserName,
   UserEmail:UserEmail,

   Message:Message      
   
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
  router.get("/Inquiry", async (req, resp) => {
    let result = await Inquiry.find();
    resp.send(result);
  });
  
  router.delete("/Inquiry/:_id", async (req, resp) => {
    let result = await Inquiry.deleteOne(req.params);
    resp.send(result);
  });
module.exports = router;