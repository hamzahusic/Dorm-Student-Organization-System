function studentRequestsInit() {
    const studentRequestsTable = document.getElementById('studentRequestsTable');
    const studentRequestsTableBody = document.getElementById('studentRequestsTableBody');
    const requestForm = document.getElementById('requestForm');
    const requestDescription = document.getElementById('requestDescription');
    const charCount = document.getElementById('charCount');

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

    // Character counter for description
    if (requestDescription && charCount) {
        requestDescription.addEventListener('input', function() {
            charCount.textContent = this.value.length;
        });
    }

    // Handle form submission
    if (requestForm) {
        requestForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const title = document.getElementById('requestTitle').value;
            const description = document.getElementById('requestDescription').value;

            if (!title || !description) {
                alert('Please fill in all fields');
                return;
            }

            // In real app, this would send to server
            console.log('New request submitted:', { title, description });
            alert('Request submitted successfully!');
            
            // Reset form
            requestForm.reset();
            charCount.textContent = '0';
        });
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

    // Render requests table
    if (studentRequestsTableBody) {
        studentRequests.forEach(request => {
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td><strong>${request.title}</strong></td>
                <td>${request.description}</td>
                <td>${formatDate(request.createdAt)}</td>
                <td>${request.status}</td>
                <td>
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