// Initialize cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to add item to cart
function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        product.quantity = 1;
        cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

// Function to decrease quantity
function decreaseQuantity(productId) {
    const item = cart.find(item => item.id === productId);
    if (item && item.quantity > 1) {
        item.quantity--;
    } else {
        // Remove item if quantity is 1 and minus button is clicked
        cart = cart.filter(item => item.id !== productId);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

// Function to update the cart display
function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';  // Clear current items
    
    let totalAmount = 0;
    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        itemDiv.innerHTML = `
            <span>${item.name} (x${item.quantity})</span>
            <span>PHP ${item.price * item.quantity}</span>
            <button class="decrease-quantity" data-id="${item.id}">-</button>
        `;
        cartItems.appendChild(itemDiv);
        totalAmount += item.price * item.quantity;
    });

    const totalElement = document.getElementById('cart-total');
    if (totalElement) {
        totalElement.textContent = `Total: PHP ${totalAmount}`;
    }

    // Add event listener to decrease quantity buttons
    document.querySelectorAll('.decrease-quantity').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            decreaseQuantity(productId);
        });
    });
}

// Event listener for "Add to Cart" buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const product = {
            id: this.parentElement.getAttribute('data-id'),
            name: this.parentElement.getAttribute('data-name'),
            price: parseFloat(this.parentElement.getAttribute('data-price'))
        };

        addToCart(product);
    });
});

// Update cart display on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCartDisplay();
});
