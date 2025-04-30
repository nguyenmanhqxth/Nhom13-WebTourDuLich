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
    const modal = document.getElementById('tour-modal');
    const closeBtn = document.querySelector('.close-modal');

    // Thêm sự kiện click cho mỗi thẻ tour-card
    document.querySelectorAll('.tour-card').forEach(card => {
        card.addEventListener('click', function (e) {
            e.preventDefault(); // Ngăn chặn hành động mặc định của thẻ <a>
            const data = card.querySelector('.tour-data');

            // Điền thông tin vào modal
            document.getElementById('detail-name').textContent = data.dataset.name;
            document.getElementById('detail-price-value').textContent = parseInt(data.dataset.price).toLocaleString('vi-VN');

            document.getElementById('detail-image').src = data.dataset.image;

            const descriptionList = data.dataset.description.split('||');
            const formattedDescription = descriptionList.map(item => `<li>${item.trim()}</li>`).join('');
            document.getElementById('detail-description').innerHTML = `<ul>${formattedDescription}</ul>`;

            // Hiển thị modal
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });

    // Đóng modal
    closeBtn.addEventListener('click', function () {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Đóng modal khi click bên ngoài
    window.addEventListener('click', function (e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Xử lý nút Thêm vào giỏ hàng
    document.getElementById('add-to-cart').addEventListener('click', function () {
        // Lấy tên tour đang hiển thị trong modal
        const currentTourName = document.getElementById('detail-name').textContent.trim();
    
        // Tìm nút "Mua" tương ứng với tour đó trong trang
        const targetButton = Array.from(document.querySelectorAll('.add-to-cart-btn')).find(btn =>
            btn.getAttribute('data-name') === currentTourName
        );
    
        // Giả lập click nút Mua nếu tìm thấy
        if (targetButton) {
            targetButton.click();
        } else {
            alert("Không tìm thấy sản phẩm để thêm vào giỏ.");
        }
    });
    

    // Xử lý nút Đặt ngay
    document.getElementById('book-now').addEventListener('click', function () {
        alert('Đặt tour thành công!');
    });
});
