const express = require("express");
const router = express.Router();
const Ticket =require("../Model/Ticket")
var upload = require("../config/multer");
router.post(
    "/api/ticket",
    upload.single("filename"),
    async function (req, res) {
      const {Tnumber,UserName,UserEmail,Phone,Issue,Status} = req.body;
      try {
        const result1 = new Ticket({
      Tnumber:Tnumber,
      UserName:UserName,
     UserEmail:UserEmail,
      Phone:Phone,
    Issue:Issue,
      Status:Status
    
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
  router.get("/ticket", async (req, resp) => {
    let result = await Ticket.find();
    resp.send(result);
  });
  
  
  router.delete("/ticket/:_id", async (req, resp) => {
    let result = await Ticket.deleteOne(req.params);
    resp.send(result);
  });
  router.put("/ticket/:_id", async (req, resp) => {
    let result = await Ticket.updateOne(req.params, { $set: req.body });
    console.log(req.params);
    resp.send(result);
  });
module.exports = router;