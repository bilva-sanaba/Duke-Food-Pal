var sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database("FoodPal");


/* THIS DROPS ALL TABLES BEFORE CREATING THEM. USEFUL FOR TESTING */
db.serialize(function() {  
   db.run("DROP TABLE People");
   db.run("DROP TABLE Vendor");
   db.run("DROP TABLE TimesOpen");
   db.run("DROP TABLE IsOpenAt");
   db.run("DROP TABLE Food");
   db.run("DROP TABLE IsAvailableAt");
   db.run("DROP TABLE FoodLog");

  var createPeople = 

  "CREATE TABLE People \
  (username VARCHAR NOT NULL PRIMARY KEY,  \
  password VARCHAR(30) NOT NULL, \
  netId VARCHAR(10) NOT NULL UNIQUE,  \
  firstname VARCHAR(30) NOT NULL, \
  lastname VARCHAR(30) NOT NULL, \
  mealPlan CHAR(1) NOT NULL, \
  CHECK(mealPlan = 'A' OR mealPlan = 'B' OR mealPlan = 'C' OR mealPlan = 'D' \
        OR mealPlan = 'E' OR mealPlan = 'F' OR mealPlan = 'H' OR mealPlan = 'I' OR \
        mealPlan = 'J') \
	CHECK(username <> '' AND password <> '' AND netId <> '' AND firstname <> '' AND lastname <> '') \
  );";

  db.run(createPeople); 
  
  var createVendor = 
  "CREATE TABLE Vendor  \
  (name VARCHAR(30) NOT NULL PRIMARY KEY \
  );";

  db.run(createVendor);

  var createTimesOpen = 
  "CREATE TABLE TimesOpen    \
  (day VARCHAR(9) NOT NULL,  \
  openTime TIME NOT NULL,    \
  closeTime TIME NOT NULL,   \
  PRIMARY KEY (day, openTime, closeTime) \
  );";

  db.run(createTimesOpen);

  var createIsOpenAt = 
  "CREATE TABLE IsOpenAt \
  (vendorName VARCHAR(30) NOT NULL, \
  day VARCHAR(9) NOT NULL, \
  openTime TIME NOT NULL, \
  closeTime TIME NOT NULL, \
  PRIMARY KEY(vendorName, day, openTime, closeTime), \
  FOREIGN KEY(vendorName) REFERENCES Vendor(name), \
  FOREIGN KEY(openTime,closeTime,day) REFERENCES TimesOpen(openTime,closeTime,day) \
  );";

  db.run(createIsOpenAt);

  var createFood = 
  "CREATE TABLE Food \
  (name VARCHAR(45) NOT NULL, \
  vendorName VARCHAR(30) NOT NULL, \
  price FLOAT NOT NULL, \
  calories INTEGER, \
  carbs INTEGER, \
  protein INTEGER, \
  fat FLOAT, \
  PRIMARY KEY(name, vendorName), \
  FOREIGN KEY(vendorName) REFERENCES Vendor(name) \
  );";

  db.run(createFood);



  var createIsAvailableAt = 
  "CREATE TABLE IsAvailableAt \
  (foodName VARCHAR(45) NOT NULL, \
  vendorName VARCHAR(30) NOT NULL, \
  day VARCHAR(9) NOT NULL, \
  openTime TIME NOT NULL, \
  closeTime TIME NOT NULL, \
  PRIMARY KEY (foodName, vendorName, day, openTime, closeTime), \
  FOREIGN KEY(foodName,vendorName) REFERENCES Food(name,vendorName), \
  FOREIGN KEY(openTime,closeTime,day) REFERENCES TimesOpen(openTime,closeTime,day) \
  );";

  db.run(createIsAvailableAt);




  var createFoodLog =
  "CREATE TABLE FoodLog   \
    (username VARCHAR NOT NULL, \
    timestamp TIMESTAMP NOT NULL, \
    quantity FLOAT NOT NULL, \
    foodName VARCHAR(45) NOT NULL, \
    vendorName VARCHAR(30) NOT NULL, \
     PRIMARY KEY(username, timestamp), \
    FOREIGN KEY(username) REFERENCES People(username), \
    FOREIGN KEY(foodName,vendorName) REFERENCES Food(name,vendorName) \
    );";

  db.run(createFoodLog);




/*

EVERYTHING BELOW HERE IS FOR TESTING

*/























  var addPeople = db.prepare("INSERT INTO People VALUES (?,?,?,?,?,?)");
  var user = "ryanpond21";
  var password = "pass";
  var netID = "rp159";
  var firstname = "Ryan"
  var lastname = "Pond";
  var mealPlan = "B";
  addPeople.run(user,password,netID,firstname,lastname,mealPlan);
  addPeople.finalize();

  var addPeople = db.prepare("INSERT INTO People VALUES (?,?,?,?,?,?)");
  var user = "teddy";
  var password = "pass";
  var netID = "ted1";
  var firstname = "Teddy"
  var lastname = "Ruby";
  var mealPlan = "B";
  addPeople.run(user,password,netID,firstname,lastname,mealPlan);
  addPeople.finalize();

  var addPeople = db.prepare("INSERT INTO People VALUES (?,?,?,?,?,?)");
  var user = "katie";
  var password = "pass";
  var netID = "kvd";
  var firstname = "Katie"
  var lastname = "VanDyk";
  var mealPlan = "B";
  addPeople.run(user,password,netID,firstname,lastname,mealPlan);
  addPeople.finalize();


  // var addVendor = db.prepare("INSERT INTO Vendor VALUES (?)");
  // var name = "ABP";
  // addVendor.run(name);
  // addVendor.finalize();
  
  //Printing out all the people
  // let sql = "SELECT * FROM People";
  // db.each(sql, function(err,row) {
  //      console.log(row);
  //    });
  
  // function tester() {
  //   let sql = "SELECT * FROM People";
  //   db.each(sql, function(err,row) {
  //     console.log(row);
  //   });
  // }
//   setTimeout(tester, 1000);
// var addPeople = db.prepare("INSERT INTO People VALUES (?,?,?,?,?,?)");
// var dCN = "ads";
// var netID = "bgs21";
// var name = "Bilva Sanaba";
// var mealPlan = "B";
// var a ="a";
// var b="b";
// addPeople.run(dCN,netID,name,mealPlan,a,mealPlan);
// addPeople.finalize();

// db.each("SELECT * FROM Vendor", function(err,row){
//   console.log(row.name);
// });





// });

  

//   db.each("SELECT * FROM People", function(err,row){
//     console.log(row.name);
//   });
// });  


// setTimeout(tester2, 1000);

db.close();




  //EXAMPLE ONLY DO NOT USE
  // db.run("DROP TABLE user")
  //db.run("CREATE TABLE user (id INT, dt TEXT)");

  // var stmt = db.prepare("INSERT INTO user VALUES (?,?)");  
  // for (var i = 0; i < 10; i++) {    
  //   var d = new Date();  
  //   var n = d.toLocaleTimeString();  
  //   stmt.run(i, n);  
  // }  
  // stmt.finalize(); 

  // db.each("SELECT id, dt FROM user", function(err, row) {  
  //     console.log("User id : "+row.id, row.dt);  

});

