var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database("FoodPal");


// function getMaxes(){
//    return result = new Promise(function(resolve, reject) {
//     let results = [];
//     // sql = "SELECT MAX(carbs), MAX(fat), MAX(protein), MAX(calories), MAX(price) FROM Food";
//     sql = "SELECT name FROM Food WHERE carbs = 407";
//     db.get(sql, function(err, row){
//         results.push(row);
//         resolve(results);
//     });
//   });
// }

// let maxes = getMaxes();
// maxes.then((r) =>{
//   console.log(r);
// });
// function getMoneySpentByVendor(){
//   var username = "ryanpond21";
//   console.log(username);
//   let arr = [];
//   var vendors = [];
//   var money = [];
//   return result = new Promise(   function(resolve, reject) {

//     db.serialize(function() { 

//     let sql = "SELECT Food.vendorName, SUM(price) as p FROM Food, FoodLog WHERE FoodLog.username = ? AND Food.name=FoodLog.foodName AND Food.vendorName = FoodLog.vendorName GROUP BY Food.vendorName ORDER BY SUM(price) DESC";
//   db.all(sql,username, function(err,rows){
//     console.log(rows);
//     rows.forEach(function(row) {
//         vendors.push(row.vendorName);
//         money.push(row.p);
//     });
//     //arr.push(vendors);
//     //resolve(arr);
//   }); 
//   var macronutrients = [];
//   let sql2 = "SELECT SUM(calories) as cals, SUM(carbs) as carbs, SUM(protein) as proteins, SUM(fat) as fats FROM Food, FoodLog WHERE FoodLog.username = ? AND Food.name=FoodLog.foodName";
//   db.get(sql2, username, function(err,row){
//     console.log(row);
//     macronutrients.push(row.cals,row.carbs,row.proteins,row.fats);
    
//     //resolve(arr);
//   }); 
//   var calsByVendor = [];
//   let sql3 = "SELECT SUM(calories) as cals FROM Food, FoodLog WHERE FoodLog.username = ? AND Food.name=FoodLog.foodName AND Food.vendorName = FoodLog.vendorName GROUP BY Food.vendorName ORDER BY SUM(price) DESC"
//   db.all(sql3, username, function(err,rows){
//     console.log(rows);
//     rows.forEach(function(row) {
//         calsByVendor.push(row.cals);
//     })
//     //Vendors in order of money spent, money spent per vendor, [cals,carbs,proteins,fats], cals per vendor
//     arr.push(vendors,money,macronutrients,calsByVendor);
//     console.log(arr);
//     resolve(arr);
//   });

//  });

// });
// }

// function getBarGraphs(){
//   var username = "ryanpond21";
//   let arr = [];
//   let food = [];
//   let vendor = [];
//   let counts = [];
//   let food2 = [];
//   let vendor2 = [];
//   let counts2 = [];
//   return result = new Promise(   function(resolve, reject) {

//     db.serialize(function() { 

//     let sql = "SELECT Food.name, Food.vendorName, COUNT(*) as c FROM Food, FoodLog WHERE FoodLog.username = ? AND Food.name=FoodLog.foodName AND Food.vendorName = FoodLog.vendorName GROUP BY Food.vendorName, Food.name ORDER BY COUNT(*) DESC";
//   db.all(sql,username, function(err,rows){
//     //console.log(rows);
//     rows.forEach(function(row) {
//         food.push(row.name);
//         vendor.push(row.vendorName);
//         counts.push(row.c);
//     });

//     //arr.push(food,vendor,counts);
//     //console.log(arr);
//     //resolve(arr);
//   }); 
//   let sql2 = "SELECT Food.name, Food.vendorName, COUNT(*) as c FROM Food, FoodLog WHERE Food.name=FoodLog.foodName AND Food.vendorName = FoodLog.vendorName GROUP BY Food.vendorName, Food.name ORDER BY COUNT(*) DESC";
//   db.all(sql2, function(err,rows){
//     //console.log(rows);
//     rows.forEach(function(row) {
//         food2.push(row.name);
//         vendor2.push(row.vendorName);
//         counts2.push(row.c);
//     });

//     arr.push(food,vendor,counts,food2,vendor2,counts2);
//     console.log(arr);
//     resolve(arr);
//   }); 

//  });

// });
// }
// getBarGraphs();

function getCalories(username){
  let results = [];
      //let sql = "SELECT * FROM FoodLog"
      let sql= "SELECT log.time, SUM(calories), SUM(price)  FROM (SELECT foodName, vendorName, round(abs(julianday('now')-julianday(timestamp) -.5)) as time FROM FoodLog WHERE username = ?) as log, Food WHERE Food.name = log.foodName AND Food.vendorName = log.vendorName GROUP BY time HAVING log.time < 14";
      db.all(sql, username, function(err, rows){
        console.log(rows);
        rows.forEach((row)=>{
        });
    });
}

// "SELECT sub.vendorName as n, SUM(sub.price) as p, (julianday('now')-julianday(sub.timestamp)) as test FROM 
function please(username, date) {
//let sql = "SELECT sub.vendorName as v, SUM(sub.calories), SUM(sub.fat), SUM(sub.protein), SUM(sub.carbs), SUM(sub.price) as p FROM (SELECT Food.name, Food.vendorName, FoodLog.timestamp, Food.calories, Food.carbs, Food.protein, Food.fat, Food.price FROM Food, FoodLog WHERE FoodLog.username = ? AND Food.name=FoodLog.foodName AND Food.vendorName = FoodLog.vendorName AND (julianday('now')-julianday(timestamp) < ? )) as sub GROUP BY sub.vendorName ORDER BY SUM(sub.price) DESC";
//"SELECT sub.name, sub.vendorName, COUNT(*) as c FROM SELECT (Food, FoodLog WHERE FoodLog.username = ? AND Food.name=FoodLog.foodName AND Food.vendorName = FoodLog.vendorName GROUP BY Food.vendorName, Food.name) as sub ORDER BY COUNT(*) DESC";
//let sql = "SELECT sub.name, sub.vendorName, sub.price, COUNT(*) FROM (SELECT Food.name, Food.vendorName, Food.price FROM Food, FoodLog WHERE FoodLog.username = ? AND Food.name=FoodLog.foodName AND Food.vendorName = FoodLog.vendorName AND (julianday('now')-julianday(timestamp) < ?)) as sub GROUP BY sub.vendorName, sub.name ORDER BY SUM(sub.price) DESC";
let sql = "SELECT sub.vendorName, SUM(sub.calories) as cals, SUM(sub.fat) as fats, SUM(sub.protein) as proteins, SUM(sub.carbs) as carbs FROM (SELECT Food.name, Food.vendorName, FoodLog.timestamp, Food.calories, Food.carbs, Food.protein, Food.fat, Food.price FROM Food, FoodLog WHERE FoodLog.username = ? AND Food.name=FoodLog.foodName AND Food.vendorName = FoodLog.vendorName AND (julianday('now')-julianday(timestamp) < ? )) as sub GROUP BY sub.vendorName ORDER BY SUM(sub.price) DESC";
db.all(sql,username, date, function(err,rows){
  console.log(rows);
  rows.forEach(function(row) {
  });
}); 
}


please("ryanpond21", 52);
