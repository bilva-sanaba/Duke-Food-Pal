var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database("FoodPal");


/*
This function gets all food less than cost order by calories decreasing
*/
function lowCostHighCal(cost) {
    return result = new Promise(function(resolve, reject){
        items = [];
        sql = "SELECT * FROM Food WHERE price < ? ORDER BY calories DESC";
        db.all(sql, cost, function(err, rows){
            rows.forEach(function(row) {
                items.push(row.name, row.vendorName, row.price)
            });
            resolve(items);
        });
    });
}



/*
This function returns all meals that meet the given criteria
*/
function getSuggestion(cost, lowcal, highcal, lowprot, highprot, lowfat, highfat, lowcarb, highcarb) {
    return result = new Promise(function(resolve, reject){
        items = [];
        sql = "SELECT * FROM Food WHERE price <= ? AND calories >= ? AND calories <= ? AND " +
        "protein >= ? and protein <=? AND fat >= ? AND fat <= ? AND carbs >= ? AND carbs <= ? ";
        db.all(sql, cost, lowcal, highcal, lowprot, highprot, lowfat, highfat, lowcarb, highcarb,  function(err, rows){
            rows.forEach(function(row) {
                items.push(row.name, row.vendorName, row.price)
            });
            resolve(items);
        });
    });
}



/*
This function returns all meals that follow a forumla to ensure they are well balanced
(correct ratio of carbs, fat, and protein)
*/
function wellBalanced(){
    return results = new Promise(function(resolve, reject) {
        let items = [];
        sql = "SELECT * FROM Food";
        db.all(sql, function(err, rows) {
            rows.forEach((row) =>{
                let carbratio = ((row.carbs*4)/row.calories); 
                let fatratio = ((row.fat*9)/row.calories);
                let proratio =  ((row.protein*4)/row.calories);
                console.log(carbratio, fatratio, proratio);
                if (carbratio > .3 && carbratio < .5 && fatratio > .2 && fatratio < .4 && proratio > .2 && proratio < .4) {
                    items.push(row.name, row.vendorName);
                }
            });
            resolve(items);
        });
    });
}



/*
This function returns all food items sorted by price
type = "ASC" or "DESC" and specifies the ordering
*/
function priceSortResturant(type){
    return results = new Promise(function(resolve, reject){
        let resturants = [];
        let sql = "SELECT vendorName, AVG(price) as p FROM Food GROUP BY vendorName ORDER BY AVG(price) s" + type;
        db.all(sql, function(err, rows){
            rows.forEach((row)=> {
                resturants.push(row.vendorName, row.p);
            });
            resolve(resturants);
        });
    })
}




/*
This function returns all food items sorted by calorie
type = "ASC" or "DESC" and specifies the ordering
*/
function calorieSort(type){
    return results = new Promise(function(resolve, reject){
        let items = [];
        let sql = "SELECT name, vendorName, calories FROM Food ORDER BY calories " + type;
        db.all(sql, function(err, rows){
            rows.forEach((row)=> {
                items.push(row.name, row.vendorName, row.calories);
            });
            resolve(items);
        });
    })
}






/*
This function returns all food items sorted by carb
type = "ASC" or "DESC" and specifies the ordering
*/
function carbSort(type){
    return results = new Promise(function(resolve, reject){
        let items = [];
        let sql = "SELECT name, vendorName, carbs FROM Food ORDER BY carbs " + type;
        db.all(sql, function(err, rows){
            rows.forEach((row)=> {
                items.push(row.name, row.vendorName, row.carbs);;
            });
            resolve(items);
        });
    })
}






/*
This function returns all food items sorted by fat
type = "ASC" or "DESC" and specifies the ordering
*/
function fatSort(type){
    return results = new Promise(function(resolve, reject){
        let items = [];
        let sql = "SELECT name, vendorName, fat FROM Food ORDER BY fat " + type;
        db.all(sql, function(err, rows){
            rows.forEach((row)=> {
                items.push(row.name, row.vendorName, row.fat);
            });
            resolve(items);
        });
    })
}






/*
This function returns all food items sorted by protein
type = "ASC" or "DESC" and specifies the ordering
*/
function proteinSort(type){
    return results = new Promise(function(resolve, reject){
        let items = [];
        let sql = "SELECT name, vendorName, protein FROM Food ORDER BY protein " + type;
        db.all(sql, function(err, rows){
            rows.forEach((row)=> {
                items.push(row.name, row.vendorName, row.protein);
            });
            resolve(items);
        });
    })
}








/* EVERYTHING UNDER HERE IS FOR TESTING */









lowprice = lowCostHighCal(15.00);
lowprice.then((r) => {
    console.log(r);
});

lowprice = priceSortResturant("ASC");
lowprice.then((r)=> {
    console.log(r);
});

low = calorieSort("ASC");
low.then((r)=> {
    console.log(r);
});

low1 = carbSort("ASC");
low1.then((r)=> {
    console.log(r);
});

low2 = fatSort("ASC");
low2.then((r)=> {
    console.log(r);
});

low3 = proteinSort("ASC");
low3.then((r)=> {
    console.log(r);
});





lowprice = priceSortResturant("DESC");
lowprice.then((r)=> {
    console.log(r);
});
low = calorieSort("DESC");
low.then((r)=> {
    console.log(r);
});
low = carbSort("DESC");
low.then((r)=> {
    console.log(r);
});

low = fatSort("DESC");
low.then((r)=> {
    console.log(r);
});

low = proteinSort("DESC");
low.then((r)=> {
    console.log(r);
});



sug = getSuggestion(9.98, 0, 600, 0, 100, 0, 100, 0, 100);
sug.then((r) => {
    console.log(r);
});

well = wellBalanced();
well.then((r)=>{
    console.log(r);
})



db.close();