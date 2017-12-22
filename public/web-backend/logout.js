
function handleLogout(){
    window.localStorage.setItem('username', "");
    window.location.href = "login.html";
}