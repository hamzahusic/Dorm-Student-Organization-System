var UserService = {
    init: function () {
        var token = localStorage.getItem("user_token");
        if (token && token !== undefined) {
            window.location.replace("#home");
        }
        $("#authLoginForm").validate({
            rules: {
                email: {
                    required: true,
                    email: true
                },
                password: {
                    required: true,
                    minlength: 8
                }
            },
            messages: {
                email: "Please enter a valid email address",
                password: "Minimum 8 characters"
            },
            submitHandler: function (form) {
                var entity = Object.fromEntries(new FormData(form).entries());
                UserService.login(entity);
            },
        });

        $("#authRegisterForm").validate({
            rules: {
                first_name: {
                    required: true,
                    minlength: 2
                },
                last_name: {
                    required: true,
                    minlength: 2
                },
                email: {
                    required: true,
                    email: true
                },
                password: {
                    required: true,
                    minlength: 8
                }
            },
            messages: {
                first_name: "Please enter your first name (Minimum 2 characters)",
                last_name: "Please enter your last name (Minimum 2 characters)",
                email: "Please enter a valid email address",
                password: "Minimum 8 characters"
            },
            submitHandler: function (form) {
                var entity = Object.fromEntries(new FormData(form).entries());
                UserService.register(entity);
            },
        });
    },

    login: function (entity) {
        $.ajax({
            url: Constants.PROJECT_BASE_URL() + "auth/login",
            type: "POST",
            data: JSON.stringify(entity),
            contentType: "application/json",
            dataType: "json",
            success: function (result) {
                localStorage.setItem("user_token", result.data.token);
                window.location.replace("#home");
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
            toastr.error(XMLHttpRequest?.responseText ?  XMLHttpRequest.responseText : 'Error');
            },
        });
    },

    register: function (entity) {
        $.ajax({
            url: Constants.PROJECT_BASE_URL() + "auth/register",
            type: "POST",
            data: JSON.stringify(entity),
            contentType: "application/json",
            dataType: "json",
            success: function (result) {
                toastr.success("Registration successful. Please login.");
                window.location.replace("#login");
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                toastr.error(XMLHttpRequest?.responseText ?  XMLHttpRequest.responseText : 'Error');
            },
        });
    },


    logout: function () {
        localStorage.clear();
        window.location.replace("#login");
    },
    
    generateMenuItems: function () {

        const navDesktop = document.getElementById("navmenu-desktop");
        const navMobile = document.getElementById("navmenu-mobile");
        navDesktop.innerHTML = ""; // clear old menu


        const token = localStorage.getItem("user_token");

        const currentView = window.location.hash;

        if (!token && (currentView === "#login" || currentView === "#register")) {
            return;
        }else if(!token){
            return window.location.replace("#login");
        }else if(token && (currentView === "#login" || currentView === "#register")){
            return window.location.replace("#home");
        }

        const user = Utils.parseJwt(token).user;

        // HOME (everyone sees)
        navDesktop.innerHTML += `
            <li><a href="#home">Home</a></li>
            <li><a href="#about"><span>About</span></a></li>
            <li><a href="#announcements">Announcements</a></li>
        `;

        if (user.role === Constants.ADMIN_ROLE) {
            // ADMIN MENU
            navDesktop.innerHTML += `
                <li><a href="#admin-dashboard">Admin Dashboard</a></li>
            `;
        }

        if (user.role === Constants.USER_ROLE) {
            // NORMAL USER MENU
            navDesktop.innerHTML += `
                <li><a href="#student-dashboard">Student Dashboard</a></li>
            `;
        }

        navDesktop.innerHTML += `
            <li class="nav-item mx-0 mx-lg-1">
                <button class="btn btn-danger ms-3" onclick="UserService.logout()">Logout</button>
            </li>
        `;

        navMobile.innerHTML = navDesktop.innerHTML;
    },

    checkAuth: function () {
        const token = localStorage.getItem("user_token");
        if (token && token !== undefined) {
            try{
                const user = Utils.parseJwt(token).user;
                const currentView = window.location.hash;

                if(currentView.startsWith("#student") && user.role !== Constants.USER_ROLE){
                    window.location.replace("#home");
                }else if(currentView.startsWith("#admin") && user.role !== Constants.ADMIN_ROLE){
                    window.location.replace("#home");
                }

            }catch{
                window.location.replace("#login");
            }
        }
    }

};