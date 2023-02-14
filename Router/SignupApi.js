require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");
var upload = require("../config/multer");
const jwt = require("jsonwebtoken");
const registration = require("../Model/registration");
const { passwordChangingMail } = require("../mailing");
const router = express.Router();
router.post(
  "/api/userRegister",
  upload.single("filename"),
  async function (req, res) {
    const { firstname, Lastname, Phone, email, Password} =
      req.body;
    try {
      const hashPassword = await bcrypt.hash(Password, 10);
      const user = registration({
        firstname: firstname,
        Lastname: Lastname,
        Phone: Phone,
        email: email,
        Password: hashPassword,
      });
      const data = await user.save();
      res.status(200)
        .json({ success: true, message: "Registration Successfull" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message:"Email already exits",success:false });
    }
  }
);
router.post("/api/userlogin", async (req, resp) => {
  try {
    const { email, Password } = req.body;
    console.log(email,Password)
    if (email && Password) {
      const regUser = await registration.findOne({ email: email });
      if (regUser != null) {
        const isMatch = await bcrypt.compare(Password, regUser.Password);
        if (regUser.email === email && isMatch) {
          ////jwt
          const token = jwt.sign(
            { userID: regUser._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "5d" }
          );
       
          resp.send({
            status: "success",  data: regUser, message: "Login Successful",token: token,
          });
        } 
        else {
          resp.send({ status: "failed", message: "id or password not valid" });
        }
      } else {
        resp.send({ status: "failed", message: "password not valid" });
      }
    } else {
      resp.send({ status: "failed", message: "enter data first" });
    }
  } catch (error) {
    console.log("Error: ", error);
    resp.send({ status: "failed", message: "unable to login" });
  }
});
router.get("/api/sendforgotmail/:email", async (req, res) => {
  try {
    const email1 = req.params.email;
    console.log("hii", email1);
    const result = await passwordChangingMail(email1);
    if (result) res.status(200).json({success:true,message:"Link send to registered email id"});
    else res.status(400).json({success:false,message:"Enter email is not exist"});
  } catch (err) {
    console.log(err);
    res.status(500).json({success:false,message:"Enter email is not exist"});
  }
});
router.post("/api/changepassword", async function (req, res) {
  const { email, Password } = req.body;
  try {
    const userData = await registration.find({ email: email });
    if (userData.length) {
      const hashPassword = await bcrypt.hash(Password, 10);
      await registration.findOneAndUpdate(
        {
          email: email,
        },
        {
          $set: {
            Password: hashPassword,
          },
        }
      );
      res.status(200).json({ success: true,message:"Password changed succesfully" });
    } else {
      res.status(500).json({ success: false, err: "user not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, err: err });
  }
});
router.put("/api/updateuser", async function (req, res) {
  const { firstname, Lastname, Phone, email, Status } = req.body;
  try {
    const user = await registration.findOneAndUpdate(
      {
        email: email,
      },
      {
        $set: {
          firstname: firstname,
          Lastname: Lastname,
          Phone: Phone,
          Status: Status,
        },
      }
    );
    res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false });
  }
});

// router.post("/api/EmailVerify", async (req, resp) => {
//   try {
//     const { email } = req.body;
//     if (email) {
//       const regUser = await registration.findOne({ email: email });
//       if (regUser != null) {

//         if (regUser.email === email) {
//           resp.send({
//             status: "success",
//             data: regUser,
//             message: "Email valid",

//           });
//         } else {
//           resp.send({ status: "failed", message: "email not valid" });
//         }
//       } else {
//         resp.send({ status: "failed", message: "email not valid" });
//       }
//     } else {
//       resp.send({ status: "failed", message: "enter data first" });
//     }
//   } catch (error) {
//     console.log("Error: ", error);
//     resp.send({ status: "failed" });
//   }
// });
router.get("/getuser", async (req, resp) => {
  let result = await registration.find();
  resp.send(result);
});
router.get("/Blocked", async (req, resp) => {
  let result = await registration.find({ Status: "Blocked" });
  resp.send(result);
});

router.delete("/deleteUser/:_id", async (req, resp) => {
  let result = await registration.deleteOne(req.params);
  resp.send(result);
});

router.put("/user/:email", async (req, resp) => {
  const { firstname, Lastname, Phone} = req.body;
  let result = await registration.updateOne(req.params, { $set:{
    firstname: firstname,
    Lastname: Lastname,
    Phone:  Phone,
  
  } });
  resp.send({ status: "true",message:"Profile Update Sucessfully"})
});

 
router.put('/users/:_id', async (req, resp) => {
  let result = await registration.updateOne(req.params, { $set: req.body });
  console.log(req.params);
  resp.send(result);
})

// -----------------------------xxxxxxxxxxxxxxxxxxxxxxxxxxxx--------------------------------

module.exports = router;
