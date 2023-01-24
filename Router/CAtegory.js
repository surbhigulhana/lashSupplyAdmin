const express = require("express");
const router = express.Router();
const category=require("../Model/category")
// var upload = require("../config/multer");
const multer =require("multer");
const path =require("path");


const storage = multer.diskStorage({
 destination:'./public/uploads',
 filename:(req,file,cb)=>{
  return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
 }
  })
  const upload = multer({
  storage:storage
  })
router.use("/filename",express.static("./public/uploads"))
router.post("/api/category",
  upload.single("filename"),
  async function (req, res) {
    const { CateName, desc } = req.body;
      try {
        const result1 = new category({
          CateName: CateName,
          desc: desc,
          filename:`http://3.114.92.202:4003/filename/${req.file.filename}`
        });
        const data = await result1.save();
        console.log(data);
        res.status(200).json({ success: true, data: result1 });
      } catch (err) {
        console.log(err);
        res.status(500).json({ success: false });
      }
    // console.log(req.file)
    // res.json({
    //   success:true ,
    //   filename_url:`http://3.114.92.202:4003/filename/${req.file.filename}`
    //    })
   
  }
);
// router.post(
//     "/api/category",
//     upload.single("filename"),
//     async function (req, res) {
//       const { CateName, desc,myfilename } = req.body;
//       try {
//         const result1 = new category({
//           CateName: CateName,
//           desc: desc,
//           filename:myfilename
//         });
//         const data = await result1.save();
//         console.log(data);
//         res.status(200).json({ success: true, data: result1 });
//       } catch (err) {
//         console.log(err);
//         res.status(500).json({ success: false });
//       }
//     }
//   );
  router.post(
    "/categoryImg/:_id",
    upload.single("filename"),
    async (req, resp) => {
      // const {
      //   myfilename,} = req.body;
      let result = await category.updateOne(req.params, {
        $set: {
          filename:`http://3.114.92.202:4003/filename/${req.file.filename}`},
      });
      console.log(req.params);
      resp.send(result);
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