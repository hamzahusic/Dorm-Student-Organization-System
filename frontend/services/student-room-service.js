let StudentRoomService = {

    init: function () {
        let user = localStorage.getItem('user_token');
        user = Utils.parseJwt(user).user;

        $(`#student-room-sidenav-user-email`).text(user ? user.email : "User not found");
        StudentRoomService.getRoomInfo(user.room_id, user.id);
    },

    getRoomInfo: function (id, user_id) {
        $.blockUI({ message: '<h3>Loading...</h3>' });
        $(`#noRoomAssignedMain`).hide();

        // Clear previous data
        $("#studentRoomNumber").text("0");
        $(`#studentRoomFloor`).text("0");
        $(`#studentRoomCapacity`).text("0");
        $(`#studentCurrentOccupancy`).text("0 / 0");
        $(`#studentBedsAvailable`).text("0 Bed");
        $("#roommatesList").html(
            `<div class="alert alert-warning" role="alert">
                <i class="fas fa-user-slash"></i> You currently have no roommates assigned.
            </div>`
        )

        RestClient.get('room/info/' + id, function (data) {
            $(`#studentRoomNumber`).text(data.id);
            $(`#studentRoomFloor`).text(data.floor);
            $(`#studentRoomCapacity`).text(data.capacity);
            $(`#studentCurrentOccupancy`).text(`${data.students.length} / ${data.capacity}`);
            $(`#studentBedsAvailable`).text(`${data.capacity - data.students.length} Bed`);
            
            let students = data.students.filter((student) => student.student_id != user_id)
            if(students.length === 0){
                $("#roommatesList").html(
                    `<div class="alert alert-warning" role="alert">
                        <i class="fas fa-user-slash"></i> You currently have no roommates assigned.
                    </div>`
                )
            }else{
                $("#roommatesList").empty()
            }

            students.forEach(student => {
                $("#roommatesList").append(
                `
                    <div class="card mb-3 border-success">
                        <div class="card-body">
                            <div class="d-flex align-items-center mb-2">
                                <div class="rounded-circle bg-success text-white d-flex align-items-center justify-content-center me-3" style="width: 50px; height: 50px;">
                                    <i class="fas fa-user fa-lg"></i>
                                </div>
                                <div>
                                    <h5 class="mb-0">${student.name}</h5>
                                    <small class="text-muted">${student.faculty}</small>
                                </div>
                            </div>
                            <hr>
                            <div class="row">
                                <div class="col-md-6">
                                    <p class="mb-1"><i class="fas fa-envelope text-primary me-2"></i><small>${student.email}</small></p>
                                    <p class="mb-1"><i class="fas fa-phone text-primary me-2"></i><small>${student.phone}</small></p>
                                </div>
                                <div class="col-md-6">
                                    <p class="mb-1"><i class="fas fa-graduation-cap text-primary me-2"></i><small>${student.year} Year</small></p>
                                </div>
                            </div>
                        </div>
                    </div>
                `
                )
            })

            $.unblockUI();
        }, function () {
            $.unblockUI();
            toastr.error("Cannot load room information");
            $(`#noRoomAssignedMain`).show();
        });
    },
};