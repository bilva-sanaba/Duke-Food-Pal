/* This function returns all FoodLog Entries for a given user that occured in the timeframe specified
datereq= how many days we are checking back for, i.e. past week = 7 days, past month = 30 days, etc.
*/
exports.loadDiaryEntries = function (username, datereq,db) {
							  return result = new Promise(function(resolve, reject) {
							  let results = [];
							  let sql = "SELECT * FROM FoodLog, Food WHERE username = ? and FoodLog.foodName = Food.name and FoodLog.vendorName = Food.vendorName AND (julianday('now')-julianday(timestamp) < ?) ORDER BY timestamp DESC";
							  db.all(sql, username, datereq, function(err,rows) {
							    rows.forEach(function(row) {
							      results.push([row.foodName, row.vendorName, row.price, row.calories, row.fat, row.carbs, row.protein, row.timestamp]);
							    });
							    resolve(results); 
							  });
							});
							}


exports.deleteDiaryEntry = function (username, timeStamp, db) {
  let sql = "DELETE FROM FoodLog WHERE username = ? AND timestamp = ?";
  db.run(sql, username, timeStamp);
  console.log("Deleting diary entry for " + username);
  }

/* This function inserts a new meal into FoodLog */
exports.insertMeal = function(username, timestamp, quantity, foodname, vendorname, db) {
	if (timestamp === null){
			timestamp = date('now');
	}
	let addlog = db.prepare("INSERT INTO FoodLog VALUES (?,?,?,?,?)");
	addlog.run(username, timestamp, quantity, foodname, vendorname, function(err) {
			if (err){
					console.log(err);
					console.log("didn't work");

			}
			console.log("check insert")
			console.log(timestamp);
	});
	addlog.finalize();
}