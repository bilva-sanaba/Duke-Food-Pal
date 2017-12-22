var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database("FoodPal");


function getSuggestion(name, vendorName, cost, lowcal, highcal, lowprot, highprot, lowfat, highfat, lowcarb, highcarb) {
    return result = new Promise(function(resolve, reject){
        items = [];
        sql = "SELECT * FROM Food WHERE name LIKE '%' OR vendorName LIKE '%' AND price <= ? AND calories >= ? AND calories <= ? AND " +
        "protein >= ? and protein <=? AND fat >= ? AND fat <= ? AND carbs >= ? AND carbs <= ? ";
        db.all(sql, name, vendorName, cost, lowcal, highcal, lowprot, highprot, lowfat, highfat, lowcarb, highcarb,  function(err, rows){
            rows.forEach(function(row) {
                items.push(row.name, row.vendorName, row.price)
            });
            resolve(items);
        });
    });
}
let sug = getSuggestion("Ch", "Au", 10, 0, 1000, 0, 1000, 0, 1000, 0, 1000);
sug.then((result)=>{
	console.log(result);
})

//console.log("Hello!");