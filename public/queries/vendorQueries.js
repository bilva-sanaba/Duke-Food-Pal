/* This function retrieves a user's spending grouped by vendor
*/
exports.getMoneySpentByVendor = function(req, db){
    var username = req.body.username;
    var date = parseInt(req.body.date);
    let arr = [];
    var vendors = [];
    var money = [];
    return result = new Promise(  function(resolve, reject) {
      db.serialize(function() { 
      let sql = "SELECT sub.vendorName as v, SUM(sub.price) as p FROM (SELECT Food.name, Food.vendorName, FoodLog.timestamp, Food.price FROM Food, FoodLog WHERE FoodLog.username = ? AND Food.name=FoodLog.foodName AND (julianday('now')-julianday(timestamp) < ? )) as sub GROUP BY sub.vendorName ORDER BY SUM(sub.price) DESC";
      db.all(sql,username, date, function(err,rows){
        if (err){
          vendors.push("");
          money.push(0);
        }
        else {
        rows.forEach(function(row) {
          vendors.push(row.v);
          money.push(row.p);
      });
    }
    }); 
    var macronutrients = [];
    let sql2 = "SELECT sub.vendorName, SUM(sub.calories) as cal, SUM(sub.fat) as fats, SUM(sub.protein) as proteins, SUM(sub.carbs) as carbs FROM (SELECT Food.name, Food.vendorName, FoodLog.timestamp, Food.calories, Food.carbs, Food.protein, Food.fat, Food.price FROM Food, FoodLog WHERE FoodLog.username = ? AND Food.name=FoodLog.foodName AND (julianday('now')-julianday(timestamp) < ? )) as sub GROUP BY sub.vendorName ORDER BY SUM(sub.price) DESC";
    db.get(sql2, username, date, function(err,row){
      console.log(typeof row)
      if (err || typeof row === 'undefined'){
        macronutrients.push([0,0,0,0]);
      }
      else {
      macronutrients.push(row.cal,row.carbs,row.proteins,row.fats);
    }
    });
    var calsByVendor = [];
    let sql3 = "SELECT sub.vendorName as v, SUM(sub.calories) as cals, SUM(sub.price) FROM (SELECT Food.name, Food.vendorName, FoodLog.timestamp, Food.calories, Food.price FROM Food, FoodLog WHERE FoodLog.username = ? AND Food.name=FoodLog.foodName AND (julianday('now')-julianday(timestamp) < ? )) as sub GROUP BY sub.vendorName ORDER BY SUM(sub.price) DESC";
    db.all(sql3, username, date, function(err,rows){
      if (err){
        calsByVendor.push(0);
      }
      else {
      rows.forEach(function(row) {
          calsByVendor.push(row.cals);
      });
    }
      //Vendors in order of money spent, money spent per vendor, [cals,carbs,proteins,fats], cals per vendor
      arr.push(vendors,money,macronutrients,calsByVendor);
      resolve(arr);
    });
  
   });
  
  });
  }


  /* 
This function logs all vendors in the database
*/
exports.loadVendors = function(db){
    return result = new Promise(function(resolve, reject) {
    let results = [];
    let sql = "SELECT * FROM Vendor";
    db.all(sql, function(err,rows) {
      rows.forEach(function(row) {
        results.push(row.name);
      });
      resolve(results); 
    });
  });
  }