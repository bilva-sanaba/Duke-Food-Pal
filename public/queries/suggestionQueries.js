exports.getSuggestion = function (name, vendorName, cost, lowcal, highcal, lowprot, highprot, lowfat, highfat, lowcarb, highcarb,db) {
    
    name = "%"+name+"%";
    vendorName = "%"+vendorName+"%";
    return result = new Promise(function(resolve, reject){
        items = [];
        sql = "SELECT * FROM Food WHERE name LIKE ? AND vendorName LIKE ? AND price <= ? AND calories >= ? AND calories <= ? AND protein >= ? and protein <=? AND fat >= ? AND fat <= ? AND carbs >= ? AND carbs <= ? ";
        db.all(sql,name,vendorName,cost, lowcal, highcal, lowprot, highprot, lowfat, highfat, lowcarb, highcarb,   function(err, rows){
            rows.forEach(function(row) {
                items.push([row.name, row.vendorName, row.price, row.calories, row.fat, row.protein, row.carbs])
            });
            resolve(items);
        });
    });
}