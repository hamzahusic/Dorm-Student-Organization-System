let AdminRequestService = {

    init: function () {
        $("#updateStatusForm").validate({
            submitHandler: function (form) {
                let data = Object.fromEntries(new FormData(form).entries());
                AdminRequestService.updateRequestStatus(data);
            }
        });
        
        let user = localStorage.getItem('user_token');
        user = Utils.parseJwt(user).user;

        $("#requests-sidenav-user-email").text(user ? user.email : "User not found");
        AdminRequestService.getAllRequests();
    },

    getAllRequests: function () {
        RestClient.get("requests", function (data) {
            let pending = data.filter(r => r.status === 'pending').length;
            let inProgress = data.filter(r => r.status === 'in_progress').length;
            let resolved = data.filter(r => r.status === 'resolved').length;
            let total = data.length;

            $("#pendingCount").text(pending);
            $("#inProgressCount").text(inProgress);
            $("#resolvedCount").text(resolved);
            $("#totalCount").text(total);

            Utils.datatable("requests-table", [
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
                    data: 'name', 
                    title: 'Student',
                    render: function (data, type, row) {
                        return data || 'N/A';
                    }
                },
                {
                    title: "Actions",
                    render: function (data, type, row) {
                        return `
                            <td style="display: flex; gap: 5px; align-items: center; justify-content: center;">
                                <button type="button" class="btn btn-sm btn-primary" onclick="AdminRequestService.openStatusModal(${row.id})" title="Update Status">
                                    <i class="fas fa-edit"></i> Status
                                </button>
                                <button type="button" class="btn btn-sm btn-danger" onclick="AdminRequestService.openDeleteModal(${row.id}, '${row.title.replace(/'/g, "\\'")}')">
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
            $("#updateRequestId").val(data.id);
            $("#updateRequestTitle").text(data.title);
            $("#updateRequestDescription").text(data.description);
            $("#updateRequestStudent").text(`${data.name} (Room ${data.room_number})` || 'N/A');
            $("#updateRequestDate").text(data.created_at);
            $("#updateRequestStatus").val(data.status);
        }, function () {
            $.unblockUI();
            toastr.error("Cannot load request data");
            AdminRequestService.closeModal();
        });
    },

    openStatusModal: function (id) {
        $('#updateStatusModal').modal("show");
        AdminRequestService.getRequestById(id);
    },

    openDeleteModal: function (id, title) {
        $("#deleteRequestModal").modal("show");
        $("#delete-request-head").text(title);
        $("#deleteRequestId").val(id);
    },

    updateRequestStatus: function (data) {
        document.activeElement.blur();
        
        $.blockUI({ message: '<h3>Updating...</h3>' });

        RestClient.put(
            "request",
            JSON.stringify(data),
            function () {
                toastr.success("Request status updated successfully");
                $.unblockUI();
                AdminRequestService.closeModal();
                AdminRequestService.getAllRequests();
            },
            function (error) {
                $.unblockUI();
                toastr.error(error.responseJSON?.message || "Cannot update request status");
            }
        );
    },

    deleteRequest: function () {
        document.activeElement.blur();

        let id = $("#deleteRequestId").val();

        RestClient.delete(
            "request/" + id,
            null,
            function (response) {
                toastr.success(response.message || "Request deleted successfully");
                AdminRequestService.closeModal();
                AdminRequestService.getAllRequests();
            },
            function (response) {
                toastr.error(response.responseJSON?.message || "Error deleting request");
                AdminRequestService.closeModal();
            }
        );
    },

    closeModal: function () {
        $(".modal").modal("hide");
    },
};