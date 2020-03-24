const express = require('express');
const bodyParser = require('body-parser')
const path = require('path')
const pug = require('pug')
const cloudinary = require('cloudinary')
const axios = require('axios')
const app = express()

cloudinary.config({
    cloud_name:'sample',
    api_key:'635317355665196',
    api_secret:'q42WtvQIkHbZ7merrtM2GT6M_Po'
})

let image = cloudinary.image("polar-bear-cubs_tqopog.jpg")
console.log(image)
app.set('views', path.join(__dirname, 'views'))
app.use(bodyParser.json())
console.log('thisi s servefr')
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: true }));

const PORT  =  process.env.PORT || 3000
app.post('/',(req,res)=>{
    res.render('./response.pug', {title:req.body.name});
})
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});