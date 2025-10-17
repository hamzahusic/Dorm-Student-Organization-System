var app=$.spapp({
    defaultView:"#home",
    templateDir:"./pages/"
})

app.route({
view : "home",
load : "home.html",
onCreate: function() { 
    bindMobileNavToggle()
},
});

app.route({
view : "about",
load : "about.html",
onCreate: function() { 
    bindMobileNavToggle()
    },
});

app.route({
view : "announcements",
load : "announcements.html",
onCreate: function() { 
    bindMobileNavToggle()
    },
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
        sideBarToggleScript()
        datatablesSimpleDemo()
        loadChartArea()
        loadBarChart()
        },
});

app.route({
    view : "admin-rooms",
    load : "admin-rooms.html",
    onCreate: function() { 
        sideBarToggleScript()
        roomsDataTableDemo()
        },
});

app.route({
    view : "admin-requests",
    load : "admin-requests.html",
    onCreate: function() { 
        sideBarToggleScript()
        requestsDataTableDemo()
        },
});

app.route({
    view : "admin-meals",
    load : "admin-meals.html",
    onCreate: function() { 
        sideBarToggleScript()
        mealsDataTableDemo()
        },
});

app.route({
    view : "admin-announcements",
    load : "admin-announcements.html",
    onCreate: function() { 
        sideBarToggleScript()
        announcementsAdminDataTableDemo()
        },
});

app.route({
    view : "admin-settings",
    load : "admin-settings.html",
    onCreate: function() { 
        sideBarToggleScript()
        loadSettings()
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
        },
});

app.route({
    view : "student-room",
    load : "student-room.html",
    onCreate: function() { 
        sideBarToggleScript()
        studentRoomInit()
        },
});

app.route({
    view : "student-settings",
    load : "student-settings.html",
    onCreate: function() { 
        sideBarToggleScript()
        loadStudentSettings()
        },
});

app.route({
    view : "student-meals",
    load : "student-meals.html",
    onCreate: function() { 
        sideBarToggleScript()
        studentMealsInit()
        },
});

app.route({
    view : "student-requests",
    load : "student-requests.html",
    onCreate: function() { 
        sideBarToggleScript()
        studentRequestsInit()
        },
});

app.run();