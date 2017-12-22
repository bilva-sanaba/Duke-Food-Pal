// Chart.js scripts
// -- Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';

// function printSomething() {
//   console.log("Printingggg");
// }

// function updatedBarChart(values, idname) {
//   var pie = document.getElementById(idname);
//   pie.labels = values;
//   pie.data = values;

// }




function updatedVendorPop(vendor, values) {
  var max = 4;
  if (values.length < 4){
    max = values.length;
  }
  var ctx = document.getElementById("MoneyCountVendor");
  var myPieChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: vendor.slice(0,max),
      datasets: [{
        data: values.slice(0, max),
        backgroundColor: ['#007bff', '#dc3545', '#ffc107', '#28a745'],
      }],
    },
  });

}
function updatedMacro(values) {
  var ctx = document.getElementById("Macronutrients");
  var myPieChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ["Carbs", "Protein", "Fat"],
      datasets: [{
        data: values.slice(1, values.length),
        backgroundColor: ['#007bff', '#dc3545', '#ffc107', '#28a745'],
      }],
    },
  });

}

function updatedVendorCals(vendor, values) {
  var max = 4;
  if (values.length < 4){
    max = values.length;
  }
  var ctx = document.getElementById("CalCountVendor");
  var myPieChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: vendor.slice(0,max),
      datasets: [{
        data: values.slice(0,max),
        backgroundColor: ['#007bff', '#dc3545', '#ffc107', '#28a745'],
      }],
    },
  });
}


function yourCommonFood(food, quantity) {
var ctx = document.getElementById("PopFoodItems");
var myLineChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: food.slice(0,5),
    datasets: [{
      label: "Quantity",
      lineTension: 0.3,
      backgroundColor: "rgba(2,117,216,0.2)",
      borderColor: "rgba(2,117,216,1)",
      pointRadius: 5,
      pointBackgroundColor: "rgba(2,117,216,1)",
      pointBorderColor: "rgba(255,255,255,0.8)",
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(2,117,216,1)",
      pointHitRadius: 20,
      pointBorderWidth: 2,
      data: quantity.slice(0,5),
    }],
  },
  options: {
    scales: {
      xAxes: [{
        time: {
          unit: 'string'
        },
        gridLines: {
          display: false
        },
        ticks: {
          maxTicksLimit: 7
        }
      }],
      yAxes: [{
        ticks: {
          min: 0,
          max: quantity[0] + 3,
          maxTicksLimit: 20
        },
        gridLines: {
          color: "rgba(0, 0, 0, .125)",
        }
      }],
    },
    legend: {
      display: false
    }
  }
});
}

function allCommonFood(food, quantity) {
var ctx = document.getElementById("MostPopVendors");
var myLineChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: food.slice(0,5),
    datasets: [{
      label: "Quantity",
      lineTension: 0.3,
      backgroundColor: "rgba(2,117,216,0.2)",
      borderColor: "rgba(2,117,216,1)",
      pointRadius: 5,
      pointBackgroundColor: "rgba(2,117,216,1)",
      pointBorderColor: "rgba(255,255,255,0.8)",
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(2,117,216,1)",
      pointHitRadius: 20,
      pointBorderWidth: 2,
      data: quantity.slice(0,5),
    }],
  },
  options: {
    scales: {
      xAxes: [{
        time: {
          unit: 'date'
        },
        gridLines: {
          display: false
        },
        ticks: {
          maxTicksLimit: 7
        }
      }],
      yAxes: [{
        ticks: {
          min: 0,
          max: quantity[0]+3,
          maxTicksLimit: 20
        },
        gridLines: {
          color: "rgba(0, 0, 0, .125)",
        }
      }],
    },
    legend: {
      display: false
    }
  }
});
}

function createBarGraphs() {
  var datereq = window.localStorage.getItem('date');
  if (datereq.length === 0){
    datereq = 365;
  }
  console.log(datereq);
  data = {};
  data.username = window.localStorage.getItem('username');
  data.date = datereq;
  $.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: 'http://dukefoodpal.herokuapp.com/loadBarGraphs',
        data: JSON.stringify(data),
        followAllRedirects: true,
         'success': function(res){
          console.log(res);
            //Data in order of [local food, local vendor, local count, global food, global vendor, global count]
            yourCommonFood(res[0], res[2]);
            allCommonFood(res[3], res[5]);
         }                      
    });
}




function createPieCharts() {
  console.log("in create money");
  var datereq = window.localStorage.getItem('date');
  if (datereq.length === 0){
    datereq = 365;
  }
  console.log(datereq);
  data = {};
  data.date = datereq;
  data.username = window.localStorage.getItem('username');
  $.ajax({
      type: 'POST',
      contentType: 'application/json',
      url: 'http://dukefoodpal.herokuapp.com/loadMoneySpentByVendor',
      data: JSON.stringify(data),
      followAllRedirects: true,
       'success': function(res){
        console.log(res);
          //Vendors in order of money spent, money spent per vendor, [cals,carbs,proteins,fats], cals per vendor
          updatedVendorPop(res[0], res[1]);
          updatedMacro(res[2]);
          updatedVendorCals(res[0], res[3]);
          
       }                      
  });
}
function reloadStat(){
  window.localStorage.setItem('date', document.getElementById("keyword").value);
  window.location.href="statistics.html"
}

