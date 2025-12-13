let StudentRequestService = {

    init: function () {
        $("#requestForm").validate({
            submitHandler: function (form) {
                let data = Object.fromEntries(new FormData(form).entries());
                StudentRequestService.createRequest(data, form);
            }
        });

        $("#studentUpdateRequestForm").validate({
            submitHandler: function (form) {
                let data = Object.fromEntries(new FormData(form).entries());
                StudentRequestService.updateRequest(data);
            }
        });
        
        let user = localStorage.getItem('user_token');
        user = Utils.parseJwt(user).user;

        $("#student-requests-sidenav-user-email").text(user ? user.email : "User not found");
        StudentRequestService.getAllRequests();
    },

    getAllRequests: function () {
        RestClient.get("requests", function (data) {
            Utils.datatable("students-requests-table", [
                { data: 'title', title: 'Title' },
                { 
                    data: 'description', 
                    title: 'Description',
                    width: '250px',
                    render: function (data, type, row) {
                        if (type === 'display' && data && data.length > 60) {
                            return '<div style="max-width: 250px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="' + data + '">' + data + '</div>';
                        }
                        return data;
                    }
                },
                { data: 'status', title: 'Status', 
                    render: function (data, type, row) {
                        let statusText = data.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
                        return statusText;
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
                                day: 'numeric'
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
                                <button type="button" class="btn btn-sm btn-primary" onclick="StudentRequestService.openEditModal(${row.id})" title="Edit Request">
                                    <i class="fas fa-edit"></i> Edit
                                </button>
                                <button type="button" class="btn btn-sm btn-danger" onclick="StudentRequestService.openDeleteModal(${row.id}, '${row.title}')">
                                    <i class="fas fa-trash-alt"></i> Delete
                                </button>
                            </td>
                        `;
                    }
                }
            ], data, 10);
        });
    },

    getRequestById: function (id) {
        $.blockUI({ message: '<h3>Loading...</h3>' });

        RestClient.get("request/info/" + id, function (data) {
            $.unblockUI();
            $("#studentRequestId").val(data.id);
            $("#studentUpdateRequestTitle").val(data.title);
            $("#studentUpdateRequestDescription").val(data.description);
        }, function () {
            $.unblockUI();
            toastr.error("Cannot load request data");
            StudentRequestService.closeModal();
        });
    },

    openEditModal: function (id) {
        $('#studentUpdateRequest').modal("show");
        StudentRequestService.getRequestById(id);
    },

    openDeleteModal: function (id, title) {
        $("#studentRequestDeleteModal").modal("show");
        $("#studentRequestDeleteId").val(id);
        $("#studentDeleteRequestTitle").text(title);
    },

    createRequest: function (request, form){
        $.blockUI({ message: '<h3>Submitting...</h3>' });

        RestClient.post(
            "request",
            JSON.stringify(request),
            function (response) {
                toastr.success("Request submitted successfully");
                $.unblockUI();
                form.reset();
                StudentRequestService.getAllRequests();
            },
            function (error) {
                $.unblockUI();
                toastr.error("Failed to submit request");
            }
        );
    },

    updateRequest: function (data) {
        document.activeElement.blur();
        
        $.blockUI({ message: '<h3>Updating...</h3>' });

        RestClient.put(
            "request",
            JSON.stringify(data),
            function () {
                $.unblockUI();
                StudentRequestService.closeModal();
                toastr.success("Request updated successfully");
                StudentRequestService.getAllRequests();
            },
            function (error) {
                $.unblockUI();
                toastr.error("Cannot update request status");
            }
        );
    },

    deleteRequest: function () {
        document.activeElement.blur();

        let id = $("#studentRequestDeleteId").val();

        RestClient.delete(
            "request/" + id,
            null,
            function (response) {
                toastr.success("Request deleted successfully");
                StudentRequestService.closeModal();
                StudentRequestService.getAllRequests();
            },
            function (error) {
                console.log(error)
                toastr.error("Error deleting request");
                StudentRequestService.closeModal();
            }
        );
    },

    closeModal: function () {
        $(".modal").modal("hide");
    },
};