 var data = {}
 data.username = window.localStorage.getItem('username');
console.log(data.username);
 $.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        url: 'http://dukefoodpal.herokuapp.com/userValidate',
         'success': function(res){
            if (res.success==="false"){
            	window.location.href="/index.html"
            }
         }                      
    });
