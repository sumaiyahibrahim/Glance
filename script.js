// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Initialize cart when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    // Create cart count element if it doesn't exist
    if (!document.querySelector('.cart-count')) {
        const cartIcon = document.querySelector('a[href="cart.html"] img');
        if (cartIcon) {
            const cartCount = document.createElement('span');
            cartCount.className = 'cart-count';
            cartIcon.parentElement.appendChild(cartCount);
        }
    }
    updateCartCount();
    if (window.location.pathname.includes('cart.html')) {
        displayCart();
    }
});

// Update cart count
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

// Add to cart function
function addToCart(productId, name, price, image) {
    const existingItem = cart.find(item => item.productId === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            productId,
            name,
            price: parseFloat(price),
            image,
            quantity: 1
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert('Product added to cart!');
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.productId !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    displayCart(); // Refresh cart display
}

// Update quantity
function updateQuantity(productId, newQuantity) {
    const item = cart.find(item => item.productId === productId);
    if (item) {
        const qty = parseInt(newQuantity);
        if (qty <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = qty;
            localStorage.setItem('cart', JSON.stringify(cart));
            displayCart();
        }
    }
}

// Calculate tax
function calculateTax(subtotal) {
    return parseFloat((subtotal * 0.175).toFixed(2)); // 17.5% tax rate
}

// Format currency
function formatCurrency(amount) {
    return '₹' + parseFloat(amount).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Display cart items
function displayCart() {
    const cartTable = document.querySelector('.cart-table');
    if (!cartTable) return;

    const tbody = cartTable.querySelector('tbody') || cartTable;
    tbody.innerHTML = '';

    let subtotal = 0;
    let hasValidQuantity = false;

    cart.forEach(item => {
        const qty = parseInt(item.quantity);
        tbody.innerHTML += `
            <tr>
                <td>
                    <div class="cart-info">
                        <img src="${item.image}">
                        <div>
                            <p>${item.name}</p>
                            <small>Price: ${formatCurrency(item.price)}</small><br>
                            <a href="javascript:void(0)" onclick="removeFromCart('${item.productId}')">Remove</a>
                        </div>
                    </div>
                </td>
                <td><input type="number" value="${item.quantity}" min="1" onchange="updateQuantity('${item.productId}', this.value)"></td>
                <td>${qty > 0 ? formatCurrency(item.price * qty) : '-'}</td>
            </tr>
        `;

        if (qty > 0) {
            hasValidQuantity = true;
            const itemSubtotal = item.price * qty;
            subtotal += itemSubtotal;
        }
    });

    const tax = hasValidQuantity ? calculateTax(subtotal) : 0;
    const total = hasValidQuantity ? subtotal + tax : 0;

    // Update the total price section
    const totalPriceTable = document.querySelector('.total-price table');
    if (totalPriceTable) {
        totalPriceTable.innerHTML = `
            <tr>
                <td>Subtotal</td>
                <td>${hasValidQuantity ? formatCurrency(subtotal) : '-'}</td>
            </tr>
            <tr>
                <td>Tax</td>
                <td>${hasValidQuantity ? formatCurrency(tax) : '-'}</td>
            </tr>
            <tr>
                <td>Total</td>
                <td>${hasValidQuantity ? formatCurrency(total) : '-'}</td>
            </tr>
        `;
    }
}

// Product filtering
function filterProducts() {
    const select = document.querySelector('select');
    if (!select) return;

    const products = Array.from(document.querySelectorAll('.col-4'));
    const sortBy = select.value;

    products.sort((a, b) => {
        const priceA = parseInt(a.querySelector('p').textContent.replace('₹', '').replace(',', ''));
        const priceB = parseInt(b.querySelector('p').textContent.replace('₹', '').replace(',', ''));
        const ratingA = a.querySelector('.rating').children.length;
        const ratingB = b.querySelector('.rating').children.length;

        switch (sortBy) {
            case 'Short by price':
                return priceA - priceB;
            case 'Short by popularity':
                return ratingB - ratingA;
            case 'Short by rating':
                return ratingB - ratingA;
            default:
                return 0;
        }
    });

    const container = products[0].parentElement;
    container.innerHTML = '';
    products.forEach(product => container.appendChild(product));
}

// Menu toggle
function menutoggle() {
    const MenuItems = document.getElementById('MenuItems');
    if (MenuItems.style.maxHeight === '0px') {
        MenuItems.style.maxHeight = '200px';
    } else {
        MenuItems.style.maxHeight = '0px';
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Add cart count span
    const cartIcon = document.querySelector('a[href="cart.html"]');
    if (cartIcon) {
        const span = document.createElement('span');
        span.className = 'cart-count';
        span.style.cssText = 'background: #ff523b; color: white; padding: 2px 5px; border-radius: 50%; position: absolute; font-size: 12px;';
        cartIcon.style.position = 'relative';
        cartIcon.appendChild(span);
        updateCartCount();
    }

    // Initialize cart display
    displayCart();

    // Add event listener for product filtering
    const select = document.querySelector('select');
    if (select) {
        select.addEventListener('change', filterProducts);
    }
});

// Form validation
function validateForm(formType) {
    const form = document.querySelector(`form[data-type="${formType}"]`);
    if (!form) return true;

    const email = form.querySelector('input[type="email"]')?.value;
    const password = form.querySelector('input[type="password"]')?.value;

    if (!email || !password) {
        alert('Please fill in all fields');
        return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert('Please enter a valid email address');
        return false;
    }

    if (password.length < 6) {
        alert('Password must be at least 6 characters long');
        return false;
    }

    return true;
}

// Initialize
document.addEventListener('DOMContentLoaded', function () {
    // Add cart count to header
    const cartImg = document.querySelector('a[href="cart.html"] img');
    if (cartImg) {
        const cartCount = document.createElement('span');
        cartCount.className = 'cart-count';
        cartImg.parentElement.appendChild(cartCount);
    }

    updateCartCount();
    displayCart();

    // Add event listener for product sorting
    const sortSelect = document.querySelector('select');
    if (sortSelect) {
        sortSelect.addEventListener('change', filterProducts);
    }

    // Add event listeners for forms
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function (e) {
            if (!validateForm(form.dataset.type)) {
                e.preventDefault();
            }
        });
    });
});