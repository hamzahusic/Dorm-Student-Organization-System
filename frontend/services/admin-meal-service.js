let AdminMealService = {

    init: function () {
        $("#addMealForm").validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2,
                    maxlength: 50
                },
                type: {
                    required: true
                },
                description: {
                    required: true,
                    minlength: 2,
                    maxlength: 250
                },
                date: {
                    required: true
                },
            },
            messages: {
                name: {
                    required: "Please enter a meal name",
                    minlength: "Meal name must be at least 2 characters long",
                    maxlength: "Meal name cannot exceed 50 characters"
                },
                type: {
                    required: "Please enter a meal type"
                },
                description: {
                    required: "Please enter a meal description",
                    minlength: "Meal description must be at least 2 characters long",
                    maxlength: "Meal description cannot exceed 250 characters"
                },
                date: {
                    required: "Please enter the date",
                },
            },
            submitHandler: function (form) {
                let meal = Object.fromEntries(new FormData(form).entries());
                AdminMealService.addMeal(meal);
            }
        });

        $("#updateMealForm").validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2,
                    maxlength: 50
                },
                type: {
                    required: true
                },
                description: {
                    required: true,
                    minlength: 2,
                    maxlength: 250
                },
                date: {
                    required: true
                },
            },
            messages: {
                name: {
                    required: "Please enter a meal name",
                    minlength: "Meal name must be at least 2 characters long",
                    maxlength: "Meal name cannot exceed 50 characters"
                },
                type: {
                    required: "Please enter a meal type"
                },
                description: {
                    required: "Please enter a meal description",
                    minlength: "Meal description must be at least 2 characters long",
                    maxlength: "Meal description cannot exceed 250 characters"
                },
                date: {
                    required: "Please enter the date",
                },
            },
            submitHandler: function (form) {
                let meal = Object.fromEntries(new FormData(form).entries());
                AdminMealService.updateMeal(meal);
            }
        });
        
        let user = localStorage.getItem('user_token');
        user = Utils.parseJwt(user).user;

        $("#meals-sidenav-user-email").text(user ? user.email : "User not found");
        AdminMealService.getAllMeals();
    },

    getAllMeals: function () {
        RestClient.get("meals", function (data) {
            Utils.datatable("meals-table", [
                { data: 'name', title: 'Meal Name' },
                { data: 'type', title: 'Type' },
                { 
                    data: 'description', 
                    title: 'Description',
                    width: '350px',
                    render: function (data, type, row) {
                        if (type === 'display' && data && data.length > 50) {
                            return '<div style="max-width: 350px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="' + data + '">' + data + '</div>';
                        }
                        return data;
                    }
                },
                { 
                    data: 'date', 
                    title: 'Date',
                    render: function (data, type, row) {
                        if (data) {
                            let date = new Date(data);
                            return date.toLocaleDateString('en-US', { 
                                year: 'numeric', 
                                month: 'short', 
                                day: 'numeric' 
                            });
                        }
                        return data;
                    }
                },
                {
                    title: "Actions",
                    render: function (data, type, row) {
                        return `
                            <td style="display: flex; gap: 5px; align-items: center; justify-content: center;">
                                <button type="button" class="btn btn-sm btn-primary" onclick="AdminMealService.openEditModal(${row.id})">
                                    <i class="fas fa-pen"></i> Edit
                                </button>
                                <button type="button" class="btn btn-sm btn-danger" onclick="AdminMealService.openDeleteModal(${row.id}, '${row.name}')">
                                    <i class="fas fa-trash-alt"></i> Remove
                                </button>
                            </td>
                        `;
                    }
                }
            ], data, 10);
        });
    },

    getMealById: function (id) {
        $.blockUI({ message: '<h3>Loading...</h3>' });

        RestClient.get("meals", function (data) {
            let meal = data.find(m => m.id == id);
            
            if (meal) {
                // Populate EDIT modal
                $("#updateMealId").val(meal.id);
                $("#updateMealName").val(meal.name);
                $("#updateMealType").val(meal.type);
                $("#updateMealDescription").val(meal.description);
                $("#updateMealDate").val(meal.date);
                
                $.unblockUI();
            } else {
                $.unblockUI();
                toastr.error("Meal not found");
                AdminMealService.closeModal();
            }
        }, function () {
            $.unblockUI();
            toastr.error("Cannot load meal data");
            AdminMealService.closeModal();
        });
    },

    openEditModal: function (id) {
        $('#updateMealModal').modal("show");
        AdminMealService.getMealById(id);
    },

    openDeleteModal: function (id, name) {
        $("#deleteMealModal").modal("show");
        $("#delete-meal-head").text(name);
        $("#deleteMealId").val(id);
    },

    addMeal: function (meal) {
        document.activeElement.blur();
        
        $.blockUI({ message: '<h3>Adding...</h3>' });

        RestClient.post(
            "meals",
            JSON.stringify(meal),
            function () {
                toastr.success("Meal added successfully");
                $.unblockUI();
                AdminMealService.closeModal();
                AdminMealService.getAllMeals();
            },
            function (error) {
                $.unblockUI();
                toastr.error(error.responseJSON?.message || "Cannot add meal");
            }
        );
    },

    updateMeal: function (meal) {
        document.activeElement.blur();
        
        $.blockUI({ message: '<h3>Updating...</h3>' });

        RestClient.put(
            "meals",
            JSON.stringify(meal),
            function () {
                toastr.success("Meal updated successfully");
                $.unblockUI();
                AdminMealService.closeModal();
                AdminMealService.getAllMeals();
            },
            function (error) {
                $.unblockUI();
                toastr.error(error.responseJSON?.message || "Cannot update meal");
            }
        );
    },

    deleteMeal: function () {
        document.activeElement.blur();

        let id = $("#deleteMealId").val();

        RestClient.delete(
            "meals/" + id,
            null,
            function (response) {
                toastr.success(response.message || "Meal deleted successfully");
                AdminMealService.closeModal();
                AdminMealService.getAllMeals();
            },
            function (response) {
                toastr.error(response.responseJSON?.message || "Error deleting meal");
                AdminMealService.closeModal();
            }
        );
    },

    closeModal: function () {
        $(".modal").modal("hide");
    },
};