// JavaScript source code
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database("FoodPal");





/* This function returns all FoodLog Entries for a given user that occured in the timeframe specified
datereq= how many days we are checking back for, i.e. past week = 7 days, past month = 30 days, etc.
*/
function LoadDiaryEntries(username, datereq) {
  return result = new Promise(function(resolve, reject) {
  let results = [];
  let sql = "SELECT * FROM FoodLog, Food WHERE username = ? AND Food.name = FoodLog.foodName AND Food.vendorName = FoodLog.vendorName AND (julianday('now') - julianday(timestamp) < ?) ORDER BY timestamp DESC";
  db.all(sql, username, datereq, function(err,rows) {
    rows.forEach((row) => {
      results.push([row.foodName, row.vendorName, row.price, row.calories, row.fat, row.carbs, row.protein]);
    });
    resolve(results); 
  });
});
}

// Alex
function deleteDiaryEntry(username, timeStamp) {
  let sql = "DELETE FROM FoodLog WHERE username = ? AND timestamp = ?";
  db.run(sql, username, timeStamp);
  console.log("Deleting diary entry for " + username);
}






/* This function sums all info given user that occured in the timeframe specified (transactions, calories, carbs, protein, fat, money)
datereq= how many days we are checking back for, i.e. past week = 7 days, past month = 30 days, etc.
*/
function SumDiaryEntries(username, datereq) {
  return result = new Promise(function(resolve, reject) {
  let results = [];
  let sql = "SELECT Count(*) as numTransactions, SUM(calories), SUM(fat), SUM(carbs), SUM(protein), SUM(price) FROM FoodLog, Food WHERE username = ? AND Food.name = FoodLog.foodName AND Food.vendorName = FoodLog.vendorName AND (julianday('now') - julianday(timestamp) < ?)";
  db.get(sql, username, datereq, function(err,rows) {
    results.push([username, rows]);
    resolve(results);
    });
});
}






/* This function gets the most commonly eaten food in the timeframe specified
datereq= how many days we are checking back for, i.e. past week = 7 days, past month = 30 days, etc.
*/
function mostCommonFood(username, datereq) {
  return result = new Promise(function(resolve, reject) {
  let results = [];
  let sql = "SELECT foodName as name, vendorName as vend, COUNT(*) as num FROM FoodLog WHERE username = ? AND (julianday('now') - julianday(timestamp) < ?) GROUP BY foodName, vendorName ORDER BY COUNT(*) DESC"
  db.all(sql, username, datereq, function(err,rows) {
    if (err){
      console.log("stuck");
    }
    rows.forEach((row) => {
      results.push(row.name, row.vend, row.num );
    });
    resolve(results);
  });
});
}







/* 
This function gets the nutrition info for a given food item
*/
function getNutrition(foodname, vendorname){
  console.log("get nutririon: " + foodname, vendorname);
  return result =  new Promise(function(resolve, reject) {
    let sql = "SELECT * FROM Food WHERE name = (?) AND vendorName = (?)";
    db.get(sql, foodname, vendorname, function(err, row) {
      resolve([row.calories, row.carbs, row.protein, row.fat]);
    });
  });
}






/* 
This function gets all the food in the databse
*/
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





/* 
This function logs all vendors in the database
*/
function getVendors() {
  db.each("SELECT * FROM Vendor", function(err,row){
    console.log(row.name);
  }); 
}






/* 
This function gets all entries in FoodLog
*/
function getFoodLog(){
    let results = [];
    let sql = "SELECT * FROM FoodLog, Food WHERE Food.name = FoodLog.foodName AND Food.vendorName = FoodLog.vendorName ORDER BY timestamp DESC";
    db.all(sql, function(err,rows) {
      rows.forEach((row) => {
        console.log([row]);
      });
    });
}
















/* ANYTHING UNDER HERE IS FOR TESTING*/























// let addFood = db.prepare("INSERT INTO Food VALUES (?, ?, ?, ?, ?, ?, ?)", function(err) {
//   if (err){
//     console.log("fuck");
//   }
// });
// addFood.run("Swiss and Cheese" ,"Au Bon Pain" ,5.99,550,12,10,8);
// addFood.finalize();
// SELECT * FROM statistics WHERE date BETWEEN datetime('now', '-6 days') AND datetime('now', 'localtime');


// let addVendor = db.prepare("INSERT INTO Vendor VALUES (?)");
// addVendor.run("Au Bon Pain");
// addVendor.finalize(); 



//gets the whole food log
// function LoadDiaryEntries(username) {
//   return result = new Promise(function(resolve, reject) {
//   let results = [];
//   let sql = "SELECT * FROM FoodLog, Food WHERE username = ? AND Food.name = FoodLog.foodName AND Food.vendorName = FoodLog.vendorName ORDER BY timestamp DESC";
//   db.all(sql, username, function(err,rows) {
//     rows.forEach((row) => {
//       results.push([row.username, row.foodName, row.vendorName, row.calories, row.fat, row.carbs, row.protein]);
//     });
//     resolve(results); 
//   });
// });
// }

// getVendors();

// foods = getFood();
// foods.then((res) =>{
//   console.log(res);
// })

// getFoodLog();

// r = LoadDiaryEntries("teddy");
// r.then((res)=> {
//   console.log(res);
// });

// let x = 60;
// results = LoadDiaryEntries("teddy", x);
// results.then((res)=> {
//   console.log(res);
// });

// work = SumDiaryEntries("teddy", 50);
// work.then((res)=> {
//   console.log(res);
// });

// please = mostCommonFood("teddy", x);
// please.then((res)=> {
//   console.log(res);
// });