/* This function is for inputting a meal
*/
exports.addVendors = function (vendors,db){
      let stringval= "";
      for (var i = 0; i < vendors.length; i ++){
        stringval += "<option>" +  vendors[i] + "</option>"
      }
      return stringval;
    }


/* This function gets all food
*/
exports.getFood = function(vendor,db){
    return result = new Promise(function(resolve, reject) {
      let arr = [];
      let sql = "SELECT * FROM Food WHERE vendorName = ?";
    db.all(sql, vendor, function(err,rows){
      rows.forEach(function(row) {
          arr.push(row.name);
      })
      resolve(arr);
    }); 
  });
  }