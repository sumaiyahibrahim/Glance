document.addEventListener('DOMContentLoaded', function () {
    const quantityInputs = document.querySelectorAll('input[type="number"]');
    const subtotalElement = document.getElementById('subtotal');
    const taxElement = document.getElementById('tax');
    const totalElement = document.getElementById('total');
    const taxRate = 0.175; // 17.5%

    quantityInputs.forEach(input => {
        const subtotalElement = input.closest('tr').querySelector('.item-subtotal');
        subtotalElement.textContent = ''; // Clear the subtotal column initially
        input.addEventListener('input', updateCart);
    });

    function updateCart() {
        let subtotal = 0;

        quantityInputs.forEach(input => {
            const quantity = parseInt(input.value) || 0;
            const priceElement = input.closest('tr').querySelector('.price');
            const price = parseFloat(priceElement.textContent.replace('₹', '').replace(',', ''));
            const itemSubtotal = quantity * price;
            subtotal += itemSubtotal;

            const subtotalElement = input.closest('tr').querySelector('.item-subtotal');
            if (quantity > 0) {
                subtotalElement.textContent = `₹${itemSubtotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
            } else {
                subtotalElement.textContent = ''; // Clear the subtotal if quantity is zero
            }
        });

        const tax = subtotal * taxRate;
        const total = subtotal + tax;

        subtotalElement.textContent = `₹${subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        taxElement.textContent = `₹${tax.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        totalElement.textContent = `₹${total.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
});
