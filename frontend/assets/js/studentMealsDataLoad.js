function studentMealsInit() {
    // Today's meals (mock data)
    const todaysMeals = [
        {
            id: 1,
            type: "Breakfast",
            name: "Scrambled Eggs with Toast",
            description: "Fluffy scrambled eggs served with whole wheat toast, butter, and orange juice. Includes a side of fresh fruit.",
            icon: "fas fa-coffee",
            bgColor: "warning",
            selected: false
        },
        {
            id: 2,
            type: "Lunch",
            name: "Grilled Chicken with Rice",
            description: "Marinated grilled chicken breast served with steamed white rice, mixed vegetables, and house salad.",
            icon: "fas fa-hamburger",
            bgColor: "info",
            selected: false
        },
        {
            id: 3,
            type: "Dinner",
            name: "Spaghetti Bolognese",
            description: "Classic Italian pasta with rich meat sauce, parmesan cheese, and garlic bread on the side.",
            icon: "fas fa-pizza-slice",
            bgColor: "success",
            selected: false
        }
    ];

    const mealsContainer = document.getElementById('mealsContainer');
    
    if (!mealsContainer) return;

    // Render each meal
    todaysMeals.forEach(meal => {
        const mealCard = document.createElement('div');
        mealCard.className = 'card mb-4';
        mealCard.innerHTML = `
            <div class="card-header bg-${meal.bgColor} text-white">
                <i class="${meal.icon} me-2"></i>
                <strong>${meal.type} - 
                ${meal.type == "Breakfast" ? "Sign up for meal until 7AM (Breakfast starts at 9AM)"
                  : meal.type == "Lunch" ? "Sign up for meal until 1PM (Lunch starts at 3PM)"
                  : "Sign up for meal until 5PM (Dinner starts at 7PM)"
                }</strong>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-md-9">
                        <h5 class="card-title">${meal.name}</h5>
                        <p class="card-text">${meal.description}</p>
                    </div>
                    <div class="col-md-3 d-flex align-items-center justify-content-center">
                        <div class="form-check form-switch" style="transform: scale(1.5);">
                            <input class="form-check-input meal-selector" type="checkbox" id="meal${meal.id}" data-meal-id="${meal.id}">
                            <label class="form-check-label" for="meal${meal.id}"></label>
                        </div>
                    </div>
                </div>
            </div>
        `;
        mealsContainer.appendChild(mealCard);
    });
}