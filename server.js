const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const User = require('./models/User')

const app = express()
const PORT = process.env.PORT || 3000

//Connect to mongodb --> mongoose
//Options will keep connection alive in production

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
    },
    useUnifiedTopology: true, useNewUrlParser:true
  };
};

    try{
    mongoose.connect(process.env.DB_CONNECTION , options,
        ()=>console.log('Connected'))
    }catch(err){
    console.error('Could not connect to db!!!' + err)
}


app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine','pug')

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
    res.render('response',{name:newUser.name.toUpperCase()});
})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});