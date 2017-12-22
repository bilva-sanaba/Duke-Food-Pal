function getSliders(){
    data = {};
    data.price = getSlider("sliderPrice");
    data.cals = getSlider("sliderCals");
    data.carbs = getSlider("sliderCarbs");
    data.prot = getSlider("sliderProt");
    data.fat = getSlider("sliderFat");
    data.keyword = getKeyword();
    data.vendor = getVendor();
	document.getElementById("Anything").style.display="none";

    var beginTable = "  <table class='table table-bordered' id='dataTable' width='100%' cellspacing='0'>\
              <thead>\
                <tr>\
                  <th>Name</th>\
                  <th>Vendor</th>\
                  <th>Price</th>\
                  <th>Calories</th>\
                  <th>Fat</th>\
                  <th>Proteins</th>\
                  <th>Carbs</th>\
                </tr>\
              </thead>\
              <tbody id='bodylog' >";
    var endTable = "</tbody></table>";


    $.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        url: 'http://dukefoodpal.herokuapp.com/getSuggestion',
         'success': function(res){
            table = beginTable+res+endTable;
            console.log(table)
            $('#display').replaceWith(table); 
         }                      
    });
}

function getSlider(idName){
    var style = document.getElementById(idName).childNodes[0].childNodes[1].style.cssText;
    var left = style.split(":")[1].split("%")[0];
    var right = style.split(":")[2].split("%")[0];
    var data = {};
    data.left = parseInt(left);
    data.right = parseInt(right)+data.left;
    return data;
}
function getKeyword(){
    return keyword = document.getElementById("keyword").value;
}
function getVendor(){
    return vendor = document.getElementById("vendorSelect").value;
}
function createVendorDropDown() {
    $.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: 'http://dukefoodpal.herokuapp.com/loadVendors',
        followAllRedirects: true,
         'success': function(res){
            $('#vendorSelect').append(res);
         }                      
    });
}

function createSuggestionTable() {
    //var date = document.getElementById("date").value;
    var date = 10;
    var data = {};
    data.date = date;
    $.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        url: 'http://dukefoodpal.herokuapp.com/loadDiary',
        followAllRedirects: true,
         'success': function(res){
            $("body").append(beginTable+res+endTable);
         }                      
    });
}