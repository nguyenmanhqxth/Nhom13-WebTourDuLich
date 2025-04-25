document.addEventListener('DOMContentLoaded', function () {
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function () {
       
            const productName = button.getAttribute('data-name');
            const productPrice = button.getAttribute('data-price');
            const productImage = button.getAttribute('data-image');
            const productDate = button.getAttribute('data-date');
            const productDescription = button.getAttribute('data-description');

           
            let cart = JSON.parse(localStorage.getItem('cart')) || [];

         
            const existingProductIndex = cart.findIndex(item => item.name === productName);
            if (existingProductIndex >= 0) {
              
                cart[existingProductIndex].quantity += 1;
            } else {
             
                cart.push({
                    name: productName,
                    price: productPrice,
                    image: productImage,
                    date: productDate,
                    description: productDescription,
                    quantity: 1
                });
            }

          
            localStorage.setItem('cart', JSON.stringify(cart));

            alert(`${productName} đã được thêm vào giỏ hàng!`);
        });
    });
});
