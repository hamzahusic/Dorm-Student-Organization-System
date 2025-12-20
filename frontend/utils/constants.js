let Constants = {
   PROJECT_BASE_URL: function() {
      if(location.hostname === "localhost") {
         return "http://localhost/Dorm-Student-Organization-System/backend/";
      } else {
         return "https://undidorms-backend-app-x2svq.ondigitalocean.app/";
      }
   },
   USER_ROLE: "student",
   ADMIN_ROLE: "admin"
}