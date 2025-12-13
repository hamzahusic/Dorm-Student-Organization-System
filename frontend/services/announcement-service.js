let AnnouncementService = {
    init: function () {
        AnnouncementService.getAllAnnouncements();
    },

    getAllAnnouncements: function () {
        RestClient.get("public/announcements", function (data) {
            $("#news-posts-container").empty()
            
            data.forEach(announcement => {
                $("#news-posts-container").append(
                    `
                    <div class="col-lg-4 col-md-6" style="cursor: pointer;" onclick="AnnouncementService.navigateToAnnouncement(${announcement.id})">
                        <article class="card h-100 border-0 shadow-sm">
                        <div class="position-relative overflow-hidden">
                            <img src="${announcement.thumbnail}" 
                                class="card-img-top" 
                                alt="${announcement.title}"
                                style="height: 240px; object-fit: cover;"
                                onerror="this.src='assets/img/blog/blog-post-2.webp'">
                        </div>
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title fw-bold mb-2">
                            <p class="text-decoration-none text-dark stretched-link">
                                ${announcement.title}
                            </p>
                            </h5>
                            <p class="card-text text-muted small mb-3">
                            ${announcement.content.length > 100 ? announcement.content.substring(0,100) + "..." : announcement.content}
                            </p>
                            <div class="mt-auto d-flex align-items-center text-muted small">
                            <i class="bi bi-calendar3 me-2"></i>
                            <time datetime="2025-01-01">${new Date(announcement.created_at).toLocaleString()}</time>
                            </div>
                        </div>
                        </article>
                    </div>
                    `
                )
            })

        });
    },

    navigateToAnnouncement: function (id){
        localStorage.removeItem('currentAnnouncementId')
        sessionStorage.setItem('currentAnnouncementId', id);
        window.location.replace('#announcements-details');
    },

    getAnnouncement: function () {
        const announcementId = sessionStorage.getItem('currentAnnouncementId');

        if(!announcementId){
            return window.location.replace('#announcements');
        }

        $.blockUI({ message: '<h3>Loading...</h3>' });

        RestClient.get("public/announcement/" + announcementId, function (data) {
            $("#publicAnnouncementTitle").text(data.title);
            $("#publicAnnouncementAuthor").text(data.name);
            $("#publicAnnouncementDate").text(new Date(data.created_at).toLocaleString());
            $("#publicAnnouncementThumbnail").attr('src', data.thumbnail);
            $("#publicAnnouncementContent").text(data.content);
            
            $.unblockUI();
        }, function () {
            $.unblockUI();
            toastr.error("Cannot load announcement");
            window.location.replace('#announcements');
        });
    },
};