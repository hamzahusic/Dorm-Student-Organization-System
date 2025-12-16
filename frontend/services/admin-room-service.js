let AdminRoomService = {

    init: function () {
        $("#addRoomForm").validate({
            rules: {
                id: {
                    required: true,
                },
                capacity: {
                    required: true,
                },
                floor: {
                    required: true,
                },
            },
            messages: {
                id: {
                    required: "Please enter a room number",
                },
                capacity: {
                    required: "Please enter a capacity",
                },
                floor: {
                    required: "Please enter a floor number",
                },
            },
            submitHandler: function (form) {
                let room = Object.fromEntries(new FormData(form).entries());
                AdminRoomService.addRoom(room);
            }
        });

        $("#updateRoomForm").validate({
            rules: {
                original_id: {
                    required: true,
                },
                id: {
                    required: true,
                },
                capacity: {
                    required: true,
                },
                floor: {
                    required: true,
                },
                students_ids: {
                    required: false,
                },
            },
            messages: {
                original_id: {
                    required: "Original room ID is missing",
                },
                id: {
                    required: "Please enter a room number",
                },
                capacity: {
                    required: "Please enter a capacity",
                },
                floor: {
                    required: "Please enter a floor number",
                },
            },
            submitHandler: function (form) {
                let formData = new FormData(form);
                let data = Object.fromEntries(formData.entries());
                
                let selectedStudents = formData.getAll('students_ids'); 
                data.students_ids = selectedStudents;

                AdminRoomService.updateRoom(data);
            }
        });
        
        let user = localStorage.getItem('user_token');
        user = Utils.parseJwt(user).user;

        $("#room-sidenav-user-email").text(user ? user.email : "User not found");
        AdminRoomService.getAllRooms();
    },

    getAllRooms: function () {
        RestClient.get("rooms", function (data) {
            Utils.datatable("rooms-table", [
                { data: 'room_number', title: 'Room Number' },
                { data: 'capacity', title: 'Capacity' },
                { data: 'floor_number', title: 'Floor' },
                { data: 'student_count', title: 'Number of students' },
                { title: 'Assigned Students',
                    render: function (data, type, row) {
                        if (row.assigned_students && row.assigned_students.length > 0) {
                            return row.assigned_students;
                        } else {
                            return "No students assigned";
                        }
                    }
                },
                {
                    title: "Actions",
                    render: function (data, type, row) {
                        return `
                    <td style="display: flex; gap: 5px; align-items: center; justify-content: center;">
                        <!-- Button trigger modal -->
                        <button type="button" class="btn btn-sm btn-primary" onclick="AdminRoomService.openEditModal('${row.room_number}')">
                            <i class="fas fa-pen"></i> Edit
                        </button>

                        <!-- Button trigger modal -->
                        <button type="button" class="btn btn-sm btn-danger" onclick="AdminRoomService.openDeleteModal('${row.room_number}', 'Room ${row.room_number}')">
                            <i class="fas fa-trash-alt"></i>Remove
                        </button>
                    </td>`
                }
                }
            ], data, 10);
        });
    },

    getRoomById: function (id) {
        $.blockUI({ message: '<h3>Loading...</h3>' });

        RestClient.get("room/info/" + id, function (data) {
            // Populate EDIT modal
            $("#roomNumber").val(data.id);
            $("#roomCapacity").val(data.capacity);
            $("#floorNumber").val(data.floor);
            $("#originalRoomId").val(data.id);

            $('#assignedRoomStudents').empty();
            RestClient.get("users", function (users) {
                users.forEach(user => {
                    $('#assignedRoomStudents').append(
                        `<option value="${user.id}">${user.first_name} ${user.last_name}</option>`
                    );
                });
                $('#assignedRoomStudents').val(data.students.map(s => s.student_id));
            });


            $.unblockUI();
        }, function () {
            $.unblockUI();
            toastr.error("Cannot load room data");
            AdminRoomService.closeModal();
        });
    },

    openEditModal: function (id) {
        $('#updateRoomModal').modal("show");
        AdminRoomService.getRoomById(id);
    },

    openDeleteModal: function (id, name) {
        $("#deleteRoomModal").modal("show");
        $("#delete-room-head").text(name);
        $("#deleteRoomId").val(id);
        $("#delete-room-body").empty();

        RestClient.get("room/info/" + id, function (data) {
            data.students?.length > 0 ? 
            $("#delete-room-body").append(
                `<div class="alert alert-warning" role="alert">
                    <i class="fas fa-exclamation-triangle"></i> 
                    This room has ${data.students.length} student(s) assigned (${data.students.map((s) => s.name)}). Deleting this room will unassign them.
                </div>`
            ) : "";
        });

    },

    addRoom: function (student) {

        document.activeElement.blur();
        
        $.blockUI({ message: '<h3>Adding...</h3>' });

        RestClient.post(
            "room",
            JSON.stringify(student),
            function () {
                toastr.success("Room added successfully");
                $.unblockUI();
                AdminRoomService.closeModal();
                AdminRoomService.getAllRooms();
            },
            function () {
                $.unblockUI();
                toastr.error("Cannot add room");
            }
        );
    },

    updateRoom: function (student) {

        document.activeElement.blur();
        
        $.blockUI({ message: '<h3>Updating...</h3>' });

        RestClient.put(
            "room",
            JSON.stringify(student),
            function () {
                toastr.success("Room updated successfully");
                $.unblockUI();
                AdminRoomService.closeModal();
                AdminRoomService.getAllRooms();
            },
            function () {
                $.unblockUI();
                toastr.error("Cannot update room");
            }
        );
    },

    deleteRoom: function () {

        document.activeElement.blur();

        let id = $("#deleteRoomId").val();

        RestClient.delete(
            "room/" + id,
            null,
            function (response) {
                toastr.success(response.message || "Deleted room successfully");
                AdminRoomService.closeModal();
                AdminRoomService.getAllRooms();
            },
            function (response) {
                toastr.error(response.responseJSON?.message || "Error deleting room");
                AdminRoomService.closeModal();
            }
        );
    },

    closeModal: function () {
        $(".modal").modal("hide");
    },
};