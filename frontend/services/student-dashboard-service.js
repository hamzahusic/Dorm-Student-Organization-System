let StudentDashboardService = {

    init: function () {
        let user = localStorage.getItem('user_token');
        user = Utils.parseJwt(user).user;
        $("#student-dashboard-sidenav-user-email").text(user ? user.email : "User not found");
        StudentDashboardService.getRoomInformation(user.room_id);
        StudentDashboardService.getTodaysMeals();
        StudentDashboardService.getTakenMeals();
    },

    getRoomInformation: function (id) {
        $(`#noRoomAssignedSecond`).hide();
        RestClient.get("room/info/" + id, function (data) {
            $("#studentRoomNumber").text(data.id);
            $("#studentFloor").text(data.floor);
            $("#studentCapacity").text(`${data.students.length}/${data.capacity}`);
        }, function (){
            $.unblockUI();
            toastr.error("Cannot load room information");
            $(`#noRoomAssignedSecond`).show();
        });
    },

    getTodaysMeals: function (){
        RestClient.get("student/meals/today/", function (data) {
            $("#todayMealsContainer").empty()

            if(data.length > 0){
                data.forEach(meal => {
                    $("#todayMealsContainer").append(
                        ` <div class="card ${meal.type === "breakfast" ? "bg-warning" : meal.type === "lunch" ? "bg-info" : "bg-success"} col-md-4 mb-3 text-white me-2" style="max-width: 30%;">
                                <div class="card-body">
                                    <h5 class="card-title">
                                        <i class="fas ${meal.type === "breakfast" ? "fa-coffee" : meal.type === "lunch" ? "fa-hamburger" : "fa-pizza-slice"} me-2"></i>${meal.type}
                                    </h5>
                                    <h6 class="card-subtitle mb-2">${meal.name}</h6>
                                    <p class="card-text small">${meal.description}</p>
                                </div>
                          </div>
                        `
                    )
                });
            }else{
                $("#todayMealsContainer").text("No meals have been created for today.")
            }

        }, function (){
            $.unblockUI();
            toastr.error("Cannot load todays meals");
        });
    },

    getTakenMeals: function (){
        RestClient.get("student/meals/per_day", function (data) {
            Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
            Chart.defaults.global.defaultFontColor = '#292b2c';

            const ctx = document.getElementById("studentMealsChart");
            
            if (ctx) {
                new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: Object.keys(data),
                        datasets: [{
                            label: "Meals Taken",
                            lineTension: 0.3,
                            backgroundColor: "rgba(2,117,216,0.2)",
                            borderColor: "rgba(2,117,216,1)",
                            pointRadius: 5,
                            pointBackgroundColor: "rgba(2,117,216,1)",
                            pointBorderColor: "rgba(255,255,255,0.8)",
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: "rgba(2,117,216,1)",
                            pointHitRadius: 50,
                            pointBorderWidth: 2,
                            data: Object.values(data),
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
                                    max: 3,
                                    maxTicksLimit: 4,
                                    stepSize: 1
                                },
                                gridLines: {
                                    color: "rgba(0, 0, 0, .125)",
                                }
                            }],
                        },
                        legend: {
                            display: false
                        },
                        tooltips: {
                            callbacks: {
                                label: function(tooltipItem) {
                                    return 'Meals: ' + tooltipItem.yLabel;
                                }
                            }
                        }
                    }
                });
            }

        }, function (){
            $.unblockUI();
            toastr.error("Cannot load todays meals");
        });
    }
};