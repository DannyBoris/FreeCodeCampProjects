const path = require('path')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3000
const bodyParser = require('body-parser')
const User = require('./models/User')

var options = { 
    server: { 
      socketOptions: { 
        keepAlive: 300000, connectTimeoutMS: 30000 
      } 
    }, 
    replset: { 
      socketOptions: { 
        keepAlive: 300000, 
        connectTimeoutMS : 30000 
      } 
    ,
         useUnifiedTopology: true, 
        useNewUrlParser:true},
  };
try{
    mongoose.connect(process.env.DB_CONNECTION, options,
        ()=>console.log('Connected'))
}catch{
    console.log('Could not connect to db!!!')
}


app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))

app.post('/submit', async (req,res)=>{
    const user = new User({
        name: req.body.name,
        email:req.body.email,
        age:req.body.age,
        job:req.body.job,
        aspects:req.body.aspects,
        contribution:req.body.contribution,
        comment:req.body.comment,
    })

    let newUser = await user.save()
    res.send(`Thank for submitting ${newUser.name}`)
})
app.get('/test',(req,res)=>{
    let x = null
    try{
        mongoose.connect(process.env.DB_CONNECTION,options,
            ()=>{x='connected'})
    }catch(err){
        x = err
    }
    res.send(x)
})
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});