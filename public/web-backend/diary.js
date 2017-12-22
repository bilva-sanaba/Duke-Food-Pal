function createFoodLog() {
    var date = 100;
    var data = {};
    data.date = date;
    data.username =window.localStorage.getItem('username');
    $.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        url: 'http://dukefoodpal.herokuapp.com/loadDiary',
        followAllRedirects: true,
         'success': function(res){
            $('#bodylog').append(res);
            console.log(res);
         }                      
    });
}
function test(param){
	console.log(param);
}
function deleteDiaryEntry(timeStamp) {
    var data = {};
    data.username = window.localStorage.getItem('username');
	console.log("diary.js: " + data.username);
	data.timestamp = timeStamp;
    $.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        url: 'http://dukefoodpal.herokuapp.com/deleteDiaryEntry',
        followAllRedirects: true,
         'success': function(res){
            $('#bodylog').append(res);
            //console.log(res);
         }                      
    });
}

function createVendorDropDown() {
    $.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: 'http://dukefoodpal.herokuapp.com/loadVendors',
        followAllRedirects: true,
         'success': function(res){
         	console.log(res);
            $('#vendorSelect').append(res);
            console.log(res);
         }                      
    });
}

function createMeal() {
    var vendor = document.getElementById("vendorSelect").value;
    var food = document.getElementById("foodSelect").value;
    var quantity = document.getElementById("quantitySelect").value
    var data = {};
    data.vendor = vendor;
    data.food = food;
    data.quantity = quantity;
    data.username = window.localStorage.getItem('username');
    $.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        url: 'http://dukefoodpal.herokuapp.com/createMeal',
        followAllRedirects: true,
         'success': function(res){
            
            console.log("succeeded");
         }                      
    });
}

function displayAllVendors(){
    displayVendors("The Loop");
    displayVendors("Il Forno");
    displayVendors("Pitchforks");
    displayVendors("Cafe");
    displayVendors("ABP");
}
function displayVendors(name){
    var newvendor = document.createElement("option");
    var vendorname = document.createTextNode(name);
    newvendor.appendChild(vendorname);
    var element = document.getElementById("vendorSelect");
    element.appendChild(newvendor)  
}

function loadFood() {
	var vendor = document.getElementById("vendorSelect").value;
	console.log(vendor);
	var data = {};
    data.vendor = vendor;
    var resetval = "<select class='form-control' id='foodSelect'> <option value='' disabled selected>Select your meal from the dropdown</option></select>"
    $.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        url: 'http://dukefoodpal.herokuapp.com/loadFoods',
        followAllRedirects: true,
         'success': function(res){
            $('#foodSelect').replaceWith(resetval);
            $('#foodSelect').append(res);
            console.log(res);
         }                      
    });

}

function printSomething() {
	console.log("Printingggg");
}
