const path = require('path')
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))
app.post('/submit',(req,res)=>{
    console.log(req.body.name)
    res.send(JSON.stringify(req.body))

})
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});