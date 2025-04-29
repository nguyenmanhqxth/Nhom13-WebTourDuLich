document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('tour-modal');
    const closeBtn = document.querySelector('.close-modal');

    // Thêm sự kiện click cho mỗi thẻ tour-card
    document.querySelectorAll('.tour-card').forEach(card => {
        card.addEventListener('click', function (e) {
            e.preventDefault(); // Ngăn chặn hành động mặc định của thẻ <a>
            const data = card.querySelector('.tour-data');

            // Điền thông tin vào modal
            document.getElementById('detail-name').textContent = data.dataset.name;
            document.getElementById('detail-price').textContent = data.dataset.price;
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
        alert('Tour đã được thêm vào giỏ hàng!');
    });

    // Xử lý nút Đặt ngay
    document.getElementById('book-now').addEventListener('click', function () {
        alert('Đặt tour thành công!');
    });
});