var sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database("FoodPal");

/* THIS IS USED TO DROP AND CREATE THE TABLE. USEFUL FOR TESTING. */
// db.serialize(function() {  
// db.run("DROP TABLE FoodLog");
//  var createFoodLog =
//   "CREATE TABLE FoodLog   \
//     (username INTEGER NOT NULL, \
//     timestamp TIMESTAMP NOT NULL, \
//     quantity FLOAT NOT NULL, \
//     foodName VARCHAR(45) NOT NULL, \
//     vendorName VARCHAR(30) NOT NULL, \
//      PRIMARY KEY(username, timestamp), \
//     FOREIGN KEY(username) REFERENCES People(username), \
//     FOREIGN KEY(foodName,vendorName) REFERENCES Food(name,vendorName) \
//     );";

//   db.run(createFoodLog);
// });









/* This function inserts a new meal into FoodLog */
function newMeal(username, timestamp, quantity, foodname, vendorname) {
    console.log(timestamp);
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


/* This function gets all items associated with a vendor. Will be useful when filling the drop down menu to submit a meal */
function getMealsFromVendor(vendor){
    return results = new Promise(function (resolve, reject) {
        let items = [];
        sql = "SELECT name from Food WHERE vendorName = ?";
        db.all(sql, vendor, function(err, rows) {
            rows.forEach((row) => {
                items.push(row.name);
            })
            resolve(items);
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



/* This function deletes a meal from the FoodLog. If the meal doesn't exist, nothing happens */
function deleteMeal(username, timestamp){
    let sql = 'DELETE FROM FoodLog WHERE username = ? AND timestamp = ?';
    db.run(sql, username, timestamp, function(err){
        if (err){
            return console.log("This entry does not exist");
        }
        console.log("check delete")
    });
}








newMeal("ryanpond21",'now',1,"Chicken Tenders","The Loop");
newMeal("ryanpond21",'2017-12-6',1,"Chicken Tenders","Devils Krafthouse");

//Printing out all the people
  let sql = "SELECT * FROM FoodLog, Food WHERE username = 'ryanpond21' and FoodLog.foodName = Food.name and FoodLog.vendorName = Food.vendorName ORDER BY timestamp DESC";
  db.each(sql, function(err,row) {
       console.log(row)
     });

/* ANYTHING BELOW HERE IS FOR TESTING */

























// meals = getMealsFromVendor("Au Bon Pain");
// meals.then((res) => {
//     console.log(res)
// });


// newMeal("teddy","2017-12-01 10:20:05.129", 1, "Chicken Tenders", "The Loop");
// newMeal("teddy","2017-11-01 10:20:05.129", 1, "Chicken Tenders", "The Loop");
// newMeal("KVD","2017-10-01 10:20:05.129", 1, "Chicken Tenders", "The Loop");
// newMeal("KVD","2017-09-02 10:20:05.129", 1, "Chicken Tenders", "The Loop");
// newMeal("teddy","2017-11-11 10:20:05.129", 1, "Chicken Tenders", "The Loop");
// newMeal("teddy","2017-12-21 10:20:05.129", 1, "The Good Egg", "Au Bon Pain");
// newMeal("teddy","2017-10-01 10:10:05.129", 1, "The Good Egg", "Au Bon Pain");
// newMeal("teddy","2017-2-11 10:20:05.129", 1, "Swiss and Cheese", "Au Bon Pain")



// deleteMeal("KVD","2016-02-02 10:20:05.129");
// deleteMeal("KVD", "2346-02-02 10:20:05.129");

db.close();

