let express = require('express'),
    multer = require('multer'),
    mongoose = require('mongoose'),
    uuidv4 = require('uuid/v4'),
    router = express.Router();
const DIR = './public/';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});
var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});
// User model
let User = require('../Model/User');
router.post('/upload-images', upload.array('imgCollection', 15), (req, res, next) => {
    const reqFiles = [];
    const url = req.protocol + '://' + req.get('host')
    for (var i = 0; i < req.files.length; i++) {
        reqFiles.push(url + '/' + req.files[i].filename)
        console.log(reqFiles)
    }
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        imgCollection: reqFiles
    });
    user.save().then(result => {
        res.status(201).json({
            message: "Done upload!",
           
                imgCollection: result.imgCollection
        
        })
    }).catch(err => {
        console.log(err),
            res.status(500).json({
                error: err
            });
    })
})
// router.get("/getimg", (req, res, next) => {
//     User.find().then(data => {
//         res.status(200).json({
//             message: "User list retrieved successfully!",
//             users: data
//         });
//     });
// });


router.delete("/Data", async (req, resp) => {
    let result = await User.deleteOne(req.params);
    resp.send(result);
  });

router.get("/getimg", async (req, resp) => {
    let result = await User.find();
    resp.send(result);
  });

  router.get("/More/:imgCollection", async (req, resp) => {
    try {
      const id = req.params.imgCollection;
      console.log("hello", id);
      let result = await User.find({ imgCollection: id });
      console.log(result);
      resp.status(200).send(result);
    } catch (err) {
      console.log("err : ", err);
      resp.status(400).json(err);
    }
  });



module.exports = router;