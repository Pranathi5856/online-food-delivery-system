// Mock data for restaurants and menus
const restaurants = [
    {
        name: "Restaurant A",
        cuisine: "Indian",
        menu: [
            { item: "Butter Chicken", price: 12.99 },
            { item: "Paneer Tikka", price: 10.99 }
        ]
    },
    {
        name: "Restaurant B",
        cuisine: "Italian",
        menu: [
            { item: "Margherita Pizza", price: 8.99 },
            { item: "Pasta Alfredo", price: 11.99 }
        ]
    }
];

// Global cart array
let cart = [];

// Load restaurant list
const loadRestaurants = () => {
    const restaurantList = document.getElementById("restaurant-list");
    restaurantList.innerHTML = ""; // Clear previous content

    restaurants.forEach((restaurant, index) => {
        const restaurantDiv = document.createElement("div");
        restaurantDiv.className = "restaurant";
        restaurantDiv.innerHTML = `
            <h3>${restaurant.name}</h3>
            <p>Cuisine: ${restaurant.cuisine}</p>
            <button onclick="viewMenu(${index})">View Menu</button>
        `;
        restaurantList.appendChild(restaurantDiv);
    });
};

// View menu for a restaurant
const viewMenu = (index) => {
    const selectedRestaurant = restaurants[index];
    const menu = selectedRestaurant.menu;

    const restaurantList = document.getElementById("restaurant-list");
    restaurantList.innerHTML = `<h3>${selectedRestaurant.name} - Menu</h3>`;

    menu.forEach((menuItem, menuIndex) => {
        const menuDiv = document.createElement("div");
        menuDiv.className = "restaurant";
        menuDiv.innerHTML = `
            <p>${menuItem.item} - $${menuItem.price.toFixed(2)}</p>
            <button onclick="addToCart(${index}, ${menuIndex})">Add to Cart</button>
        `;
        restaurantList.appendChild(menuDiv);
    });

    const backButton = document.createElement("button");
    backButton.textContent = "Back to Restaurants";
    backButton.onclick = loadRestaurants;
    restaurantList.appendChild(backButton);
};

// Add item to cart
const addToCart = (restaurantIndex, menuIndex) => {
    const item = restaurants[restaurantIndex].menu[menuIndex];
    cart.push(item);
    updateCart();
};

// Update cart display
const updateCart = () => {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const checkoutButton = document.getElementById("checkout-button");

    cartItems.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>No items in the cart.</p>";
        checkoutButton.disabled = true;
    } else {
        cart.forEach((item, index) => {
            const cartItem = document.createElement("div");
            cartItem.className = "cart-item";
            cartItem.innerHTML = `
                <p>${item.item} - $${item.price.toFixed(2)}</p>
                <button onclick="removeFromCart(${index})">Remove</button>
            `;
            cartItems.appendChild(cartItem);
            total += item.price;
        });
        checkoutButton.disabled = false;
    }

    cartTotal.textContent = total.toFixed(2);
};

// Remove item from cart
const removeFromCart = (index) => {
    cart.splice(index, 1);
    updateCart();
};

// Initialize
loadRestaurants();
