let StudentMealService = {

    init: function () {
        let user = localStorage.getItem('user_token');
        user = Utils.parseJwt(user);

        $(`#student-meal-sidenav-user-email`).text(user.user ? user.user.email : "User not found");
        StudentMealService.getTodaysMeals();
        StudentMealService.setupMealCheckboxListeners();
    },

    setupMealCheckboxListeners: function () {
        $(document).on('change', '.meal-selector', function () {
            const isChecked = $(this).is(':checked');
            const mealId = $(this).data('meal-id');
            const userMealId = $(this).data('user-meal-id');
            const checkbox = $(this);

            if (isChecked) {
                StudentMealService.takeMeal(mealId, checkbox);
            } else {
                StudentMealService.deleteTakenMeal(userMealId, checkbox);
            }
        });
    },

    getTodaysMeals: function () {
        $("#noMealsCreated").hide()
        $.blockUI({ message: '<h3>Loading...</h3>' });

        RestClient.get("student/meals/today", function (data) {
            if(data.length == 0){
                $("#noMealsCreated").show()
            }else{
                $("#mealsContainer").empty()
                data.forEach(meal => {
                    $("#mealsContainer").append(
                        `<div class="card mb-4">
                            <div class="card-header ${meal.type === "breakfast" ? "bg-warning" : meal.type === "lunch" ? "bg-info" : "bg-success"} text-white">
                                <i class="fas ${meal.type === "breakfast" ? "fa-coffee" : meal.type === "lunch" ? "fa-hamburger" : "fa-pizza-slice"} me-2"></i>
                                <strong>${meal.type} - 
                                ${meal.type == "breakfast" ? "Sign up for meal until 7AM (Breakfast starts at 9AM)"
                                : meal.type == "lunch" ? "Sign up for meal until 1PM (Lunch starts at 3PM)"
                                : "Sign up for meal until 5PM (Dinner starts at 7PM)"
                                }</strong>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-9">
                                        <h5 class="card-title">${meal.name}</h5>
                                        <p class="card-text">${meal.description}</p>
                                    </div>
                                    <div class="col-md-3 d-flex align-items-center justify-content-center">
                                        <div class="form-check form-switch" style="transform: scale(1.5);">
                                            <input class="form-check-input meal-selector" type="checkbox" id="meal${meal.meal_id}" ${meal.taken == 1 ? 'checked' : ''} data-meal-id="${meal.meal_id}" data-user-meal-id="${meal.user_meal_id || ''}">
                                            <label class="form-check-label" for="meal${meal.meal_id}"></label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        `
                    ) 
                })
            }

            $.unblockUI();
        }, function () {
            $.unblockUI();
            $("#noMealsCreated").show()
            toastr.error("Cannot load todays meals");
        });
    },

    takeMeal: function (mealId, checkbox) {
        $.blockUI({ message: '<h3>Taking meal...</h3>' });

        RestClient.post(
            "student/meals",
            JSON.stringify({ meal_id: mealId }),
            function (response) {
                toastr.success("Meal taken successfully");
                if (response.user_meal_id) {
                    checkbox.data('user-meal-id', response.user_meal_id);
                    checkbox.attr('data-user-meal-id', response.user_meal_id);
                }
                $.unblockUI();
            },
            function (error) {
                $.unblockUI();
                checkbox.prop('checked', false);
                toastr.error(error.responseJSON?.error || "Cannot take meal");
            }
        );
    },

    deleteTakenMeal: function (userMealId, checkbox) {
        if (!userMealId) {
            toastr.error("Cannot delete meal: Invalid meal ID");
            checkbox.prop('checked', true);
            return;
        }

        $.blockUI({ message: '<h3>Removing meal...</h3>' });

        RestClient.delete(
            `student/meals/${userMealId}`,
            null,
            function (response) {
                toastr.success(response.message);
                
                // Clear the user_meal_id from the checkbox
                checkbox.data('user-meal-id', '');
                checkbox.attr('data-user-meal-id', '');
                
                $.unblockUI();
            },
            function (error) {
                $.unblockUI();
                // Re-check the checkbox if the request fails
                checkbox.prop('checked', true);
                toastr.error("Cannot remove meal");
            }
        );
    },
};