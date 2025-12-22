let AdminAnnouncementService = {

    init: function () {
        $("#createAnnouncementForm").validate({
            rules: {
                title: {
                    required: true,
                    minlength: 5,
                    maxlength: 250
                },
                thumbnail: {
                    required: true,
                    minlength: 5,
                    maxlength: 500,
                    url: true
                },
                content: {
                    required: true,
                    minlength: 5,
                    maxlength: 5000
                }
            },
            messages: {
                title: {
                    required: "Please enter a title",
                    minlength: "Title must be at least 5 characters long",
                    maxlength: "Title cannot exceed 250 characters"
                },
                thumbnail: {
                    required: "Please enter a thumbnail",
                    minlength: "Thumbnail must be at least 5 characters long",
                    maxlength: "Thumbnail cannot exceed 500 characters"
                },
                content: {
                    required: "Please enter content",
                    minlength: "Content must be at least 5 characters long",
                    maxlength: "Content cannot exceed 5000 characters"
                }
            },
            submitHandler: function (form) {
                let announcement = Object.fromEntries(new FormData(form).entries());
                AdminAnnouncementService.createAnnouncement(announcement);
            }
        });

        $("#updateAnnouncementForm").validate({
            rules: {
                title: {
                    required: true,
                    minlength: 5,
                    maxlength: 250
                },
                thumbnail: {
                    required: true,
                    minlength: 5,
                    maxlength: 500,
                    url: true
                },
                content: {
                    required: true,
                    minlength: 5,
                    maxlength: 5000
                }
            },
            messages: {
                title: {
                    required: "Please enter a title",
                    minlength: "Title must be at least 5 characters long",
                    maxlength: "Title cannot exceed 250 characters"
                },
                thumbnail: {
                    required: "Please enter a thumbnail",
                    minlength: "Thumbnail must be at least 5 characters long",
                    maxlength: "Thumbnail cannot exceed 500 characters"
                },
                content: {
                    required: "Please enter content",
                    minlength: "Content must be at least 5 characters long",
                    maxlength: "Content cannot exceed 5000 characters"
                }
            },
            submitHandler: function (form) {
                let announcement = Object.fromEntries(new FormData(form).entries());
                AdminAnnouncementService.updateAnnouncement(announcement);
            }
        });
        
        let user = localStorage.getItem('user_token');
        user = Utils.parseJwt(user).user;

        $("#announcements-sidenav-user-email").text(user ? user.email : "User not found");
        AdminAnnouncementService.getAllAnnouncements();
    },

    getAllAnnouncements: function () {
        RestClient.get("public/announcements", function (data) {
            Utils.datatable("announcements-table", [
                { data: 'title', title: 'Title' },
                { 
                    data: 'content', 
                    title: 'Content',
                    width: '300px',
                    render: function (data, type, row) {
                        if (type === 'display' && data && data.length > 80) {
                            return '<div style="max-width: 300px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="' + data + '">' + data + '</div>';
                        }
                        return data;
                    }
                },
                { 
                    data: 'name', 
                    title: 'Created By',
                    render: function (data, type, row) {
                        return data || 'N/A';
                    }
                },
                { 
                    data: 'created_at', 
                    title: 'Created At',
                    width: '150px',
                    render: function (data, type, row) {
                        if (data) {
                            let date = new Date(data);
                            return date.toLocaleDateString('en-US', { 
                                year: 'numeric', 
                                month: 'short', 
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            });
                        }
                        return data;
                    }
                },
                {
                    title: "Actions",
                    render: function (data, type, row) {
                        return `
                            <td style="display: flex; gap: 5px; align-items: center; justify-content: center;">
                                <button type="button" class="btn btn-sm btn-primary" onclick="AdminAnnouncementService.openEditModal(${row.id})">
                                    <i class="fas fa-pen"></i> Edit
                                </button>
                                <button type="button" class="btn btn-sm btn-danger" onclick="AdminAnnouncementService.openDeleteModal(${row.id}, '${row.title.replace(/'/g, "\\'")}')">
                                    <i class="fas fa-trash-alt"></i> Remove
                                </button>
                            </td>
                        `;
                    }
                }
            ], data, 10);
        });
    },

    getAnnouncementById: function (id) {
        $.blockUI({ message: '<h3>Loading...</h3>' });

        RestClient.get("public/announcement/" + id, function (data) {
            // Populate EDIT modal
            $("#updateAnnouncementId").val(data.id);
            $("#updateTitle").val(data.title);
            $("#updateThumbnail").val(data.thumbnail);
            $("#updateContent").val(data.content);
            
            $.unblockUI();
        }, function () {
            $.unblockUI();
            toastr.error("Cannot load announcement data");
            AdminAnnouncementService.closeModal();
        });
    },

    openEditModal: function (id) {
        $('#updateAnnouncementModal').modal("show");
        AdminAnnouncementService.getAnnouncementById(id);
    },

    openDeleteModal: function (id, title) {
        $("#deleteAnnouncementModal").modal("show");
        $("#delete-announcement-head").text(title);
        $("#deleteAnnouncementId").val(id);
    },

    createAnnouncement: function (announcement) {
        document.activeElement.blur();
        
        $.blockUI({ message: '<h3>Creating...</h3>' });

        RestClient.post(
            "announcement",
            JSON.stringify(announcement),
            function () {
                toastr.success("Announcement created successfully");
                $.unblockUI();
                AdminAnnouncementService.closeModal();
                AdminAnnouncementService.getAllAnnouncements();
            },
            function (error) {
                $.unblockUI();
                toastr.error(error.responseJSON?.message || "Cannot create announcement");
            }
        );
    },

    updateAnnouncement: function (announcement) {
        document.activeElement.blur();
        
        $.blockUI({ message: '<h3>Updating...</h3>' });

        RestClient.put(
            "announcement",
            JSON.stringify(announcement),
            function () {
                toastr.success("Announcement updated successfully");
                $.unblockUI();
                AdminAnnouncementService.closeModal();
                AdminAnnouncementService.getAllAnnouncements();
            },
            function (error) {
                $.unblockUI();
                toastr.error(error.responseJSON?.message || "Cannot update announcement");
            }
        );
    },

    deleteAnnouncement: function () {
        document.activeElement.blur();

        let id = $("#deleteAnnouncementId").val();

        RestClient.delete(
            "announcement/" + id,
            null,
            function (response) {
                toastr.success(response.message || "Announcement deleted successfully");
                AdminAnnouncementService.closeModal();
                AdminAnnouncementService.getAllAnnouncements();
            },
            function (response) {
                toastr.error(response.responseJSON?.message || "Error deleting announcement");
                AdminAnnouncementService.closeModal();
            }
        );
    },

    closeModal: function () {
        $(".modal").modal("hide");
    },
};