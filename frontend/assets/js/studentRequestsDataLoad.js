function studentRequestsInit() {
    const studentRequestsTable = document.getElementById('studentRequestsTable');
    const studentRequestsTableBody = document.getElementById('studentRequestsTableBody');

    // Mock data for student's requests
    const studentRequests = [
        {
            id: 1,
            title: "Broken Window",
            description: "The window in my room is broken and cannot be closed properly. There's a crack on the bottom right corner and cold air is coming through.",
            status: "Pending",
            createdAt: "2024-10-10"
        },
        {
            id: 2,
            title: "WiFi Connection Issue",
            description: "Internet connection in my room is very slow and keeps disconnecting every few minutes. I cannot attend online classes properly.",
            status: "In Progress",
            createdAt: "2024-10-08"
        },
        {
            id: 3,
            title: "Light Bulb Replacement",
            description: "Two light bulbs in the main room and one in the bathroom need to be replaced. It's very dark in the evening.",
            status: "Resolved",
            createdAt: "2024-10-05"
        },
        {
            id: 4,
            title: "Heating Not Working",
            description: "The radiator in my room is not working at all. With winter approaching, this is becoming a serious issue.",
            status: "Pending",
            createdAt: "2024-10-12"
        }
    ];
    
    if (studentRequestsTableBody) {
        studentRequests.forEach(request => {
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td><strong>${request.title}</strong></td>
                <td>${request.description}</td>
                <td>${request.createdAt}</td>
                <td>${request.status}</td>
                <td>
                    <!-- Button trigger modal -->
                    <button type="button" class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#updateRequest${request.id}">
                        <i class="fas fa-pen"></i> Edit
                    </button>

                    <!-- Modal For Updating Request Details -->
                    <div class="modal fade" id="updateRequest${request.id}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="updateLabelReq${request.id}" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="updateLabelReq${request.id}">Update Student Details</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="mb-3">
                                    <label for="title${request.id}" class="form-label">Title</label>
                                    <input type="text" class="form-control" id="title${request.id}" placeholder="Title 123..." value="${request.title}">
                                </div>
                                <div class="mb-3">
                                    <label for="description${request.id}" class="form-label">Last name</label>
                                    <textarea type="text" class="form-control" rows="3" id="description${request.id}" placeholder="Mirror broken..." value="${request.description}"></textarea>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                <button type="button" class="btn btn-primary">Update</button>
                            </div>
                            </div>
                        </div>
                    </div> 

                    <button type="button" class="btn btn-sm btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal${request.id}">
                        <i class="fas fa-trash-alt"></i> Delete
                    </button>

                    <!-- Delete Modal -->
                    <div class="modal fade" id="deleteModal${request.id}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="deleteLabel${request.id}" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="deleteLabel${request.id}">Delete Request</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <p>Are you sure you want to delete this request?</p>
                                    <div class="alert alert-warning" role="alert">
                                        <strong>Title:</strong> ${request.title}<br>
                                        <strong>Status:</strong> ${request.status}
                                    </div>
                                    <p class="text-danger"><i class="fas fa-exclamation-triangle"></i> This action cannot be undone.</p>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                    <button type="button" class="btn btn-danger">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </td>
            `;
            studentRequestsTableBody.appendChild(row);
        });
    }

    // Initialize DataTable
    if (studentRequestsTable) {
        new simpleDatatables.DataTable(studentRequestsTable);
    }
}