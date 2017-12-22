// Chart.js scripts
// -- Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';


// HOMEPAGE CHARTS

// -- Spending Grouped by Day



// -- Calories Grouped by Day




















function createHomeGraphs() {
  data = {};
  data.username = window.localStorage.getItem('username');
  $.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: 'http://dukefoodpal.herokuapp.com/loadHomeGraphs',
        data: JSON.stringify(data),
        followAllRedirects: true,
         'success': function(res){
            //Data in order of [day, cals, price]
            getcalSum(res[0],res[1]);
            getpriceSum(res[0],res[2]);
         }                      
    });
}

function getcalSum(dates, calories) {
    var realdate = [0,1,2,3,4,5,6,7,8,9,10,11,12,13];
    var realcals = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    for (var j = 0; j < dates.length; j ++){
        d = dates[j];
        realcals[d] = calories[j];
    }
    var ctx = document.getElementById("CaloriesByDay");
    var myLineChart = new Chart(ctx, {
    
        type: 'line',
        data: {
          labels: realdate.reverse(),
          datasets: [{
            label: "Calories Consumed",
            lineTension: 0.3,
            backgroundColor: "rgba(210,232,253,0.2)",
            borderColor: "rgba(2,117,216,1)",
            pointRadius: 5,
            pointBackgroundColor: "rgba(2,117,216,1)",
            pointBorderColor: "rgba(255,255,255,0.8",
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(2,117,216,1)",
            pointHitRadius: 20,
            pointBorderWidth: 2,
            data: realcals.reverse(),
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
                max: 3000,
                maxTicksLimit: 5
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


function getpriceSum(dates, prices) {
    var realdate = [0,1,2,3,4,5,6,7,8,9,10,11,12,13];
    var realprices = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    for (var j = 0; j < dates.length; j ++){
        d = dates[j];
        realprices[d] = prices[j];
    }
    console.log(dates);
    console.log(prices);
    console.log(realdate);
    console.log(realprices);
    var ctx = document.getElementById("SpendingByDay");
    var myLineChart = new Chart(ctx, {
    
        type: 'line',
        data: {
          labels: realdate.reverse(),
          datasets: [{
            label: "Food Points Spent",
            lineTension: 0.3,
            backgroundColor: "rgba(210,232,253,0.2)",
            borderColor: "rgba(2,117,216,1)",
            pointRadius: 5,
            pointBackgroundColor: "rgba(2,117,216,1)",
            pointBorderColor: "rgba(255,255,255,0.8",
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(2,117,216,1)",
            pointHitRadius: 20,
            pointBorderWidth: 2,
            data: realprices.reverse(),
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
                max: 60,
                maxTicksLimit: 5
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

function createCalorieGraph() {
  $.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: 'http://dukefoodpal.herokuapp.com/loadCalorieGraph',
        followAllRedirects: true,
         'success': function(res){
          console.log(res);
            //Data in order of [local food, local vendor, local count, global food, global vendor, global count]
            yourCommonFood(res[0], res[2]);
            allCommonFood(res[3], res[5]);
         }                      
    });
}



function getCalories(username){
    let results = [];
        let sql= "SELECT DATE(FROM_UNIXTIME(MyTimestamp)) AS ForDate, COUNT(*) AS NumPosts FROM FoodLog WHERE FoodLog.username = ? GROUP BY DATE(FROM_UNIXTIME(MyTimestamp)) ORDER BY ForDate";
        db.getall(sql, username, function(err, rows){
          rows.forEach((row)=>{
            console.log(row);
          });
      });
}


getCalories("ryanpond21");





