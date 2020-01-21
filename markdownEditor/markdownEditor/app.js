const express = require('express')
const showdown = require('showdown')
const path = require('path')
const app = express();

app.use(express.static(path.resolve(__dirname,"public")));

app.get('/parseHtml',(req,res)=>{
    var text = req.query.md;
    var converter = new showdown.Converter();
    var html = converter.makeHtml(text);
    res.send(JSON.stringify({html}));
});

app.listen(5000);