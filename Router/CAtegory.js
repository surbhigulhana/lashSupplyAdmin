const express = require("express");
const router = express.Router();
const category=require("../Model/category")
var upload = require("../config/multer");
router.post(
    "/api/category",
    upload.single("filename"),
    async function (req, res) {
      const { CateName, desc } = req.body;
      try {
        const result1 = new category({
          CateName: CateName,
          desc: desc,
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
  router.get("/category", async (req, resp) => {
    let result = await category.find();
    resp.send(result);
  });
  
  router.delete("/category/:_id", async (req, resp) => {
    let result = await category.deleteOne(req.params);
    resp.send(result);
  });
  router.put("/category/:_id", async (req, resp) => {
    let result = await category.updateOne(req.params, { $set: req.body });
    console.log(req.params);
    resp.send(result);
  });
module.exports = router;