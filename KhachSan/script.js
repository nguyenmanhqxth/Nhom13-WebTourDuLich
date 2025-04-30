// Hàm mở modal chi tiết khách sạn
function openModal(hotelName, hotelImage, hotelLocation, hotelPrice, hotelOverview, hotelDetails, hotelAmenities) {
    document.getElementById("hotelName").innerText = hotelName;
    document.getElementById("hotelImage").src = hotelImage;
    document.getElementById("hotelLocation").innerText = "Địa chỉ: " + hotelLocation;
    document.getElementById("hotelPrice").innerText = "Giá từ: " + hotelPrice;
    document.getElementById("hotelOverview").innerText = hotelOverview;
    document.getElementById("hotelDetails").innerText = hotelDetails;
    document.getElementById("hotelAmenities").innerText = hotelAmenities;

    const addToCartButton = document.getElementById("addToCartButton");
    addToCartButton.setAttribute("data-name", hotelName);
    addToCartButton.setAttribute("data-image", hotelImage);

    const priceNumber = parseFloat(hotelPrice.replace(/[^\d.]/g, ''));
    addToCartButton.setAttribute("data-price", priceNumber);
    
    addToCartButton.setAttribute("data-date", new Date().toISOString().split('T')[0]);
    addToCartButton.setAttribute("data-description", hotelOverview);

    document.getElementById("hotelDetailModal").style.display = "block";

     const modal = document.getElementById("hotelDetailModal");
     modal.addEventListener('click', function(e) {
         if (e.target === this) {
             closeModal();
         }
     });
 
     document.getElementById("hotelDetailModal").style.display = "block";
 }
 
 function closeModal() {
     const modal = document.getElementById("hotelDetailModal");
     modal.style.display = "none";
     modal.removeEventListener('click', closeModal);
 }


function closeModal() {
    document.getElementById("hotelDetailModal").style.display = "none";
}

document.addEventListener('DOMContentLoaded', function () {
    const modalAddToCartBtn = document.getElementById('addToCartButton');
    if (modalAddToCartBtn) {
        modalAddToCartBtn.addEventListener('click', function() {
            addToCart(modalAddToCartBtn);
        });
    }
});

function addToCart(button) {
    const productName = button.getAttribute('data-name');
    const productPrice = parseFloat(button.getAttribute('data-price'));
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
    alert(`${productName} - Giá: ${productPrice.toLocaleString('vi-VN')}₫ đã được thêm vào giỏ hàng!`);
}