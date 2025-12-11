let ProfileSettingsService = {

    init: function (user_type) {
        $(`#${user_type}SettingsForm`).validate({
            submitHandler: function (form) {
                let userInfo = Object.fromEntries(new FormData(form).entries());
                userInfo.id = Utils.parseJwt(localStorage.getItem('user_token')).user.id;
                ProfileSettingsService.updateUser(userInfo);
            }
        });

        let user = localStorage.getItem('user_token');
        user = Utils.parseJwt(user);

        $(`#${user_type}-settings-sidenav-user-email`).text(user.user ? user.user.email : "User not found");
        ProfileSettingsService.getUserById(user.user.id, user_type);
    },

    getUserById: function (id, user_type) {
        $.blockUI({ message: '<h3>Loading...</h3>' });

        RestClient.get("users/" + id, function (data) {
            $(`#${user_type}FirstName`).val(data.first_name);
            $(`#${user_type}LastName`).val(data.last_name);
            $(`#${user_type}Email`).val(data.email);
            $(`#${user_type}Faculty`).val(data.faculty);
            $(`#${user_type}Year`).val(data.year);
            $(`#${user_type}Phone`).val(data.phone);
            $(`#${user_type}JoinedAt`).text(new Date(data.created_at).toLocaleDateString());


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