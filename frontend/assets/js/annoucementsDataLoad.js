function announcementsAdminDataTableDemo() {
    const announcementsDataTable = document.getElementById('announcementsDataTable');
    const announcementsTableBody = document.getElementById('announcementsTableBody');

    // Mock data for announcements
    const announcements = [
        {
            id: 1,
            title: "Winter Break Schedule",
            userName: "Admin Director",
            content: "Dear Students,\n\nWe would like to inform you about the upcoming winter break schedule. The dormitory will remain open during the break, but please note the following changes:\n\n- Cafeteria will operate on reduced hours (8 AM - 6 PM)\n- Maintenance requests will be handled with priority basis only\n- Front desk will have limited staff\n\nPlease make sure to inform us if you plan to stay during the break so we can make necessary arrangements. If you have any questions, feel free to contact the administration office.\n\nThank you for your cooperation.\n\nBest regards,\nDormitory Administration",
            createdAt: "2024-10-14T09:30:00"
        },
        {
            id: 2,
            title: "Internet Maintenance Notice",
            userName: "IT Department",
            content: "Attention All Residents,\n\nWe will be performing scheduled maintenance on our internet infrastructure this weekend. Please be aware of the following:\n\n- Date: Saturday, October 19th\n- Time: 2:00 AM - 6:00 AM\n- Impact: Complete internet outage during this period\n\nThis maintenance is necessary to upgrade our network equipment and improve overall connection speed and stability. We apologize for any inconvenience this may cause.\n\nWe recommend downloading any necessary materials beforehand. Emergency WiFi hotspots will be available at the common area if absolutely needed.\n\nThank you for your patience and understanding.",
            createdAt: "2024-10-13T14:15:00"
        },
        {
            id: 3,
            title: "Fire Safety Drill",
            userName: "Safety Officer",
            content: "Important Safety Announcement,\n\nWe will be conducting a mandatory fire safety drill next week. All residents are required to participate.\n\nDetails:\n- Date: Wednesday, October 23rd\n- Time: 10:00 AM\n- Duration: Approximately 30-45 minutes\n\nProcedure:\n1. When you hear the alarm, immediately stop what you're doing\n2. Take your room key and a jacket\n3. Exit through the nearest emergency exit\n4. Gather at the designated assembly point in the parking lot\n5. Wait for further instructions from safety personnel\n\nPlease do not use elevators during the drill. This is an important exercise to ensure everyone's safety in case of a real emergency. Attendance will be taken.\n\nThank you for your cooperation.",
            createdAt: "2024-10-12T11:20:00"
        },
        {
            id: 4,
            title: "New Laundry Room Hours",
            userName: "Facilities Manager",
            content: "Dear Residents,\n\nEffective immediately, the laundry room hours have been updated to better serve everyone:\n\nNew Hours:\n- Monday - Friday: 6:00 AM - 11:00 PM\n- Saturday - Sunday: 7:00 AM - 10:00 PM\n\nWe have also installed new washers and dryers on the third floor. Payment can be made via the laundry app or with coins. Please remember to remove your laundry promptly after the cycle completes to allow others to use the machines.\n\nIf you encounter any issues with the machines, please report them immediately to the front desk.\n\nThank you!",
            createdAt: "2024-10-11T16:45:00"
        },
        {
            id: 5,
            title: "Halloween Social Event",
            userName: "Student Activities",
            content: "Get Ready for Halloween! 🎃\n\nYou're invited to our annual Halloween Social Event!\n\nWhen: October 31st, 7:00 PM - 11:00 PM\nWhere: Community Hall\n\nEvent Highlights:\n- Costume contest with prizes\n- Spooky decorations\n- Free pizza and refreshments\n- Music and dancing\n- Photo booth\n- Halloween movie screening\n\nCostumes are encouraged but not required. There will be prizes for:\n- Best Overall Costume\n- Scariest Costume\n- Most Creative Costume\n- Best Group Costume\n\nRSVP by October 25th at the front desk or via email. We look forward to seeing everyone there for a frightfully fun evening!\n\nContact: activities@unidorms.ba",
            createdAt: "2024-10-10T10:00:00"
        },
        {
            id: 6,
            title: "Guest Policy Reminder",
            userName: "Residence Manager",
            content: "Friendly Reminder About Guest Policies,\n\nWe'd like to remind all residents about our guest policy to ensure everyone's safety and comfort:\n\nGuest Rules:\n1. All guests must be registered at the front desk upon arrival\n2. Guests must provide valid photo ID\n3. Overnight guests are limited to 2 nights per week\n4. Maximum of 2 guests per resident at a time\n5. Residents are responsible for their guests' behavior\n6. Guest hours: 8:00 AM - 11:00 PM on weekdays, until midnight on weekends\n\nViolations of these policies may result in loss of guest privileges. Please help us maintain a safe and pleasant environment for everyone.\n\nThank you for your understanding and cooperation.",
            createdAt: "2024-10-09T13:30:00"
        },
        {
            id: 7,
            title: "Study Room Reservations Now Available",
            userName: "Academic Support",
            content: "Great News, Students!\n\nOur renovated study rooms are now open and available for reservation. We have added 5 new study rooms equipped with:\n\n- Whiteboards\n- Large displays for presentations\n- Comfortable seating\n- High-speed internet\n- Power outlets\n- Air conditioning\n\nReservation System:\n- Book online through the resident portal\n- Maximum 3 hours per reservation\n- Can be booked up to 1 week in advance\n- Perfect for group study sessions or individual focus time\n\nThe study rooms are located on the second floor near the library. Check out the online portal for availability and booking instructions.\n\nHappy studying!",
            createdAt: "2024-10-08T09:15:00"
        },
        {
            id: 8,
            title: "Parking Lot Repaving Notice",
            userName: "Maintenance Team",
            content: "Important Notice for Vehicle Owners,\n\nWe will be repaving sections of the parking lot next week. Please be aware of the following schedule:\n\nPhase 1 (Oct 21-22): North section\nPhase 2 (Oct 23-24): South section\nPhase 3 (Oct 25-26): East section\n\nDuring each phase:\n- Affected sections will be closed\n- Temporary parking will be available on nearby streets\n- Please move your vehicle by 7:00 AM on scheduled days\n- Vehicles not moved will be towed at owner's expense\n\nThe new surface will need 48 hours to cure. Do not park on freshly paved areas even if cones are not present.\n\nWe apologize for the inconvenience. This improvement will provide better parking conditions for everyone.\n\nQuestions? Contact maintenance@unidorms.ba",
            createdAt: "2024-10-07T15:40:00"
        },
        {
            id: 9,
            title: "Meal Plan Changes for Next Semester",
            userName: "Dining Services",
            content: "Exciting Updates to Our Meal Plans!\n\nBased on your feedback, we're introducing new flexible meal plan options for the spring semester:\n\nNew Plans:\n1. Premium Plan: 21 meals/week + $200 dining dollars\n2. Standard Plan: 14 meals/week + $150 dining dollars\n3. Light Plan: 10 meals/week + $100 dining dollars\n4. Weekend Plan: 10 meals/week (Fri-Sun only) + $50 dining dollars\n\nNew Features:\n- Unused meals can roll over (max 5 per week)\n- Dining dollars never expire\n- Guest meal swipes now available\n- Mobile ordering through the dining app\n\nMeal plan selection for spring semester opens November 1st. Current residents will receive priority registration. Visit the dining office for more information or to schedule a consultation.\n\nWe're committed to providing quality meals that fit your lifestyle!",
            createdAt: "2024-10-06T12:00:00"
        },
        {
            id: 10,
            title: "Mental Health Awareness Week",
            userName: "Student Wellness",
            content: "Join Us for Mental Health Awareness Week\n\nNext week, we're hosting various events focused on mental health and wellbeing:\n\nSchedule:\n\nMonday: Stress Management Workshop (6 PM, Common Room)\nTuesday: Meditation and Mindfulness Session (7 PM, Gym)\nWednesday: Mental Health Resource Fair (12 PM - 4 PM, Lobby)\nThursday: Yoga and Relaxation Class (6 PM, Gym)\nFriday: Movie Night - Inside Out (8 PM, Community Hall)\n\nAll events are free and open to all residents. Professional counselors will be available during the Resource Fair to answer questions and provide information about campus mental health services.\n\nRemember: It's okay to not be okay, and asking for help is a sign of strength.\n\nFor confidential support, contact: wellness@unidorms.ba or call our 24/7 helpline.",
            createdAt: "2024-10-05T08:45:00"
        }
    ];

    // Helper function to format date and time
    function formatDateTime(dateTimeString) {
        const date = new Date(dateTimeString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    if (announcementsTableBody) {
        announcements.forEach(announcement => {
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td><strong>${announcement.title}</strong></td>
                <td>${announcement.userName}</td>
                <td>${formatDateTime(announcement.createdAt)}</td>
                <td style="display: flex; gap: 5px; align-items: center; justify-content: center;">
                    <!-- Edit Button -->
                    <button type="button" class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#editAnnouncementModal${announcement.id}">
                        <i class="fas fa-pen"></i> Edit
                    </button>

                    <!-- Edit Modal -->
                    <div class="modal fade" id="editAnnouncementModal${announcement.id}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="editAnnouncementLabel${announcement.id}" aria-hidden="true">
                        <div class="modal-dialog modal-lg">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="editAnnouncementLabel${announcement.id}">Edit Announcement</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="mb-3">
                                        <label for="editTitle${announcement.id}" class="form-label">Title</label>
                                        <input type="text" class="form-control" id="editTitle${announcement.id}" value="${announcement.title}">
                                    </div>
                                    <div class="mb-3">
                                        <label for="editThumbnail${announcement.id}" class="form-label">Thumbnail URL</label>
                                        <input type="text" class="form-control" id="editThumbnail${announcement.id}" placeholder="Enter thumbnail url...">
                                    </div>
                                    <div class="mb-3">
                                        <label for="editContent${announcement.id}" class="form-label">Content</label>
                                        <textarea class="form-control" id="editContent${announcement.id}" rows="12">${announcement.content}</textarea>
                                        <small class="text-muted">Edit the full announcement content.</small>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Created By</label>
                                        <p class="form-control-plaintext">${announcement.userName}</p>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Created At</label>
                                        <p class="form-control-plaintext">${formatDateTime(announcement.createdAt)}</p>
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
                    <button type="button" class="btn btn-sm btn-danger" data-bs-toggle="modal" data-bs-target="#deleteAnnouncementModal${announcement.id}">
                        <i class="fas fa-trash-alt"></i> Delete
                    </button>

                    <!-- Delete Modal -->
                    <div class="modal fade" id="deleteAnnouncementModal${announcement.id}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="deleteAnnouncementLabel${announcement.id}" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="deleteAnnouncementLabel${announcement.id}">Delete Announcement</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <p>Are you sure you want to delete this announcement?</p>
                                    <div class="alert alert-warning" role="alert">
                                        <strong>Title:</strong> ${announcement.title}<br>
                                        <strong>Created By:</strong> ${announcement.userName}<br>
                                        <strong>Created At:</strong> ${formatDateTime(announcement.createdAt)}
                                    </div>
                                    <p class="text-danger"><i class="fas fa-exclamation-triangle"></i> This action cannot be undone. All students will no longer see this announcement.</p>
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
            announcementsTableBody.appendChild(row);
        });
    }

    // Initialize DataTable
    if (announcementsDataTable) {
        new simpleDatatables.DataTable(announcementsDataTable);
    }
}