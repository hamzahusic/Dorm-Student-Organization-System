let AdminService = {

    init: function () {
        console.log("INIT CALLED");

        $("#editStudentForm").validate({
            submitHandler: function (form) {
                let student = Object.fromEntries(new FormData(form).entries());
                AdminService.updateStudent(student);
            }
        });

        AdminService.getAllStudents();
    },

    getAllStudents: function () {
        RestClient.get("users", function (data) {
            Utils.datatable("students-table", [
                { data: 'id', title: 'Name' },
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
                        <button type="button" class="btn btn-sm btn-primary" onclick="AdminService.openEditModal('${row.id}')">
                            <i class="fas fa-pen"></i> Edit
                        </button>

                        <!-- Button trigger modal -->
                        <button type="button" class="btn btn-sm btn-danger" onclick="AdminService.openDeleteModal('${row.id}', '${row.first_name} ${row.last_name}')">
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
        AdminService.getStudentById(id);
    },

    openViewMore: function (id) {
        window.location.replace("#view_more");
        StudentService.getStudentById(id);
        StudentService.populateViewMore();
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
                AdminService.closeModal();
                AdminService.getAllStudents();
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
                AdminService.closeModal();
                AdminService.getAllStudents();
            },
            function (response) {
                toastr.error(response.responseJSON?.message || "Error deleting student");
                AdminService.closeModal();
            }
        );
    },

    populateViewMore: function () {
        let s = JSON.parse(localStorage.getItem("selected_student"));
        $("#student-name").text(s.name);
        $("#student-email").text(s.email);
    },

    closeModal: function () {
        $(".modal").modal("hide");
    }
};