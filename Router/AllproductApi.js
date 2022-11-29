
const productData = require("../Model/AllProduct");

const path = require("path");
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
let express = require("express"),
  multer = require("multer"),
  mongoose = require("mongoose"),
  uuidv4 = require("uuid/v4"),
  router = express.Router();
const DIR = "./public/";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, uuidv4() + "-" + fileName);
  },
});
var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// const storage = multer.diskStorage({
//   destination: "./public/uploads",
//   filename: (req, file, cb) => {
//     return cb(
//       null,
//       `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
//     );
//   },
// });
// const upload = multer({
//   storage: storage,
// });
// router.use("/filename", express.static("./public/uploads"));
router.post(
  "/api/productData",
  upload.array('imgCollection', 15),
  async function (req, res) {
    const reqFiles = [];
    const url = req.protocol + '://' + req.get('host')
    for (var i = 0; i < req.files.length; i++) {
        reqFiles.push(url + '/' + req.files[i].filename)
        console.log(reqFiles)
    }
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
        imgCollection: reqFiles
        // Inventory: Inventory,
        // filename: `http://3.114.92.202:4003/filename/${req.file.filename}`,
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
  // resp.status(200).json({ success: true,statuscode:200, data: result });
});
router.get("/MoreData/:Name", async (req, resp) => {
  try {
    const id = req.params.Name;
    // console.log("hello", id);
    let result = await productData.find({ Name: id });
    console.log(result);
    resp.status(200).send(result);
    // resp.status(200).json({ success: true,statuscode:200, data: result });
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
router.put(
  "/productData/:_id",
  upload.single("filename"),
  async (req, resp) => {
    let result = await productData.updateOne(req.params, { $set: req.body });
    console.log(req.params);
    resp.send(result);
  }
);

router.post(
  "/productData/:_id",
  upload.single("filename"),
  async (req, resp) => {
    const {
      Name,
      Desc,
      CateName,
      MinPrice,
      MaxPrice,
      SkuNo,
      AttributeName,
      AttributeType,
      Price,
      Inventory,
      myfilename,
    } = req.body;
    let result = await productData.updateOne(req.params, {
      $set: {
        Name: Name,
        Desc: Desc,
        MinPrice: MinPrice,
        MaxPrice: MaxPrice,
        Price: Price,
        SkuNo: SkuNo,
        AttributeName: AttributeName,
        AttributeType: AttributeType,
        Inventory: Inventory,
        filename: `http://3.114.92.202:4003/filename/${req.file.filename}`,
        CateName: CateName,
      },
    });
    console.log(req.params);
    resp.send(result);
  }
);
module.exports = router;
