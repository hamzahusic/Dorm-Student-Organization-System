let StudentService = {

    init: function () {
        console.log("INIT CALLED");
        // Validate Add form
        $("#addStudentForm").validate({
            submitHandler: function (form) {
                console.log("SUBMIT HANDLER FIRED");
                let student = Object.fromEntries(new FormData(form).entries());
                StudentService.addStudent(student);
                form.reset();
            }
        });
        console.log("INIT CALLED2");
        // Validate Edit form
        $("#editStudentForm").validate({
            submitHandler: function (form) {
                let student = Object.fromEntries(new FormData(form).entries());
                StudentService.updateStudent(student);
            }
        });

        StudentService.getAllStudents();
    },

    addStudent: function (student) {
        $.blockUI({ message: '<h3>Processing...</h3>' });

        // MUST send JSON
        RestClient.post(
            "student",
            JSON.stringify(student),
            function (response) {
                toastr.success("Student added successfully");
                $.unblockUI();
                StudentService.getAllStudents();
                console.log("validate plugin exists?", typeof $("#addStudentForm").validate);
                StudentService.closeModal();
            },
            function (response) {
                $.unblockUI();
                toastr.error(response.responseJSON?.message || "Error adding student");
            }
        );
    },

    getAllStudents: function () {
        RestClient.get("student", function (data) {
            Utils.datatable("students-table", [
                { data: 'name', title: 'Name' },
                { data: 'email', title: 'Email' },
                {
                    title: "Actions",
                    render: function (data, type, row) {
                        return `
                        <div class="d-flex justify-content-center gap-2 mt-3">
                            <button class="btn btn-primary" onclick="StudentService.openEditModal('${row.id}')">Edit</button>
                            <button class="btn btn-danger" onclick="StudentService.openDeleteModal('${row.id}', '${row.name}')">Delete</button>
                            <button class="btn btn-secondary" onclick="StudentService.openViewMore('${row.id}')">View</button>
                        </div>`;
                    }
                }
            ], data, 10);
        });
    },

    getStudentById: function (id) {
        $.blockUI({ message: '<h3>Loading...</h3>' });

        RestClient.get("student/" + id, function (data) {
            localStorage.setItem('selected_student', JSON.stringify(data));

            // Populate EDIT modal
            $("#edit_student_id").val(data.id);
            $("#edit_name").val(data.name);
            $("#edit_email").val(data.email);

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
        $('#editStudentModal').modal("show");
        StudentService.getStudentById(id);
    },

    openViewMore: function (id) {
        window.location.replace("#view_more");
        StudentService.getStudentById(id);
        StudentService.populateViewMore();
    },

    openDeleteModal: function (id, name) {
        $("#deleteStudentModal").modal("show");
        $("#delete_student_id").val(id);
        $("#delete-student-body").html("Do you want to delete student: <b>" + name + "</b> ?");
    },

    updateStudent: function (student) {
        $.blockUI({ message: '<h3>Updating...</h3>' });

        RestClient.put(
            "student/" + student.id,
            JSON.stringify(student),
            function () {
                toastr.success("Student updated successfully");
                $.unblockUI();
                StudentService.closeModal();
                StudentService.getAllStudents();
            },
            function () {
                $.unblockUI();
                toastr.error("Cannot update student");
            }
        );
    },

    deleteStudent: function () {
        let id = $("#delete_student_id").val();

        RestClient.delete(
            "student/" + id,
            null,
            function (response) {
                toastr.success(response.message || "Deleted");
                StudentService.closeModal();
                StudentService.getAllStudents();
            },
            function (response) {
                toastr.error(response.responseJSON?.message || "Error deleting student");
                StudentService.closeModal();
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