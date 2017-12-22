/* This function gets bar graphs */
exports.getBarGraphs = function (req,db){
    var username = req.body.username;
    var date = parseInt(req.body.date);
    let arr = [];
    let food = [];
    let vendor = [];
    let counts = [];
    let food2 = [];
    let vendor2 = [];
    let counts2 = [];
    return result = new Promise(   function(resolve, reject) {
  
      db.serialize(function() { 
  
    let sql = "SELECT sub.name as name, sub.vendorName as vendorName, sub.price, COUNT(*) as c FROM (SELECT Food.name, Food.vendorName, Food.price FROM Food, FoodLog WHERE FoodLog.username = ? AND Food.name=FoodLog.foodName AND (julianday('now')-julianday(timestamp) < ?)) as sub GROUP BY sub.vendorName, sub.name ORDER BY c DESC";
    db.all(sql,username, date, function(err,rows){
      if (err){
        food.push("");
        vendors.push("")
        counts.push(0)
      }
      else {
      rows.forEach(function(row) {
          food.push(row.name);
          vendor.push(row.vendorName);
          counts.push(row.c);
      });
    }
    }); 
    let sql2 = "SELECT sub.name as name, sub.vendorName as vendorName, sub.price, COUNT(*) as c FROM (SELECT Food.name, Food.vendorName, Food.price FROM Food, FoodLog WHERE Food.name=FoodLog.foodName AND (julianday('now')-julianday(timestamp) < ?)) as sub GROUP BY sub.vendorName, sub.name ORDER BY c DESC";
    db.all(sql2, date, function(err,rows){
      if (err){
        food.push("");
        vendors.push("")
        counts.push(0)
      }
      else {
      rows.forEach(function(row) {
          food2.push(row.name);
          vendor2.push(row.vendorName);
          counts2.push(row.c);
      });
    }
  
      arr.push(food,vendor,counts,food2,vendor2,counts2);
      resolve(arr);
    }); 
  
   });
  
  });
  }
  