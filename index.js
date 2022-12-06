
const express = require("express");
const app = express();
const cors = require("cors");
const path =require("path")
require('./Model/config')
app.use(cors());
app.use(express.json());
const signup =require("./Router/SignupApi")
const AllProduct =require("./Router/AllproductApi");
const product =require("./Router/ProdcutApi");
const category =require("./Router/CAtegory")
const order =require("./Router/Order")
const inquiry =require("./Router/Inquiry");
const Ticket =require("./Router/Ticket")
const attribute =require("./Router/Attribute")
const coupon =require('./Router/Coupon')
const Payment =require("./Model/Payment")
const Type =require("./Model/attributeType")
// const uploadImg =require("./Router/Imag")
const StoreName =require('./Model/StoreName')

const BannerImg = require("./Model/BannerImg");

app.use("/",signup,AllProduct,coupon,Ticket,category,product,inquiry,attribute,order);

  app.use(express.static(path.join(__dirname,"public")));
  const multer =require("multer");
const storage = multer.diskStorage({
 destination:'./public/uploads',
 filename:(req,file,cb)=>{
  return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
 }
  })
  const upload = multer({
  storage:storage
  })
app.use("/filename",express.static("./public/uploads"))
//-------------------------------payemnt---------------------------------------------
  app.post(
    "/api/payment",
    upload.single("filename"),
    async function (req, res) {
      const { Pname, UserEmail, PurchaseDate, Mode, TotalAmt,Point, Status,Tpoint} = req.body;
    
      try {
        const result1 = new Payment({
          Pname: Pname,
          UserEmail: UserEmail,
          Mode: Mode,
          PurchaseDate: PurchaseDate,
          TotalAmt: TotalAmt,
          Point:TotalAmt/10,
          Status: Status,
        });
       
        const data = await result1.save();
      
        console.log(data);
        res.status(200).json({ success: true, data: result1});
      
      } 
      
      catch (err) {
        console.log(err);
        res.status(500).json({ success: false });
      }
      
    }
  );
  app.get("/payment", async (req, resp) => {
    let result = await Payment.find();
    resp.send(result);
  });
  
  app.get("/payment/:Pname", async (req, resp) => {
    try {
      const id = req.params.Pname;
  
      let result = await Payment.find({ Pname: id },{'Pname':1,'Point':1});
      console.log(result);
      resp.status(200).send({result});
    
    } catch (err) {
      console.log("err : ", err);
      resp.status(400).json(err);
    }
  });
  
  app.delete("/payment/:_id", async (req, resp) => {
    let result = await Payment.deleteOne(req.params);
    resp.send(result);
  });
  app.put("/payment/:_id", async (req, resp) => {
    let result = await Payment.updateOne(req.params, { $set: req.body });
    console.log(req.params);
    resp.send(result);
  });

//----------------------------------------------------------------------------
//----------------------------------------type---------------------------------
app.post("/api/Type", upload.single("filename"), async function (req, res) {
  const { AttributeName, AttributeType } = req.body;
  try {
    const result1 = new Type({
      AttributeName: AttributeName,
      AttributeType: AttributeType,
    });
    console.log(result1);
    const data = await result1.save();
    console.log(data);
    res.status(200).json({ success: true, data: result1 });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false });
  }
});
app.get("/Type", async (req, resp) => {
  let result = await Type.find();
  resp.send(result);
});

app.get("/More/:AttributeName", async (req, resp) => {
  try {
    const id = req.params.AttributeName;
    console.log("hello", id);
    let result = await Type.find({ AttributeName: id });
    console.log(result);
    resp.status(200).send(result);
  } catch (err) {
    console.log("err : ", err);
    resp.status(400).json(err);
  }
});

app.delete("/Type/:_id", async (req, resp) => {
  let result = await Type.deleteOne(req.params);
  resp.send(result);
});


app.get("/display/:id", async (req, res) => [
  Type.find({ AttributeName: req.params.id })
    .populate("AttributeType")
    .exec((err, response) => {
      if (err) console.log(err);
      res.send(response);
    }),
]);

//  ----------------------------------------------- // 
app.post(
  "/BannerImg",
  upload.single("filename"),
  async function (req, res) {
    const { myfilename } = req.body;
    try {
      const result1 = new BannerImg({
        filename:`http://3.114.92.202:4003/filename/${req.file.filename}`
       
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
app.get("/BannerImg", async (req, resp) => {
  let result = await BannerImg.find();
  resp.send(result);
});
app.post(
  "/BannerImg/:_id",
  upload.single("filename"),
  async (req, resp) => {
    const {
      
      myfilename,} = req.body;
    let result = await BannerImg.updateOne(req.params, {
      $set: {
        filename:`http://3.114.92.202:4003/filename/${req.file.filename}` },
    });
    console.log(req.params);
    resp.send(result);
  }
);
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// store
app.post( "/api/StoreName",
  upload.single("filename"),
  async function (req, res) {
    const { Name} = req.body;
  
    try {
      const result1 = new StoreName({
   Name:Name 
      });
      const data = await result1.save();
      console.log(data);
      res.status(200).json({ success: true, data: result1});
    
    } 
    
    catch (err) {
      console.log(err);
      res.status(500).json({ success: false });
    }
    
  }
);
app.get("/StoreName", async (req, resp) => {
  let result = await StoreName.find();
  resp.send(result);
});


app.delete("/StoreName/:_id", async (req, resp) => {
  let result = await StoreName.deleteOne(req.params);
  resp.send(result);
});


app.listen(4003)
console.log ('server run on 4003')

