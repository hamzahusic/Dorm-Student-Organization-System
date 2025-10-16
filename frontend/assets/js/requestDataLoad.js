function requestsDataTableDemo() {
    const requestsDataTable = document.getElementById('requestsDataTable');
    const requestsTableBody = document.getElementById('requestsTableBody');

    // Mock data for requests
    const requests = [
        {
            id: 1,
            title: "Broken Window",
            description: "The window in my room is broken and cannot be closed properly. There's a crack on the bottom right corner and cold air is coming through. This needs urgent attention as it's getting very cold at night.",
            status: "Pending",
            createdAt: "2024-10-10",
            studentName: "Hamza Husić",
            roomNumber: 204
        },
        {
            id: 2,
            title: "Leaking Faucet",
            description: "The bathroom faucet has been leaking continuously for the past week. It's wasting a lot of water and the dripping sound is disturbing my sleep.",
            status: "In Progress",
            createdAt: "2024-10-08",
            studentName: "Amina Salkanović",
            roomNumber: 118
        },
        {
            id: 3,
            title: "WiFi Connection Issue",
            description: "Internet connection in my room is very slow and keeps disconnecting every few minutes. I cannot attend online classes properly.",
            status: "Resolved",
            createdAt: "2024-10-05",
            studentName: "Faruk Hadžić",
            roomNumber: 315
        },
        {
            id: 4,
            title: "Heating Not Working",
            description: "The radiator in my room is not working at all. With winter approaching, this is becoming a serious issue. The room temperature is uncomfortably cold.",
            status: "Pending",
            createdAt: "2024-10-12",
            studentName: "Lejla Avdić",
            roomNumber: 406
        },
        {
            id: 5,
            title: "Light Bulb Replacement",
            description: "Two light bulbs in the main room and one in the bathroom need to be replaced. It's very dark in the evening.",
            status: "In Progress",
            createdAt: "2024-10-09",
            studentName: "Emir Kovačević",
            roomNumber: 112
        },
        {
            id: 6,
            title: "Door Lock Malfunction",
            description: "The door lock is jammed and sometimes I cannot open or close the door properly. This is a security concern and needs immediate fixing.",
            status: "Pending",
            createdAt: "2024-10-11",
            studentName: "Lana Miličević",
            roomNumber: 302
        },
        {
            id: 7,
            title: "Mold in Bathroom",
            description: "There's visible mold growing on the bathroom ceiling and walls. This is a health hazard and needs professional cleaning and treatment.",
            status: "Resolved",
            createdAt: "2024-09-28",
            studentName: "Adnan Begić",
            roomNumber: 210
        },
        {
            id: 8,
            title: "Broken Desk Chair",
            description: "The desk chair in my room is broken. One of the wheels fell off and the back support is loose. I need a replacement chair to study properly.",
            status: "In Progress",
            createdAt: "2024-10-07",
            studentName: "Selma Omerović",
            roomNumber: 120
        },
        {
            id: 9,
            title: "AC Not Cooling",
            description: "The air conditioning unit is running but not cooling the room at all. It's just blowing warm air.",
            status: "Pending",
            createdAt: "2024-10-13",
            studentName: "Haris Mehmedović",
            roomNumber: 405
        },
        {
            id: 10,
            title: "Shower Drain Clogged",
            description: "The shower drain is completely clogged. Water is not draining at all and the bathroom floods when I take a shower.",
            status: "Pending",
            createdAt: "2024-10-12",
            studentName: "Amila Bešlagić",
            roomNumber: 221
        },
        {
            id: 11,
            title: "Closet Door Broken",
            description: "The closet door came off its hinges and I cannot use the closet properly. Need someone to fix or replace the hinges.",
            status: "Resolved",
            createdAt: "2024-10-01",
            studentName: "Tarik Selimović",
            roomNumber: 108
        },
        {
            id: 12,
            title: "Smoke Detector Beeping",
            description: "The smoke detector keeps beeping every few seconds. I think the battery needs to be replaced but I cannot reach it.",
            status: "In Progress",
            createdAt: "2024-10-10",
            studentName: "Maja Petrović",
            roomNumber: 312
        }
    ];

    // Helper function to truncate description
    function truncateDescription(text, maxLength = 50) {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    }

    // Helper function to get status badge class
    function getStatusBadgeClass(status) {
        switch (status) {
            case 'Pending':
                return 'bg-warning';
            case 'In Progress':
                return 'bg-info';
            case 'Resolved':
                return 'bg-success';
            default:
                return 'bg-secondary';
        }
    }

    // Helper function to format date
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    }

    // Update statistics
    function updateStatistics() {
        const pending = requests.filter(r => r.status === 'Pending').length;
        const inProgress = requests.filter(r => r.status === 'In Progress').length;
        const resolved = requests.filter(r => r.status === 'Resolved').length;
        
        document.getElementById('pendingCount').textContent = pending;
        document.getElementById('inProgressCount').textContent = inProgress;
        document.getElementById('resolvedCount').textContent = resolved;
        document.getElementById('totalCount').textContent = requests.length;
    }

    if (requestsTableBody) {
        requests.forEach(request => {
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td><strong>${request.title}</strong></td>
                <td>
                    <span class="description-short">${truncateDescription(request.description)}</span>
                </td>
                <td>${request.status}</td>
                <td>${formatDate(request.createdAt)}</td>
                <td>${request.studentName}</td>
                <td style="display: flex; gap: 5px; align-items: center; justify-content: center;">
                    <!-- Details Button -->
                    <button type="button" class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#detailsModal${request.id}">
                        <i class="fas fa-info-circle"></i> Details
                    </button>

                    <!-- Details Modal -->
                    <div class="modal fade" id="detailsModal${request.id}" tabindex="-1" aria-labelledby="detailsLabel${request.id}" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="detailsLabel${request.id}">Request Details</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <h6 class="fw-bold">Title:</h6>
                                    <p>${request.title}</p>
                                    
                                    <h6 class="fw-bold">Full Description:</h6>
                                    <p>${request.description}</p>
                                    
                                    <h6 class="fw-bold">Student:</h6>
                                    <p>${request.studentName} (Room ${request.roomNumber})</p>
                                    
                                    <h6 class="fw-bold">Submitted On:</h6>
                                    <p>${formatDate(request.createdAt)}</p>
                                    
                                    <hr>
                                    
                                    <div class="mb-3">
                                        <label for="statusSelect${request.id}" class="form-label fw-bold">Change Status:</label>
                                        <select class="form-select" id="statusSelect${request.id}">
                                            <option value="Pending" ${request.status === 'Pending' ? 'selected' : ''}>Pending</option>
                                            <option value="In Progress" ${request.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
                                            <option value="Resolved" ${request.status === 'Resolved' ? 'selected' : ''}>Resolved</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-primary">Update Status</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Delete Button -->
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
                                        <strong>Request:</strong> ${request.title}<br>
                                        <strong>Student:</strong> ${request.studentName}<br>
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
            requestsTableBody.appendChild(row);
        });

        // Update statistics
        updateStatistics();
    }

    // Initialize DataTable
    if (requestsDataTable) {
        new simpleDatatables.DataTable(requestsDataTable);
    }
}