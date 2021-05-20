const express = require('express')
var path = require('path')
const app = express()
const port = process.env.PORT || 5000 
const mongoose = require("mongoose")
const db = require("./db.js").mongoURI

var bodyParser = require('body-parser')

app.listen(port,()=>{
	console.log(`server running on port ${port}`)
})

var router = express.Router();
// 用于静态展示入口
router.get('/', function (req, res, next) {
  req.url = './index.html';
  next();
});

//声明静态资源地址
app.use(express.static('dist'));
// app.use(express.static('static'));
app.use(router);
// 服务器提交的数据json化
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


app.use('*',(req,res,next) => {
	console.log('req,res,next' + "...........................................")
	res.setHeader('Access-Control-Allow-Origin','*');
	res.setHeader('Access-Control-Allow-Credential','true');
	res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,DELETE,OPTIONS');
	next();
});

app.use('/api/user', require('./router/user'));

app.get('/login',(req,res)=>{
	res.send('hello login')
})

// 连接数据库
// mongoose.connect("mongodb://127.0.0.1/testDB",{useMongoClient:true}) 
mongoose.connect(db)
	.then(()=>console.log('mongoDB is connected'))
	.catch(err=>console.log(err))


