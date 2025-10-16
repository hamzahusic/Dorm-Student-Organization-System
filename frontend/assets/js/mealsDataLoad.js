function mealsDataTableDemo() {
    const mealsDataTable = document.getElementById('mealsDataTable');
    const mealsTableBody = document.getElementById('mealsTableBody');

    // Mock data for meals
    const meals = [
        {
            id: 1,
            name: "Scrambled Eggs with Toast",
            type: "Breakfast",
            description: "Fluffy scrambled eggs served with whole wheat toast, butter, and orange juice. Includes a side of fresh fruit.",
            date: "2024-10-14"
        },
        {
            id: 2,
            name: "Pancakes with Maple Syrup",
            type: "Breakfast",
            description: "Stack of three fluffy pancakes topped with maple syrup and butter. Served with bacon strips and coffee.",
            date: "2024-10-13"
        },
        {
            id: 3,
            name: "Grilled Chicken with Rice",
            type: "Lunch",
            description: "Marinated grilled chicken breast served with steamed white rice, mixed vegetables, and house salad.",
            date: "2024-10-14"
        },
        {
            id: 4,
            name: "Beef Burger with Fries",
            type: "Lunch",
            description: "Juicy beef burger with lettuce, tomato, onion, and cheese. Served with crispy french fries and coleslaw.",
            date: "2024-10-13"
        },
        {
            id: 5,
            name: "Caesar Salad",
            type: "Lunch",
            description: "Fresh romaine lettuce with Caesar dressing, parmesan cheese, croutons, and grilled chicken strips.",
            date: "2024-10-12"
        },
        {
            id: 6,
            name: "Spaghetti Bolognese",
            type: "Dinner",
            description: "Classic Italian pasta with rich meat sauce, parmesan cheese, and garlic bread on the side.",
            date: "2024-10-14"
        },
        {
            id: 7,
            name: "Baked Salmon with Vegetables",
            type: "Dinner",
            description: "Oven-baked salmon fillet with lemon butter sauce, served with roasted vegetables and mashed potatoes.",
            date: "2024-10-13"
        },
        {
            id: 8,
            name: "Vegetable Stir Fry",
            type: "Dinner",
            description: "Mixed vegetables stir-fried with soy sauce and garlic, served over jasmine rice. Vegetarian option.",
            date: "2024-10-12"
        },
        {
            id: 9,
            name: "Oatmeal with Berries",
            type: "Breakfast",
            description: "Warm oatmeal topped with fresh blueberries, strawberries, honey, and a sprinkle of cinnamon.",
            date: "2024-10-12"
        },
        {
            id: 10,
            name: "Pizza Margherita",
            type: "Lunch",
            description: "Traditional Italian pizza with tomato sauce, mozzarella cheese, fresh basil, and olive oil.",
            date: "2024-10-11"
        },
        {
            id: 11,
            name: "Chicken Tikka Masala",
            type: "Dinner",
            description: "Tender chicken pieces in creamy tomato curry sauce, served with basmati rice and naan bread.",
            date: "2024-10-11"
        },
        {
            id: 12,
            name: "French Toast",
            type: "Breakfast",
            description: "Thick slices of bread soaked in egg mixture and fried until golden. Topped with powdered sugar and syrup.",
            date: "2024-10-11"
        },
        {
            id: 13,
            name: "Beef Tacos",
            type: "Lunch",
            description: "Three soft tacos filled with seasoned ground beef, lettuce, cheese, tomatoes, and sour cream.",
            date: "2024-10-10"
        },
        {
            id: 14,
            name: "Roasted Turkey with Gravy",
            type: "Dinner",
            description: "Sliced roasted turkey breast with gravy, cranberry sauce, stuffing, and green beans.",
            date: "2024-10-10"
        },
        {
            id: 15,
            name: "Greek Yogurt Parfait",
            type: "Breakfast",
            description: "Layers of Greek yogurt, granola, honey, and mixed berries. Light and healthy breakfast option.",
            date: "2024-10-10"
        }
    ];

    // Helper function to format date
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    }

    // Helper function to truncate description
    function truncateDescription(text, maxLength = 60) {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    }

    if (mealsTableBody) {
        meals.forEach(meal => {
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td><strong>${meal.name}</strong></td>
                <td>${meal.type}</td>
                <td>${truncateDescription(meal.description)}</td>
                <td>${formatDate(meal.date)}</td>
                <td style="display: flex; gap: 5px; align-items: center; justify-content: center;">
                    <!-- Edit Button -->
                    <button type="button" class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#editMealModal${meal.id}">
                        <i class="fas fa-pen"></i> Edit
                    </button>

                    <!-- Edit Modal -->
                    <div class="modal fade" id="editMealModal${meal.id}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="editMealLabel${meal.id}" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="editMealLabel${meal.id}">Edit Meal</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="mb-3">
                                        <label for="mealName${meal.id}" class="form-label">Meal Name</label>
                                        <input type="text" class="form-control" id="mealName${meal.id}" value="${meal.name}">
                                    </div>
                                    <div class="mb-3">
                                        <label for="mealType${meal.id}" class="form-label">Meal Type</label>
                                        <select class="form-select" id="mealType${meal.id}">
                                            <option value="Breakfast" ${meal.type === 'Breakfast' ? 'selected' : ''}>Breakfast</option>
                                            <option value="Lunch" ${meal.type === 'Lunch' ? 'selected' : ''}>Lunch</option>
                                            <option value="Dinner" ${meal.type === 'Dinner' ? 'selected' : ''}>Dinner</option>
                                        </select>
                                    </div>
                                    <div class="mb-3">
                                        <label for="mealDescription${meal.id}" class="form-label">Description</label>
                                        <textarea class="form-control" id="mealDescription${meal.id}" rows="4">${meal.description}</textarea>
                                    </div>
                                    <div class="mb-3">
                                        <label for="mealDate${meal.id}" class="form-label">Date</label>
                                        <input type="date" class="form-control" id="mealDate${meal.id}" value="${meal.date}">
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                    <button type="button" class="btn btn-primary">Update</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Remove Button -->
                    <button type="button" class="btn btn-sm btn-danger" data-bs-toggle="modal" data-bs-target="#removeMealModal${meal.id}">
                        <i class="fas fa-trash-alt"></i> Remove
                    </button>

                    <!-- Remove Modal -->
                    <div class="modal fade" id="removeMealModal${meal.id}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="removeMealLabel${meal.id}" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="removeMealLabel${meal.id}">Remove Meal</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <p>Are you sure you want to remove this meal?</p>
                                    <div class="alert alert-warning" role="alert">
                                        <strong>Meal:</strong> ${meal.name}<br>
                                        <strong>Type:</strong> ${meal.type}<br>
                                        <strong>Date:</strong> ${formatDate(meal.date)}
                                    </div>
                                    <p class="text-danger"><i class="fas fa-exclamation-triangle"></i> This action cannot be undone.</p>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                    <button type="button" class="btn btn-danger">Remove</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </td>
            `;
            mealsTableBody.appendChild(row);
        });
    }

    // Initialize DataTable
    if (mealsDataTable) {
        new simpleDatatables.DataTable(mealsDataTable);
    }
}