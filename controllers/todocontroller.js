var bodyparser = require('body-parser');
const { default: mongoose } = require('mongoose');
var mogoose = require('mongoose')


var parser = bodyparser.urlencoded({extended:false});
//connection to database
mongoose.connect('mongodb+srv://Yash_1:yash@cluster0.rpsuhel.mongodb.net/?retryWrites=true&w=majority');

//create a schema 
var todoSchema = new mongoose.Schema({
    item:String 
});

//create a model 
var Todo = mogoose.model('Todo',todoSchema);
// var itemOne = Todo({
//     item:'get flowers'
// }).save(function(err){
//     if(err) throw err;
//     console.log('item saved');
// })

module.exports =function(app){
    
app.get('/',function(req,res){
    res.redirect('/todo');
});
app.get('/todo',function(req,res){
    //get data from mongo db 
    Todo.find({},function (err,data){
        if(err) throw(err);
        res.render('todo',{todos:data});
    });
});
app.post('/todo',parser,function(req,res){
    //get data from view and add data in mongo db 
    var newvar = Todo(req.body).save(function(err,data){
        if(err) throw err;
        res.json(data);
    })
    console.log(req.body);
    // data.push(req.body);
    // res.json(data);
});

app.delete('/todo/:item',function(req,res){
    //delete item from mongo db 
    var itemtodelete = req.params.item.replace(/\-/g,' ');
    Todo.find({item:itemtodelete}).remove(function(err,data){
        if(err) throw err;
        console.log('ITEM deleted');
        res.json(data);
    })
    // data = data.filter(function(eachitem){
    //     return eachitem.item.replace(/ /g,'-')!=req.params.item;
    // });
    // res.json(data);
});


};