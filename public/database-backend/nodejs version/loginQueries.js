
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database("FoodPal");

/* DROPS PEOPLE TABLE. USEFUL FOR TESTING */

// db.serialize(function() {
// 	db.run("DROP TABLE People");
// 	var createPeople = 

// 	  "CREATE TABLE People \
// 	  (username VARCHAR NOT NULL PRIMARY KEY,  \
// 	  password VARCHAR(30) NOT NULL, \
// 	  netId VARCHAR(10) NOT NULL UNIQUE,  \
// 	  firstname VARCHAR(30) NOT NULL, \
// 	  lastname VARCHAR(30) NOT NULL, \
// 	  mealPlan CHAR(1) NOT NULL, \
// 	  CHECK(mealPlan = 'A' OR mealPlan = 'B' OR mealPlan = 'C' OR mealPlan = 'D' \
// 	        OR mealPlan = 'E' OR mealPlan = 'F' OR mealPlan = 'H' OR mealPlan = 'I' OR \
// 	        mealPlan = 'J') \
// 	  );"

// 	  db.run(createPeople); 
// });





/* This function checks if a given username, password is a valid login. Returns a json */
function loginSuccess(username, password){
		return result = new Promise(function (resolve, reject){
		let sql = 'SELECT * FROM People WHERE username = ? AND password = ?';
		db.get(sql, [username, password], function(err,row) {
			if (err) {
				resolve("this is an error");
			}
			else {
				var tempSucc = "false";
				var tempUser = "Incorrect Login";
				var res = {};
				if(row){
					tempSucc = "true";
					tempUser = row.username;
				}
				res.success = tempSucc;
				res.username = tempUser;
				console.log(tempSucc);
				resolve(res);
			}
		});			
		});
}



/* This function inserts a new user into Person */
 function addUser(username,password,netID,firstname,lastname,mealPlan) {
	var addPeople = db.prepare("INSERT INTO People VALUES (?,?,?,?,?,?)");
  	
  	addPeople.run(username,password,netID,firstname,lastname,mealPlan, function(err) {
		if (err){
			console.log("It messed up");
		} 
		else {
			console.log("We Gucci")
		}
	  });
  	addPeople.finalize();
 }








/* This function resets a users password */
 function resetPassword(username,newpass){
	let sql = "UPDATE People SET password = ? WHERE username = ?";
	db.run(sql, newpass, username, function(err){
		if (err){
			console.log("I blame Alex");
		}
		console.log(`Row(s) updated: ${this.changes}`);
	});
 }






/* This function checks the suggested calorie intake and macronutrient breakdown for a user
Currently returns nothing... still trying to decide where to put that info
Input:
weight = lbs
height = inches
age = int
gender = "Male" or "Female"
workout = 1-5, 1 being not active, 5 being very actice
*/
function setPersonStats(weight, height, age, gender, workout){
	weight = weight * 0.453592;
	height = height*2.54;
	let calories = 2000;
	if (gender = "Male"){
		calories = 10*weight + 6.25*height - 5*age +5;
	}
	else {
		ccalories = 10*weight + 6.25*height - 5*age - 161;
	}
	if (workout === 1){
		calories = calories*1.2;
	}
	if (workout === 2){
		calories = calories*1.375;
	}
	if (workout === 3){
		calories = calories*1.55;
	}
	if (workout === 4){
		calories = calories*1.72;
	}
	if (workout === 5){
		calories = calories*1.9;
	}
	let carbs = (calories*.4)/4;
	let fat = (calories*.3)/9;
	let protein = (calories*.3)/4;
	console.log(calories, carbs, fat, protein);
}















/* ANYTHING BELOW THIS IS FOR TESTING */











// setPersonStats(150,66, 20, "Male", 3);

// resetPassword("ryanpond21", "change");

//  //adds 2 users where 2nd entry is invalid
//  addUser("ryanpond21","pass","rp159","Ryan","Pond","B");
//  addUser("ryanpond21","pass","rp159","Ryan","Pond","B");

// //  //adds more users
//  addUser("teddy","password","ejr25","Teddy","Ruby","C");
//  addUser("KVD","girlswhocode","kvd101","Katie","Van Dyk","A");
//  addUser("Our Hero","node.js","bgs","Bilva","Sanaba","D");
//  addUser("Alex <3","trackstar","agb","Alex","Boss","A");

//  //cheks if 2 logins are sucessfull

loginSuccess('ryanpond21','passw');




//  let val1 = loginSuccess("ryanpond21","pass");





// let val2 = loginSuccess("ryanpond21","change");
// val1.then(function (res) {
// 	console.log(res);
//   });
// val2.then(function (res) {
// console.log(res);
// });


db.close();


