let AdminService = {

    init: function () {
        console.log("INIT CALLED");
        // // Validate Add form
        // $("#addStudentForm").validate({
        //     submitHandler: function (form) {
        //         console.log("SUBMIT HANDLER FIRED");
        //         let student = Object.fromEntries(new FormData(form).entries());
        //         StudentService.addStudent(student);
        //         form.reset();
        //     }
        // });
        // console.log("INIT CALLED2");
        // // Validate Edit form
        // $("#editStudentForm").validate({
        //     submitHandler: function (form) {
        //         let student = Object.fromEntries(new FormData(form).entries());
        //         StudentService.updateStudent(student);
        //     }
        // });

        AdminService.getAllStudents();
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
                        return `<td style="display: flex; gap: 5px; align-items: center; justify-content: center;">
                    <!-- Button trigger modal -->
                    <button type="button" class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#updateBackdrop${row.id}">
                        <i class="fas fa-pen"></i> Edit
                    </button>

                    <!-- Modal For Updating Student Details -->
                    <div class="modal fade" id="updateBackdrop${row.id}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="updateLabel${row.id}" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="updateLabel${row.id}">Update Student Details</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="mb-3">
                                    <label for="firstName${row.id}" class="form-label">First name</label>
                                    <input type="text" class="form-control" id="firstName${row.id}" placeholder="John" value="${row.first_name}">
                                </div>
                                <div class="mb-3">
                                    <label for="lastName${row.id}" class="form-label">Last name</label>
                                    <input type="text" class="form-control" id="lastName${row.id}" placeholder="Doe" value="${row.last_name}">
                                </div>
                                <div class="mb-3">
                                    <label for="email${row.id}" class="form-label">Email</label>
                                    <input type="email" class="form-control" id="email${row.id}" placeholder="john.doe@example.com" value="${row.email}">
                                </div>
                                <div class="mb-3">
                                    <label for="faculty${row.id}" class="form-label">Faculty</label>
                                    <input type="text" class="form-control" id="faculty${row.id}" placeholder="MIT" value="${row.faculty}">
                                </div>
                                <div class="mb-3">
                                    <label for="roomNumber${row.id}" class="form-label">Room number</label>
                                    <p>${row.room_id}</p>
                                </div>
                                <div class="mb-3">
                                    <label for="role${row.id}">Role</label>
                                    <select class="form-select" id="role${row.id}">
                                        <option value="student" selected>Student</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <label for="active${row.id}">Active</label>
                                    <select class="form-select" id="active${row.id}">
                                        <option value="Active" ${row.active === 'Active' ? 'selected' : ''}>Active</option>
                                        <option value="Inactive" ${row.active === 'Inactive' ? 'selected' : ''}>Inactive</option>
                                    </select>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                <button type="button" class="btn btn-primary">Update</button>
                            </div>
                            </div>
                        </div>
                    </div> 

                    <!-- Button trigger modal -->
                    <button type="button" class="btn btn-sm btn-danger" data-bs-toggle="modal" data-bs-target="#deleteBackdrop${row.id}">
                        <i class="fas fa-trash-alt"></i>Remove
                    </button>


                    <!-- Modal For Deleting Student Details -->
                    <div class="modal fade" id="deleteBackdrop${row.id}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="deleteLabel${row.id}" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="deleteLabel${row.id}">Delete Student</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                Are you sure you want to delete <strong>${row.first_name} ${row.last_name}</strong>?
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                <button type="button" class="btn btn-danger">Delete</button>
                            </div>
                            </div>
                        </div>
                    </div> 
                </td>`
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