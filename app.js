//Node Modules Required
var express = require('express'),
bodyParser = require('body-parser'),
cookieParser = require('cookie-parser'),
methodOverride = require('method-override'),
swig = require('swig'),
consolidate = require('consolidate'),
sqlite3 = require('sqlite3');

//Query Files
var loginQueries = require('./public/queries/loginQueries.js');
var homeQueries = require('./public/queries/homeQueries.js');
var diaryQueries = require('./public/queries/diaryQueries.js');
var graphQueries = require('./public/queries/graphQueries.js');
var foodQueries = require('./public/queries/foodQueries.js');
var vendorQueries = require('./public/queries/vendorQueries.js');
var suggestionQueries = require('./public/queries/suggestionQueries.js');

//External JS
var dateFunctions = require('./public/web-backend/date.js');

//Express Routing Setup
const app = express();
app.set('views', __dirname);
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());
app.engine('html', consolidate.swig);

//Connect to Database
var db = new sqlite3.Database("./public/database-backend/nodejs version/FoodPal");

//Routing
app.get('/', function(req, res){
res.render('index.html');
});

app.post('/home', function(req, res){
res.render('public/home.html',{
  name: req.body.username
});
});

app.post('/index', function(req, res){
res.render('public/index.html');
});

//Populating the Diary
app.post('/loadDiary', function(req, res){
var username = req.body.username;
var date = req.body.date;
diaryQueries.loadDiaryEntries(username,date,db).then(function (result){
  var addedString = "";
  for (var i = 0; i < result.length; i ++){
    addedString += addEntries(result[i]);
  }
  res.send(addedString);
})
});

//Populating Vendor dropdown
app.post('/loadVendors',function(req,res){
vendorQueries.loadVendors(db).then(function (result){
  res.send(foodQueries.addVendors(result,db));
});

});


  //Delete from diary
  app.post('/deleteDiaryEntry', function(req, res){
    var username = req.body.username;
	var timestamp = req.body.timestamp;
    diaryQueries.deleteDiaryEntry(username,timestamp,db);
  });

  //Populating Vendor dropdown
  app.post('/loadVendors',function(req,res){
    loadVendors().then(function (result){
      res.send(addVendors(result));
    });
	});

//Populating Vendor dropdown
app.post('/loadFoods',function(req,res){
var vendor = req.body.vendor;
foodQueries.getFood(vendor,db).then(function (result){
  res.send(foodQueries.addVendors(result,db));
});


});

//Populating Vendor dropdown
app.post('/loadMoneySpentByVendor',function(req,res){
vendorQueries.getMoneySpentByVendor(req,db).then(function (result){
  console.log("HERRRREEEE")
  console.log(result);
  res.send(result);
});

});

app.post('/loadBarGraphs',function(req,res){
graphQueries.getBarGraphs(req,db).then(function (result){
  res.send(result);
});

});


  app.post('/loadHomeGraphs',function(req,res){
    homeQueries.getHomeGraphs(req,db).then(function (result){
      res.send(result);
    });

  });

  //Creating a new meal
  app.post('/createMeal', function(req, res){
    var vendor = req.body.vendor;
    var food = req.body.food;
    var username = req.body.username;
    const now = new Date();
    var timestamp = dateFunctions.getDateTime();
    var quantity = req.body.quantity
    diaryQueries.insertMeal(username,timestamp,quantity,food,vendor,db);
  });


//Creating a new user

  app.post('/createUser', function(req, res){
    var firstname = req.body.FirstName;
    var lastname = req.body.LastName;
    var username = req.body.username;
    var password = req.body.password;
    var mealPlan = "B";
    var NetID = req.body.NetID;
    console.log(username);
    loginQueries.addUser(username,password,NetID,firstname,lastname,mealPlan,db).then(function(result){
      console.log(result);
    if(result.ret=="Fail"){
      result2 = {};
      result2.redirect = '/register.html';
      result2.stat = "User Taken";
      res.send(result2);
    }
    else {
      result2 = {};
      result2.redirect = '/login.html';
      result2.username = username;
      result2.stat = "success"
      res.send(result2);
    }
    });
    
    
  });

  app.post('/loginStatus', function(req, res){
    var username = req.body.username;
    var password = req.body.password;
    loginQueries.loginSuccess(username,password,db).then(function (result) {
          console.log("end");
          result.redirect = '/home.html';
          res.send(result);
    });
  });

  app.post('/userValidate', function(req, res){
    var username = req.body.username;
    loginQueries.checkUserExists(username,db).then(function (result) {
          res.send(result);
    });
  });

   app.post('/getSuggestion', function(req, res){
      maxPrice = req.body.price.right/2.5; // slider max = 40, actual max = $37.55
      minCals = req.body.cals.left*11; // slider max = 1100, actual max = 1100
      maxCals = req.body.cals.right*11;// slider max = 1100, actual max = 1100
      minProt = req.body.prot.left*0.72; // slider max = 72, actual max = 72
      maxProt = req.body.prot.right*0.72; // slider max = 72, actual max = 72
      minFat = req.body.fat.left*0.7;// slider max = 70, actual max = 70 
      maxFat = req.body.fat.right*0.7; // slider max = 70, actual max = 70 
      minCarbs = req.body.carbs.left*0.93;// slider max = 93, actual max = 93
      maxCarbs = req.body.carbs.right*0.93; // slider max = 93, actual max = 93

      suggestionQueries.getSuggestion(req.body.keyword, req.body.vendor, maxPrice, minCals, 
                  maxCals, minProt, maxProt, minFat, 
                  maxFat, minCarbs, maxCarbs,db).then(function(result){
                          var addedString = "";
                          for (var i = 0; i < result.length; i++){
                              addedString += addFoods(result[i]);
                          }
                      res.send(addedString);
                   });
  });



var port = process.env.PORT || 8888;
app.listen(port, function() {
console.log('Our app is running on http://localhost:' + port);
});


function addEntries(meal){ // <td> = one cell, <tr> = one row
  var result = "<tr><td>" + meal[0] + "</td><td>" + meal[1] + "</td><td>" + meal[2] + "</td><td>" + meal[3] + "</td><td>" + meal[4] + "</td><td>" 
  + meal[6] + "</td><td>" + meal[5] + "</td><td>" + meal[7] + 
  "</td> <td> <a class=\"btn btn-primary\" onclick=\"deleteDiaryEntry(" + "\'" + meal[7] +"\'"+ ")\" href=\"diary.html\"> Remove </a> </td> + </tr>" ;
  return result;

}

function addFoods(food){
  var result = "<tr><td>" + food[0] + "</td><td>" + food[1] + "</td><td>" + food[2] + "</td><td>" + food[3] + "</td><td>" + food[4] + "</td><td>" + food[5] + "</td><td>" + food[6] + "</td></tr>" ;
  return result;
}