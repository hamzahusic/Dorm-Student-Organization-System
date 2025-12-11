var app=$.spapp({
    defaultView:"#home",
    templateDir:"./pages/"
})

$(window).on('hashchange', function() {
    
    if(window.location.hash.startsWith("#admin") || window.location.hash.startsWith("#student")){
        Utils.removeHeader();
    }else{
        Utils.addHeader();
    }
    
    UserService.generateMenuItems();
    UserService.checkAuth();
});

app.route({
view : "home",
load : "home.html",
    onCreate: function() { 
        bindMobileNavToggle()
    }
});

app.route({
view : "about",
load : "about.html",
    onCreate: function() { 
        bindMobileNavToggle()
    }
});

app.route({
view : "announcements",
load : "announcements.html",
    onCreate: function() { 
        bindMobileNavToggle()
    }
});

app.route({
view : "announcements-details",
load : "announcements-details.html",
    onCreate: function() { 
        bindMobileNavToggle()
    },
});

app.route({
view : "login",
load : "login.html",
    onCreate: function() { 
        bindMobileNavToggle()
    },
    onReady: function() {
        $('#authLoginEmail').focus();
        UserService.init();
    }
});

app.route({
view : "register",
load : "register.html",
    onCreate: function() { 
        bindMobileNavToggle()
    },
});

// Admin Dashboard Routes
app.route({
view : "admin-dashboard",
load : "admin-dashboard.html",
    onCreate: function() { 
        Utils.removeHeader()
        sideBarToggleScript()
    },
    onReady: function() {
        AdminDashboardService.init();
    }
});

app.route({
    view : "admin-rooms",
    load : "admin-rooms.html",
    onCreate: function() { 
        sideBarToggleScript()
        Utils.removeHeader()
     },
    onReady: function() {
        AdminRoomService.init();
    }
});

app.route({
    view : "admin-requests",
    load : "admin-requests.html",
    onCreate: function() { 
        sideBarToggleScript()
        requestsDataTableDemo()

        Utils.removeHeader()
    },

});

app.route({
    view : "admin-meals",
    load : "admin-meals.html",
    onCreate: function() { 
        sideBarToggleScript()
        mealsDataTableDemo()
        Utils.removeHeader()
    },

});

app.route({
    view : "admin-announcements",
    load : "admin-announcements.html",
    onCreate: function() { 
        sideBarToggleScript()
        announcementsAdminDataTableDemo()
        Utils.removeHeader()
    },
});

app.route({
    view : "admin-settings",
    load : "admin-settings.html",
    onCreate: function() { 
        sideBarToggleScript()
        loadSettings()
        Utils.removeHeader()
    },
});

// Student Dashboard Routes

app.route({
    view : "student-dashboard",
    load : "student-dashboard.html",
    onCreate: function() { 
        sideBarToggleScript()
        studentDashboardInit()
        loadStudentMealsChart()
        Utils.removeHeader()
    },
});

app.route({
    view : "student-room",
    load : "student-room.html",
    onCreate: function() { 
        sideBarToggleScript()
        studentRoomInit()
        Utils.removeHeader()
    },
});

app.route({
    view : "student-settings",
    load : "student-settings.html",
    onCreate: function() { 
        sideBarToggleScript()
        loadStudentSettings()
        Utils.removeHeader()
    },
});

app.route({
    view : "student-meals",
    load : "student-meals.html",
    onCreate: function() { 
        sideBarToggleScript()
        studentMealsInit()
        Utils.removeHeader()
    },
});

app.route({
    view : "student-requests",
    load : "student-requests.html",
    onCreate: function() { 
        sideBarToggleScript()
        studentRequestsInit()
        Utils.removeHeader()
    },
});

UserService.generateMenuItems();

app.run();