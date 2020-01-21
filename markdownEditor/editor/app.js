const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const multer = require('multer');
const app = express();
const uploadPath = 'public/uploads/';
const storage = multer.diskStorage({
    destination(req,res,cb){
        cb(null,uploadPath);
    },
    filename(req,file,cb){
        filename = Date.now()+'.md';
        cb(null,filename);
    }
});
const upload = multer({storage});
var filename = '';

app.use(express.static(path.resolve(__dirname,"public")));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.post('/uploadmd',upload.single('file'),(req,res)=>{
    res.send({
        code: 0,
        url: uploadPath.split('/').copyWithin(0,2).join('/') + req.file.filename
    });
});

app.listen(5000,()=>{
    console.log("server listenning to port 5000");
});