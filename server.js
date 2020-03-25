const path = require('path')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3000
const bodyParser = require('body-parser')
const User = require('./models/User')

console.log(process.env)
mongoose.connect(process.env.DB_CONNECTION ,{
    useUnifiedTopology: true, 
    useNewUrlParser:true}, 
    (err)=>{try{
        console.log('Connected')}
    catch(err){
        console.error(`ERROR HAS OCCURED: ${err}`)
    }})

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))

app.post('/submit', async (req,res)=>{
    res.send('good')
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



app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});