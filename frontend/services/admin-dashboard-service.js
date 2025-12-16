let AdminDashboardService = {

    init: function () {
        $("#editStudentForm").validate({
            submitHandler: function (form) {
                let student = Object.fromEntries(new FormData(form).entries());
                AdminDashboardService.updateStudent(student);
            }
        });
        
        let user = localStorage.getItem('user_token');
        user = Utils.parseJwt(user).user;

        $("#sidenav-user-email").text(user ? user.email : "User not found");
        AdminDashboardService.getAllStudents();
        AdminDashboardService.loadChartArea();
        AdminDashboardService.loadBarChart();
    },

    getAllStudents: function () {
        RestClient.get("users", function (data) {
            Utils.datatable("students-table", [
                { data: 'id', title: 'ID' },
                { data: 'first_name', title: 'First Name' },
                { data: 'last_name', title: 'Last Name' },
                { data: 'email', title: 'Email' },
                { title: 'Room Number',
                    render: function (data, type, row) {
                        if (row.room_id) {
                            return `<span>${row.room_id}</span>`;
                        } else {
                            return `<span>No room assigned</span>`;
                        }
                    }
                },
                { title: 'Active',
                    render: function (data, type, row) {
                        if (row.is_active === 1) {
                            return `<span>Active</span>`;
                        } else {
                            return `<span>Inactive</span>`;
                        }
                    },
                },
                {
                    title: "Actions",
                    render: function (data, type, row) {
                        return `
                    <td style="display: flex; gap: 5px; align-items: center; justify-content: center;">
                        <!-- Button trigger modal -->
                        <button type="button" class="btn btn-sm btn-primary" onclick="AdminDashboardService.openEditModal('${row.id}')">
                            <i class="fas fa-pen"></i> Edit
                        </button>

                        <!-- Button trigger modal -->
                        <button type="button" class="btn btn-sm btn-danger" onclick="AdminDashboardService.openDeleteModal('${row.id}', '${row.first_name} ${row.last_name}')">
                            <i class="fas fa-trash-alt"></i>Remove
                        </button>
                    </td>`
                }
                }
            ], data, 10);
        });
    },

    getStudentById: function (id) {
        $.blockUI({ message: '<h3>Loading...</h3>' });

        RestClient.get("users/" + id, function (data) {
            localStorage.setItem('selected_student', JSON.stringify(data));

            // Populate EDIT modal
            $("#edit_student_id").val(data.id);
            $("#first_name").val(data.first_name);
            $("#last_name").val(data.last_name);
            $("#email").val(data.email);
            $("#faculty").val(data.faculty ? data.faculty : "");
            $("#room_number").text(data.room_id ? data.room_id : "No room assigned");
            $("#role").val(data.role);
            $("#active").val(data.is_active);

            $.unblockUI();
        }, function () {
            $.unblockUI();
            toastr.error("Cannot load student data");
        });
    },

    openAddModal: function () {
        $('#addStudentModal').modal("show");
    },

    openEditModal: function (id) {
        $('#updateStudentDetails').modal("show");
        AdminDashboardService.getStudentById(id);
    },

    openDeleteModal: function (id, name) {
        $("#deleteStudent").modal("show");
        $("#delete_student_id").val(id);
        $("#delete-student-body").html("Do you want to delete student: <b>" + name + "</b> ?");
    },

    updateStudent: function (student) {

        document.activeElement.blur();
        
        $.blockUI({ message: '<h3>Updating...</h3>' });

        RestClient.put(
            "users",
            JSON.stringify(student),
            function () {
                toastr.success("Student updated successfully");
                $.unblockUI();
                AdminDashboardService.closeModal();
                AdminDashboardService.getAllStudents();
            },
            function () {
                $.unblockUI();
                toastr.error("Cannot update student");
            }
        );
    },

    deleteStudent: function () {

        document.activeElement.blur();

        let id = $("#delete_student_id").val();

        RestClient.delete(
            "users/" + id,
            null,
            function (response) {
                toastr.success(response.message || "Deleted");
                AdminDashboardService.closeModal();
                AdminDashboardService.getAllStudents();
            },
            function (response) {
                toastr.error(response.responseJSON?.message || "Error deleting student");
                AdminDashboardService.closeModal();
            }
        );
    },

    closeModal: function () {
        $(".modal").modal("hide");
    },

    loadChartArea: async function() {
        let ctx;
        // Set new default font family and font color to mimic Bootstrap's default styling
        Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
        Chart.defaults.global.defaultFontColor = '#292b2c';

        RestClient.get("meals/per_day", function (data) {
            // Area Chart Example
            ctx = document.getElementById("myAreaChart");
            myLineChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: Object.keys(data),
                    datasets: [{
                        label: "Meals",
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
                        max: Math.max(...Object.values(data)),
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
            

        }, function () {
            toastr.error("Cannot load student meal statistics");
        });

    },

    loadBarChart: async function() {
        let ctx2;
        let myLineChart2;
        // Set new default font family and font color to mimic Bootstrap's default styling
        Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
        Chart.defaults.global.defaultFontColor = '#292b2c';

        RestClient.get("users/stats", function (data) {
            // Bar Chart Example
            ctx2 = document.getElementById("myBarChart");
            myLineChart2 = new Chart(ctx2, {
                type: 'bar',
                data: {
                labels: Object.keys(data),
                datasets: [{
                    label: "Students",
                    backgroundColor: "rgba(2,117,216,1)",
                    borderColor: "rgba(2,117,216,1)",
                    data: Object.values(data),
                }],
                },
                options: {
                scales: {
                    xAxes: [{
                    time: {
                        unit: 'month'
                    },
                    gridLines: {
                        display: false
                    },
                    ticks: {
                        maxTicksLimit: 6
                    }
                    }],
                    yAxes: [{
                    ticks: {
                        min: 0,
                        max: Math.max(...Object.values(data)),
                        maxTicksLimit: 5
                    },
                    gridLines: {
                        display: true
                    }
                    }],
                },
                legend: {
                    display: false
                }
                }
            });
        }, function () {
            toastr.error("Cannot load student meal statistics");
        });
    },
};