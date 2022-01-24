const express = require('express');
const controller = require('../controller/index');
const router = express.Router();
const multer = require("multer")
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../public/img')) //Configuramos la carpeta donde queremos que se guarde la imagen
    },
    filename: function (req, file, cb) {
        const uniqueSuffix =
          Date.now() + "-" + Math.round(Math.random() * 1e9) + file.originalname; //le decimos que nombre queremos que tenga el archivo
        cb(null, file.fieldname + "-" + uniqueSuffix);
      },
    });
  
const upload = multer({ storage: storage });



router.get ('/', controller.getIndex)


module.exports = router;