const  express = require('express');
const path = require('path');

const  app = express();

app.use(express.static(path.join(__dirname, '/dist')))


app.get(/.*/, function (req, res){
    res.sendFile(path.join(__dirname,  '/index.html'))
});


const port =  process.env.PORT  || 8081

app.listen(port);