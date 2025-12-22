let ProfileSettingsService = {

    init: function (user_type) {
        $(`#${user_type}SettingsForm`).validate({
            rules: {
                first_name: {
                    required: true,
                    minlength: 2,
                    maxlength: 50
                },
                last_name: {
                    required: true,
                    minlength: 2,
                    maxlength: 50
                },
                email: {
                    required: true,
                    email: true
                },
                faculty: {
                    required: true,
                    minlength: 2,
                    maxlength: 100
                },
                year: {
                    required: true,
                    minlength: 1,
                    maxlength: 1
                },
                phone: {
                    required: true,
                    minlength: 7,
                    maxlength: 20
                },
            },
            messages: {
                first_name: {
                    required: "Please enter a first name",
                    minlength: "First name must be at least 2 characters long",
                    maxlength: "First name cannot exceed 50 characters"
                },
                last_name: {
                    required: "Please enter a last name",
                    minlength: "Last name must be at least 2 characters long",
                    maxlength: "Last name cannot exceed 50 characters"
                },
                email: {
                    required: "Please enter an email address",
                    email: "Please enter a valid email address"
                },
                faculty: {
                    required: "Please select a faculty",
                    minlength: "Faculty must be at least 2 characters long",
                    maxlength: "Faculty cannot exceed 100 characters"
                },
                year: {
                    required: "Please select a year",
                    minlength: "Year must be at least 1 character long",
                    maxlength: "Year cannot exceed 1 character"
                },
                phone: {
                    required: "Please enter a phone number",
                    minlength: "Phone number must be at least 7 digits long",
                    maxlength: "Phone number cannot exceed 20 digits"
                },
            },
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

        let route = user_type === Constants.ADMIN_ROLE ? "users/" + id : "users";

        RestClient.get(route, function (data) {
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