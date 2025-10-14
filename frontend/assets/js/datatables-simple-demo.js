function datatablesSimpleDemo() {
    // Simple-DataTables
    // https://github.com/fiduswriter/Simple-DataTables/wiki

    const datatablesSimple = document.getElementById('datatablesSimple');
    const adminDashboardTBody = document.getElementById('adminDashboardTable');

    const students = [
        {
            id: 1,
            name: "Hamza Husić",
            email: "hamza.husic@university.ba",
            faculty: "Computer Science",
            roomNumber: 204,
            active: "Active"
        },
        {
            id: 2,
            name: "Amina Salkanović",
            email: "amina.salkanovic@university.ba",
            faculty: "Architecture",
            roomNumber: 118,
            active: "Inactive"
        },
        {
            id: 3,
            name: "Faruk Hadžić",
            email: "faruk.hadzic@university.ba",
            faculty: "Mechanical Engineering",
            roomNumber: 315,
            active: "Active"
        },
        {
            id: 4,
            name: "Lejla Avdić",
            email: "lejla.avdic@university.ba",
            faculty: "Medicine",
            roomNumber: 406,
            active: "Active"
        },
        {
            id: 5,
            name: "Emir Kovačević",
            email: "emir.kovacevic@university.ba",
            faculty: "Electrical Engineering",
            roomNumber: 112,
            active: "Pending"
        },
        {
            id: 6,
            name: "Lana Miličević",
            email: "lana.milicevic@university.ba",
            faculty: "Law",
            roomNumber: 302,
            active: "Active"
        },
        {
            id: 7,
            name: "Adnan Begić",
            email: "adnan.begic@university.ba",
            faculty: "Economics",
            roomNumber: 210,
            active: "Inactive"
        },
        {
            id: 8,
            name: "Selma Omerović",
            email: "selma.omerovic@university.ba",
            faculty: "Philosophy",
            roomNumber: 120,
            active: "Active"
        },
        {
            id: 9,
            name: "Haris Mehmedović",
            email: "haris.mehmedovic@university.ba",
            faculty: "Mathematics",
            roomNumber: 405,
            active: "Active"
        },
        {
            id: 10,
            name: "Amila Bešlagić",
            email: "amila.beslagic@university.ba",
            faculty: "Political Science",
            roomNumber: 221,
            active: "Pending"
        },
        {
            id: 11,
            name: "Tarik Selimović",
            email: "tarik.selimovic@university.ba",
            faculty: "Computer Science",
            roomNumber: 108,
            active: "Active"
        },
        {
            id: 12,
            name: "Maja Petrović",
            email: "maja.petrovic@university.ba",
            faculty: "Psychology",
            roomNumber: 312,
            active: "Inactive"
        },
        {
            id: 13,
            name: "Ismail Mujić",
            email: "ismail.mujic@university.ba",
            faculty: "Mechanical Engineering",
            roomNumber: 219,
            active: "Active"
        },
        {
            id: 14,
            name: "Nina Kadić",
            email: "nina.kadic@university.ba",
            faculty: "Fine Arts",
            roomNumber: 407,
            active: "Active"
        },
        {
            id: 15,
            name: "Armin Lukić",
            email: "armin.lukic@university.ba",
            faculty: "Economics",
            roomNumber: 314,
            active: "Inactive"
        }
    ];

    if(adminDashboardTBody){

        students.forEach(student => {
            const row = document.createElement('tr');
            // Split the name into first and last name
            const nameParts = student.name.split(' ');
            const firstName = nameParts[0];
            const lastName = nameParts.slice(1).join(' ');
            
            row.innerHTML = `
                <td>${student.name}</td>
                <td>${student.email}</td>
                <td>${student.faculty}</td>
                <td>${student.roomNumber}</td>
                <td>${student.active}</td>
                <td style="display: flex; gap: 5px; align-items: center; justify-content: center;">
                    <!-- Button trigger modal -->
                    <button type="button" class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#updateBackdrop${student.id}">
                        <i class="fas fa-pen"></i> Edit
                    </button>

                    <!-- Modal For Updating Student Details -->
                    <div class="modal fade" id="updateBackdrop${student.id}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="updateLabel${student.id}" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="updateLabel${student.id}">Update Student Details</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="mb-3">
                                    <label for="firstName${student.id}" class="form-label">First name</label>
                                    <input type="text" class="form-control" id="firstName${student.id}" placeholder="John" value="${firstName}">
                                </div>
                                <div class="mb-3">
                                    <label for="lastName${student.id}" class="form-label">Last name</label>
                                    <input type="text" class="form-control" id="lastName${student.id}" placeholder="Doe" value="${lastName}">
                                </div>
                                <div class="mb-3">
                                    <label for="email${student.id}" class="form-label">Email</label>
                                    <input type="email" class="form-control" id="email${student.id}" placeholder="john.doe@example.com" value="${student.email}">
                                </div>
                                <div class="mb-3">
                                    <label for="faculty${student.id}" class="form-label">Faculty</label>
                                    <input type="text" class="form-control" id="faculty${student.id}" placeholder="MIT" value="${student.faculty}">
                                </div>
                                <div class="mb-3">
                                    <label for="roomNumber${student.id}" class="form-label">Room number</label>
                                    <p>${student.roomNumber}</p>
                                </div>
                                <div class="mb-3">
                                    <label for="role${student.id}">Role</label>
                                    <select class="form-select" id="role${student.id}">
                                        <option value="student" selected>Student</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <label for="active${student.id}">Active</label>
                                    <select class="form-select" id="active${student.id}">
                                        <option value="Active" ${student.active === 'Active' ? 'selected' : ''}>Active</option>
                                        <option value="Inactive" ${student.active === 'Inactive' ? 'selected' : ''}>Inactive</option>
                                        <option value="Pending" ${student.active === 'Pending' ? 'selected' : ''}>Pending</option>
                                    </select>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                <button type="button" class="btn btn-primary">Update</button>
                            </div>
                            </div>
                        </div>
                    </div> 

                    <!-- Button trigger modal -->
                    <button type="button" class="btn btn-sm btn-danger" data-bs-toggle="modal" data-bs-target="#deleteBackdrop${student.id}">
                        <i class="fas fa-trash-alt"></i>Remove
                    </button>


                    <!-- Modal For Deleting Student Details -->
                    <div class="modal fade" id="deleteBackdrop${student.id}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="deleteLabel${student.id}" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="deleteLabel${student.id}">Delete Student</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                Are you sure you want to delete <strong>${student.name}</strong>?
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
            adminDashboardTBody.appendChild(row);
        })
    }

    if (datatablesSimple) {
        new simpleDatatables.DataTable(datatablesSimple);
    }
}