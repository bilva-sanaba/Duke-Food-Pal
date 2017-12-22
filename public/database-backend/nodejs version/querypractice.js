var sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database("FoodPalPractice");

function getNetIds() {
  db.each("SELECT * FROM People", function(err,row){
    console.log(row.netId);
  }); 
}

function getVendors() {
  db.each("SELECT * FROM Vendor", function(err,row){
    console.log(row.name);
  }); 
}
function getFood() {
  return result = new Promise(function(resolve, reject) {
    let arr = [];
    let sql = "SELECT * FROM Food";
  db.all(sql, function(err,rows){
    rows.forEach(function(row) {
        arr.push(row);
    })
    resolve(arr);
  }); 
});
}

function getVendorFood() {
  db.each("SELECT Vendor.name, Food.calories FROM Food, Vendor WHERE Food.vendorName = Vendor.name", function(err,row){
    console.log(row);
  }); 
}



function querylowCal() {
  return result = new Promise(function(resolve, reject) {
  var results = [];
  let sql = "SELECT name, vendorName, calories FROM FOOD ORDER BY calories ASC";
  db.all(sql, function(err,rows) {
    rows.forEach(function(row) {
      results.push([row.name, row.vendorName, row.calories]);
    });
    resolve(results);
  }); 
});
}

function practice(name) {
  var results = [];
  let sql = 'SELECT* FROM Vendor WHERE Vendor.name = ?';
  let names = name;
  db.get(sql, [names], function(err,rows) {
    console.log(rows);
});
}

function practice2(name) {
  var results = [];
  let sql = 'SELECT* FROM Food WHERE vendorName = ?';
  let names = name;
  db.get(sql, [names], function(err,rows) {
    console.log(rows);
});
}



//getNetIds();
//getVendors();
// getFood();
//getVendorFood();
results = querylowCal();
results.then(function (result) {
  console.log(result);
});
res1 = querylowCal();
res1.then(function (res) {
  console.log(res);
});
// practice("Panda Express");
// practice2("Panda Express");

 
db.close();

