exports.loginSuccess = function (username, password,db){
                          let sql = 'SELECT * FROM People WHERE username = ? AND password = ?';
                          return result = new Promise(function(resolve, reject) {
                            db.get(sql, [username, password], function(err,row) {
                              if (!err) {    
                                var data = {};
                                data.success = "false";
                                data.username = "";
                                if(row){
                                  data.success = "true";
                                  data.username = row.username;
                                }
                                resolve(data);
                              }
                            });
                          });
                      }


/* This function inserts a new user into Person */
exports.addUser =  function (username,password,netID,firstname,lastname,mealPlan,db) {
                        let sql = "INSERT INTO People VALUES (?,?,?,?,?,?)";
                        return result = new Promise(function(resolve, reject) {
                          db.run(sql,username,password,netID,firstname,lastname,mealPlan, function(err){
                            var data = {};
                            console.log(err);
                            if(err){
                              data.ret="Fail";
                            }
                            else {
                              data.ret="Success";
                            }
                            resolve(data);
                          });
                       });
                     }


exports.checkUserExists = function(username,db){
                          let sql = 'SELECT * FROM People WHERE username = ?';
                          return result = new Promise(function(resolve, reject) {
                            db.get(sql, username, function(err,row) {
                              if (!err) {    
                                var data = {};
                                data.success = "false";
                                if(row){
                                  data.success = "true";
                                }
                                resolve(data);
                              }
                            });
                          });
}
