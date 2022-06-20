var express =require('express');
var todocontroller = require('./controllers/todocontroller');
var app=express();

//setting up tempalate engine 
app.set('view engine','ejs');

//setting up midlle ware for static files 
app.use(express.static('./public'));

//fire controller which will handle all the routing 
todocontroller(app);

app.listen(5000);

