let ProfileAdminSettingsService = {

    init: function () {
        $("#AdminSettingsForm").validate({
            submitHandler: function (form) {
                let userInfo = Object.fromEntries(new FormData(form).entries());
                userInfo.id = Utils.parseJwt(localStorage.getItem('user_token')).user.id;
                ProfileAdminSettingsService.updateUser(userInfo);
            }
        });

        let user = localStorage.getItem('user_token');
        user = Utils.parseJwt(user);

        $("#settings-sidenav-user-email").text(user.user ? user.user.email : "User not found");
        ProfileAdminSettingsService.getUserById(user.user.id);
    },

    getUserById: function (id) {
        $.blockUI({ message: '<h3>Loading...</h3>' });

        RestClient.get("users/" + id, function (data) {
            $("#adminFirstName").val(data.first_name);
            $("#adminLastName").val(data.last_name);
            $("#adminEmail").val(data.email);
            $("#adminFaculty").val(data.faculty);
            $("#adminYear").val(data.year);
            $("#adminPhone").val(data.phone);
            $("#adminJoinedAt").text(new Date(data.created_at).toLocaleDateString());


            $.unblockUI();
        }, function () {
            $.unblockUI();
            toastr.error("Cannot load user information");
        });
    },

    updateUser: function (student) {
        $.blockUI({ message: '<h3>Updating...</h3>' });

        RestClient.put(
            "users",
            JSON.stringify(student),
            function () {
                toastr.success("Profile information updated successfully");
                $.unblockUI();
            },
            function () {
                $.unblockUI();
                toastr.error("Cannot update profile information");
            }
        );
    },
};