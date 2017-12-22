
function handleLogin(){
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    var data = {};
    data.username = username;
    data.password = password;
    $.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        url: 'http://dukefoodpal.herokuapp.com/loginStatus',
        followAllRedirects: true,
         'success': function(res){
            if (res.success==="true"){
                window.localStorage.setItem('username', res.username);
                document.location.href = res.redirect;
            }else{
                document.getElementById("incorrect").textContent="Incorrect Username or Password";
            }
         }                      
    });
}

function addUser(){
    var data = {};
    data.username = document.getElementById("username").value;
    data.password = document.getElementById("password").value;
	data.confirmPassword = document.getElementById("confirmPassword").value;
    data.FirstName = document.getElementById("FirstName").value;
    data.LastName = document.getElementById("LastName").value;
    data.NetID = document.getElementById("NetID").value;
    console.log(data);
	if(data.password!=data.confirmPassword){
		document.getElementById("incorrect").textContent="Passwords do not match!";
	}
	else {
	 $.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        url: 'http://dukefoodpal.herokuapp.com/createUser',
        followAllRedirects: true,
         'success': function(res){
            if(res.stat!="success"){
                document.getElementById("incorrect").textContent="Either username or netID is taken, or some fields are empty!";

            }
            else{
                window.localStorage.setItem('username', res.username);
                document.location.href = res.redirect;
            }
            
         }                      
    });
	}
}
