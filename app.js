var MongoClient = require('mongodb').MongoClient;

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

var app = express();

app.set('views',path.join(__dirname,'views'));
app.set('view engine','jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname+'/public')));


MongoClient.connect('mongodb://localhost:12345/IPO_DB1', function(err, db) {
  if (err) {
    throw err;
  }
  db_global=db;
});


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});


var categorynames=["化學用品","各類顏料","化粧用品","工業用油","各類藥品","金屬製品","機械","各類刀具","電腦儀器","醫療設備","家電衛浴","交通工具","煙火軍火",
                   "珠寶鐘錶","樂器","紙類製品","橡膠製品","皮革製品","非金屬製品","家具","廚具","紡織品","紗線","各類布料","服飾","綁帶髮飾","竹蓆踏墊",
                   "玩具運動","豆奶肉製品","茶咖啡糖","農業園藝","飲料啤酒","酒類","菸品","廣告公關","銀行保險","營建修繕","電信通訊","交通運輸","材料處理",
                   "教育娛樂","設計檢驗","餐飲住宿","醫療服務","法律服務"];
var numbers=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45];
var topiclist=["所有類別", "營建工程","批發零售","運輸倉儲","住宿餐飲","影音通訊","金融法務","房地產業","科技電子","娛樂體育","醫療保健","服飾家具","機械加工"]
var subset_map= {
           "所有類別":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45],
           "營建工程":[1,6,7,11,12,19,21,22,37],
           "批發零售":[3,5,6,16,21,22,25,26,27,28,29,30,31,32,33,34],
           "運輸倉儲":[9,12,39],
           "住宿餐飲":[29,30,31,32,33,39,43],
           "影音通訊":[9,16,35,38,42],
           "金融法務":[35,36,45],
           "房地產業":[19,35,36,37,45],
           "科技電子":[1,7,9,38,42],
           "娛樂體育":[9,14,15,16,20,21,28,35,41],
           "醫療保健":[5,9,10,44],
           "服飾家具":[3,11,14,20,21,22,23,24,25,26,27],
           "機械加工":[1,2,4,6,7,8,9,11,12,13,17,18,21,40]
        }

CACHE_SIZE_LIMIT = 1000;
result_cache = {};

function maintain_cache_size(new_trade_name, new_result){
	if( result_cache > CACHE_SIZE_LIMIT ){
		result_cache = {trade_name:new_result};
	}
}

app.get('/report*',function(req,res){
  
  var trade_name = req.query.trade_name;
  var category = req.query.category || "所有類別";
  
  if( trade_name in result_cache ){  //look up trade_name in cache
    
    //render page
    res.render('report',{
      'result':result_cache[trade_name],
      'trade_name':trade_name,
      "category":category,
      
      'topiclist':topiclist,
      "categorynames":categorynames,
      "numbers":numbers,
      "subset_map":subset_map
    });
    
  }else{ //cache not hit

    //var query={'圖樣中文':trade_name};
    var query={'圖樣中文': {$regex: ".*"+trade_name+"."+"|"+trade_name}};
    
    db_global.collection('trademarks').find(query).toArray(function(err, result) {

      if (err) {
        throw err;
      }
      
      //cache result
      result_cache[trade_name] = result;
      maintain_cache_size( trade_name, result );

      //render page
      res.render('report',{
        'result':result,
        'trade_name':trade_name,
        "category":category,
        
        'topiclist':topiclist,
        "categorynames":categorynames,
        "numbers":numbers,
        "subset_map":subset_map
      });
    });
  }
});

app.post('/visit',function(req,res){
  
  //get POST parameters
  var trade_name = req.body['trade_name'];
  var trade_type = req.body['trade_type'];
  var mobile_contact = req.body['mobile_contact'];
  var email_contact = req.body['email_contact'];
  var line_contact = req.body['line_contact'];
  
  //store user info to collection 'visits'
  console.log('visit: trade_name='+trade_name+', mobile_contact='+mobile_contact);
  
  db_global.collection('visits').insert({
	"trade_name" : trade_name,
	"trade_type" : trade_type,
	"mobile_contact" : mobile_contact,
	"email_contact" : email_contact,
	"line_contact": line_contact
  });
  
  //redirect to the report page
  res.redirect("/report?trade_name="+trade_name);
});

app.get('/visit_report',function(req,res){
    
  db_global.collection('visits').find({}).toArray(function(err, result) {

      if (err) {
        throw err;
      }
      res.render('visit_report',{'visits':result});
  });
});

/*app.get('/report',function(req,res){
  res.render('report');
});

app.get('/report2',function(req,res){
  res.render('report2');
});*/


app.listen(3000);
console.log('Server is running on port 3000...');
