/* This function gets home page graphs */
exports.getHomeGraphs = function (req,db){
    var username = req.body.username;
    let arr = [];
    let day = [];
    let cals = [];
    let price = [];
    return result = new Promise(   function(resolve, reject) {
  		let sql= "SELECT log.time as t, SUM(calories) as c, SUM(price) as p FROM (SELECT foodName, vendorName, round(abs(julianday('now')-julianday(timestamp) -.5)) as time FROM FoodLog WHERE username = ?) as log, Food WHERE Food.name = log.foodName GROUP BY time HAVING log.time < 14";
      	db.all(sql, username, function(err, rows){
        	console.log(rows);
        	rows.forEach((row)=>{
        		day.push(row.t);
        		cals.push(row.c);
        		price.push(row.p);
        	});
        	arr.push(day,cals,price);
        	resolve(arr);
    	});
  	});
}