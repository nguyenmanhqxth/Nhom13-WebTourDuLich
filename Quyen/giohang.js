document.addEventListener('DOMContentLoaded', function () {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartItemsContainer = document.getElementById('cart-items');
    let subtotalElem = document.getElementById('subtotal');
    let discountElem = document.getElementById('discount');
    let totalElem = document.getElementById('total');

    function updateSummary() {
        let subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        subtotalElem.textContent = `₫ ${subtotal.toLocaleString()}`;
        totalElem.textContent = `₫ ${subtotal.toLocaleString()}`;
    }
    

    function renderCart() {
        cartItemsContainer.innerHTML = "";

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = "<p>Giỏ hàng của bạn hiện tại trống.</p>";
            updateSummary();
            return;
        }

        cart.forEach(item => {
            let itemDiv = document.createElement('div');
            itemDiv.className = 'cart-item';
            itemDiv.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-info">
                    <h3>${item.name}</h3>
                    <div class="date"><i class="fa-solid fa-calendar-days"></i> ${item.date}</div>
                    <p>${item.description}</p>
                </div>
                <div class="cart-actions">
                    <div class="price">₫ ${item.price.toLocaleString()}</div>
                    <div class="quantity-controls">
                        <button class="decrease">-</button>
                        <span>${item.quantity}</span>
                        <button class="increase">+</button>
                    </div>
                    <div class="remove"><i class="fa-solid fa-trash"></i> Xóa</div>
                </div>
            `;

          
            itemDiv.querySelector('.remove').addEventListener('click', () => {
                cart = cart.filter(cartItem => cartItem.name !== item.name);
                localStorage.setItem('cart', JSON.stringify(cart));
                renderCart();
            });

            
            itemDiv.querySelector('.increase').addEventListener('click', () => {
                item.quantity++;
                localStorage.setItem('cart', JSON.stringify(cart));
                renderCart();
            });

            itemDiv.querySelector('.decrease').addEventListener('click', () => {
                if (item.quantity > 1) {
                    item.quantity--;
                    localStorage.setItem('cart', JSON.stringify(cart));
                    renderCart();
                }
            });

            cartItemsContainer.appendChild(itemDiv);
        });

        updateSummary();
    }

    renderCart();
});
