// Chart.js scripts
// -- Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';


// HOMEPAGE CHARTS

// -- Spending Grouped by Day
var ctx = document.getElementById("SpendingByDay");
var myLineChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ["Test", "Mar 2", "Mar 3", "Mar 4", "Mar 5", "Mar 6", "Mar 7", "Mar 8", "Mar 9", "Mar 10", "Mar 11", "Mar 12", "Mar 13"],
    datasets: [{
      label: "Sessions",
      lineTension: 0.3,
      backgroundColor: "rgba(3,97,184,0.2)",
      borderColor: "rgba(2,117,216,1)",
      pointRadius: 5,
      pointBackgroundColor: "rgba(2,117,216,1)",
      pointBorderColor: "rgba(255,255,255,0.8)",
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(2,117,216,1)",
      pointHitRadius: 20,
      pointBorderWidth: 2,
      data: [10000, 30162, 26263, 18394, 18287, 28682, 31274, 33259, 25849, 24159, 32651, 31984, 38451],
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
          max: 40000,
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


// -- Calories Grouped by Day





















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



get







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
          labels: realdate,
          datasets: [{
            label: "Sessions",
            lineTension: 0.3,
            backgroundColor: "rgba(210,232,253,0.2)",
            borderColor: "rgba(2,117,216,1)",
            pointRadius: 5,
            pointBackgroundColor: "rgba(2,117,216,1)",
            pointBorderColor: "rgba(255,255,255,0.8)",
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(2,117,216,1)",
            pointHitRadius: 20,
            pointBorderWidth: 2,
            data: realcals,
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
                max: 4000,
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


function getcalSum(dates, prices) {
    var realdate = [0,1,2,3,4,5,6,7,8,9,10,11,12,13];
    var realprices = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    for (var j = 0; j < dates.length; j ++){
        d = dates[j];
        realprices[d] = prices[j];
    }
    var ctx = document.getElementById("CaloriesByDay");
    var myLineChart = new Chart(ctx, {
    
        type: 'line',
        data: {
          labels: realdate,
          datasets: [{
            label: "Sessions",
            lineTension: 0.3,
            backgroundColor: "rgba(210,232,253,0.2)",
            borderColor: "rgba(2,117,216,1)",
            pointRadius: 5,
            pointBackgroundColor: "rgba(2,117,216,1)",
            pointBorderColor: "rgba(255,255,255,0.8)",
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(2,117,216,1)",
            pointHitRadius: 20,
            pointBorderWidth: 2,
            data: realprice,
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
                max: 100,
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


getCalories("ryanpond21");





