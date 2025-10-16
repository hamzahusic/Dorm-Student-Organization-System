function roomsDataTableDemo() {
    const roomsDataTable = document.getElementById('roomsDataTable');
    const roomsTableBody = document.getElementById('roomsTableBody');

    // Available students for assignment
    const availableStudents = [
        { id: 1, name: "Hamza Husić" },
        { id: 2, name: "Amina Salkanović" },
        { id: 3, name: "Faruk Hadžić" },
        { id: 4, name: "Lejla Avdić" },
        { id: 5, name: "Emir Kovačević" },
        { id: 6, name: "Lana Miličević" },
        { id: 7, name: "Adnan Begić" },
        { id: 8, name: "Selma Omerović" },
        { id: 9, name: "Haris Mehmedović" },
        { id: 10, name: "Amila Bešlagić" },
        { id: 11, name: "Tarik Selimović" },
        { id: 12, name: "Maja Petrović" },
        { id: 13, name: "Ismail Mujić" },
        { id: 14, name: "Nina Kadić" },
        { id: 15, name: "Armin Lukić" }
    ];

    // Mock data for rooms
    const rooms = [
        {
            id: 1,
            roomNumber: 101,
            capacity: 2,
            floorNumber: 1,
            assignedStudents: [1, 2]
        },
        {
            id: 2,
            roomNumber: 102,
            capacity: 3,
            floorNumber: 1,
            assignedStudents: [3, 4, 5]
        },
        {
            id: 3,
            roomNumber: 103,
            capacity: 2,
            floorNumber: 1,
            assignedStudents: [6]
        },
        {
            id: 4,
            roomNumber: 201,
            capacity: 4,
            floorNumber: 2,
            assignedStudents: [7, 8, 9, 10]
        },
        {
            id: 5,
            roomNumber: 202,
            capacity: 2,
            floorNumber: 2,
            assignedStudents: []
        },
        {
            id: 6,
            roomNumber: 203,
            capacity: 3,
            floorNumber: 2,
            assignedStudents: [11, 12]
        },
        {
            id: 7,
            roomNumber: 301,
            capacity: 2,
            floorNumber: 3,
            assignedStudents: [13, 14]
        },
        {
            id: 8,
            roomNumber: 302,
            capacity: 4,
            floorNumber: 3,
            assignedStudents: [15]
        },
        {
            id: 9,
            roomNumber: 303,
            capacity: 2,
            floorNumber: 3,
            assignedStudents: []
        },
        {
            id: 10,
            roomNumber: 401,
            capacity: 3,
            floorNumber: 4,
            assignedStudents: []
        }
    ];

    // Helper function to get student names from IDs
    function getStudentNames(studentIds) {
        return studentIds
            .map(id => availableStudents.find(s => s.id === id)?.name)
            .filter(name => name)
            .join(', ');
    }

    // Helper function to generate student options for select
    function generateStudentOptions(roomId, assignedStudentIds) {
        return availableStudents.map(student => {
            const isSelected = assignedStudentIds.includes(student.id);
            return `<option value="${student.id}" ${isSelected ? 'selected' : ''}>${student.name}</option>`;
        }).join('');
    }

    if (roomsTableBody) {
        rooms.forEach(room => {
            const row = document.createElement('tr');
            const assignedNames = getStudentNames(room.assignedStudents);
            const studentDisplay = assignedNames || '<em class="text-muted">No students assigned</em>';
            
            row.innerHTML = `
                <td>${room.roomNumber}</td>
                <td>${room.assignedStudents.length} / ${room.capacity}</td>
                <td>${room.floorNumber}</td>
                <td>${studentDisplay}</td>
                <td style="display: flex; gap: 5px; align-items: center; justify-content: center;">
                    <!-- Edit Button -->
                    <button type="button" class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#updateRoomModal${room.id}">
                        <i class="fas fa-pen"></i> Edit
                    </button>

                    <!-- Update Modal -->
                    <div class="modal fade" id="updateRoomModal${room.id}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="updateRoomLabel${room.id}" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="updateRoomLabel${room.id}">Update Room ${room.roomNumber}</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="mb-3">
                                        <label for="roomNumber${room.id}" class="form-label">Room Number</label>
                                        <input type="number" class="form-control" id="roomNumber${room.id}" value="${room.roomNumber}">
                                    </div>
                                    <div class="mb-3">
                                        <label for="capacity${room.id}" class="form-label">Capacity</label>
                                        <input type="number" class="form-control" id="capacity${room.id}" value="${room.capacity}">
                                    </div>
                                    <div class="mb-3">
                                        <label for="floorNumber${room.id}" class="form-label">Floor Number</label>
                                        <input type="number" class="form-control" id="floorNumber${room.id}" value="${room.floorNumber}">
                                    </div>
                                    <div class="mb-3">
                                        <label for="assignedStudents${room.id}" class="form-label">Assigned Students</label>
                                        <select class="form-select" id="assignedStudents${room.id}" multiple size="8">
                                            ${generateStudentOptions(room.id, room.assignedStudents)}
                                        </select>
                                        <small class="text-muted">Hold Ctrl (Cmd on Mac) to select multiple students. Currently assigned: ${room.assignedStudents.length} / ${room.capacity}</small>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                    <button type="button" class="btn btn-primary">Update</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Delete Button -->
                    <button type="button" class="btn btn-sm btn-danger" data-bs-toggle="modal" data-bs-target="#deleteRoomModal${room.id}">
                        <i class="fas fa-trash-alt"></i> Remove
                    </button>

                    <!-- Delete Modal -->
                    <div class="modal fade" id="deleteRoomModal${room.id}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="deleteRoomLabel${room.id}" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="deleteRoomLabel${room.id}">Delete Room</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <p>Are you sure you want to delete <strong>Room ${room.roomNumber}</strong>?</p>
                                    ${room.assignedStudents.length > 0 ? 
                                        `<div class="alert alert-warning" role="alert">
                                            <i class="fas fa-exclamation-triangle"></i> 
                                            This room has ${room.assignedStudents.length} student(s) assigned. Deleting this room will unassign them.
                                        </div>` 
                                        : ''}
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
            roomsTableBody.appendChild(row);
        });
    }

    // Initialize DataTable
    if (roomsDataTable) {
        new simpleDatatables.DataTable(roomsDataTable);
    }
}