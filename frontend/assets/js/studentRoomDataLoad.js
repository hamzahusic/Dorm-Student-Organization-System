function studentRoomInit() {
    // Room details (mock data)
    const roomDetails = {
        roomNumber: 204,
        floor: 2,
        capacity: 3,
        currentOccupancy: 2,
        type: "Standard Triple Room"
    };

    // Roommates data (mock data) - excluding current student
    const roommates = [
        {
            id: 1,
            name: "Faruk Hadžić",
            email: "faruk.hadzic@university.ba",
            faculty: "Mechanical Engineering",
            year: "3rd Year",
            phoneNumber: "+387 61 123 456"
        },
    ];

    // Display room details
    const roomNumberEl = document.getElementById('roomNumber');
    const roomFloorEl = document.getElementById('roomFloor');
    const roomCapacityEl = document.getElementById('roomCapacity');
    const roomOccupancyEl = document.getElementById('roomOccupancy');
    const roomAvailableEl = document.getElementById('roomAvailable');
    const roomTypeEl = document.getElementById('roomType');

    if (roomNumberEl) {
        roomNumberEl.textContent = roomDetails.roomNumber;
    }

    if (roomFloorEl) {
        const floorSuffix = roomDetails.floor === 1 ? 'st' : 
                           roomDetails.floor === 2 ? 'nd' : 
                           roomDetails.floor === 3 ? 'rd' : 'th';
        roomFloorEl.textContent = `${roomDetails.floor}${floorSuffix} Floor`;
    }

    if (roomCapacityEl) {
        roomCapacityEl.textContent = `${roomDetails.capacity} Students`;
    }

    if (roomOccupancyEl) {
        roomOccupancyEl.textContent = `${roomDetails.currentOccupancy} / ${roomDetails.capacity}`;
    }

    if (roomAvailableEl) {
        const availableBeds = roomDetails.capacity - roomDetails.currentOccupancy;
        roomAvailableEl.textContent = availableBeds === 1 ? '1 Bed' : `${availableBeds} Beds`;
        
        if (availableBeds === 0) {
            roomAvailableEl.classList.remove('text-success');
            roomAvailableEl.classList.add('text-danger');
        }
    }

    if (roomTypeEl) {
        roomTypeEl.textContent = roomDetails.type;
    }

    // Display roommates
    const roommatesListEl = document.getElementById('roommatesList');
    
    if (roommatesListEl) {
        if (roommates.length === 0) {
            roommatesListEl.innerHTML = `
                <div class="alert alert-warning" role="alert">
                    <i class="fas fa-user-slash"></i> You currently have no roommates assigned.
                </div>
            `;
        } else {
            roommates.forEach(roommate => {
                const roommateCard = document.createElement('div');
                roommateCard.className = 'card mb-3 border-success';
                roommateCard.innerHTML = `
                    <div class="card-body">
                        <div class="d-flex align-items-center mb-2">
                            <div class="rounded-circle bg-success text-white d-flex align-items-center justify-content-center me-3" style="width: 50px; height: 50px;">
                                <i class="fas fa-user fa-lg"></i>
                            </div>
                            <div>
                                <h5 class="mb-0">${roommate.name}</h5>
                                <small class="text-muted">${roommate.faculty}</small>
                            </div>
                        </div>
                        <hr>
                        <div class="row">
                            <div class="col-md-6">
                                <p class="mb-1"><i class="fas fa-envelope text-primary me-2"></i><small>${roommate.email}</small></p>
                                <p class="mb-1"><i class="fas fa-phone text-primary me-2"></i><small>${roommate.phoneNumber}</small></p>
                            </div>
                            <div class="col-md-6">
                                <p class="mb-1"><i class="fas fa-graduation-cap text-primary me-2"></i><small>${roommate.year}</small></p>
                            </div>
                        </div>
                    </div>
                `;
                roommatesListEl.appendChild(roommateCard);
            });
        }
    }
}