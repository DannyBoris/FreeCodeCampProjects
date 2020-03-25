const path = require('path')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3000
const bodyParser = require('body-parser')
const User = require('./models/User')

try{
    mongoose.connect(process.env.DB_CONNECTION ,{
        useUnifiedTopology: true, 
        useNewUrlParser:true},
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
    try{
        mongoose.connect(process.env.DB_CONNECTION ,{
            useUnifiedTopology: true, 
            useNewUrlParser:true},
            ()=>res.send('Connected'))
    }catch(err){
        res.send('Could not connect to db!!!' + err)
    }
    finally{
        res.send('ok')
    }
    
})


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});