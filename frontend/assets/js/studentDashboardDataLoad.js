function studentDashboardInit() {
    // Student's room information (mock data)
    const studentRoomInfo = {
        roomNumber: 204,
        floor: 2,
        capacity: "2/3"
    };

    // Today's meals (mock data)
    const todaysMeals = [
        {
            type: "Breakfast",
            name: "Scrambled Eggs with Toast",
            description: "Fluffy scrambled eggs served with whole wheat toast, butter, and orange juice.",
            icon: "fas fa-coffee",
            bgColor: "bg-warning"
        },
        {
            type: "Lunch",
            name: "Grilled Chicken with Rice",
            description: "Marinated grilled chicken breast served with steamed rice and mixed vegetables.",
            icon: "fas fa-hamburger",
            bgColor: "bg-info"
        },
        {
            type: "Dinner",
            name: "Spaghetti Bolognese",
            description: "Classic Italian pasta with rich meat sauce and parmesan cheese.",
            icon: "fas fa-pizza-slice",
            bgColor: "bg-success"
        }
    ];

    // Display room information
    if (document.getElementById('studentRoomNumber')) {
        document.getElementById('studentRoomNumber').textContent = studentRoomInfo.roomNumber;
        document.getElementById('studentFloor').textContent = studentRoomInfo.floor;
        document.getElementById('studentCapacity').textContent = studentRoomInfo.capacity;
    }

    // Display today's date
    const todayDateElement = document.getElementById('todayDate');
    if (todayDateElement) {
        const today = new Date();
        todayDateElement.textContent = today.toLocaleDateString('en-US', { 
            weekday: 'long',
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    }

    // Display today's meals
    const todayMealsContainer = document.getElementById('todayMealsContainer');
    if (todayMealsContainer) {
        todaysMeals.forEach(meal => {
            const mealCard = document.createElement('div');
            mealCard.className = 'col-md-4 mb-3';
            mealCard.innerHTML = `
                <div class="card ${meal.bgColor} text-white h-100">
                    <div class="card-body">
                        <h5 class="card-title">
                            <i class="${meal.icon} me-2"></i>${meal.type}
                        </h5>
                        <h6 class="card-subtitle mb-2">${meal.name}</h6>
                        <p class="card-text small">${meal.description}</p>
                    </div>
                </div>
            `;
            todayMealsContainer.appendChild(mealCard);
        });
    }
}

// Student's monthly meals chart
function loadStudentMealsChart() {
    // Set default font family and color
    Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
    Chart.defaults.global.defaultFontColor = '#292b2c';

    const ctx = document.getElementById("studentMealsChart");
    
    if (ctx) {
        const myLineChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ["Oct 1", "Oct 2", "Oct 3", "Oct 4", "Oct 5", "Oct 6", "Oct 7", "Oct 8", "Oct 9", "Oct 10", "Oct 11", "Oct 12", "Oct 13", "Oct 14", "Oct 15"],
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
                    data: [3, 2, 3, 3, 2, 3, 3, 2, 3, 3, 1, 3, 3, 2, 3],
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
}