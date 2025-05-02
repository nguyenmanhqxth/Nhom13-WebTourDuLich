document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('tour-modal');
    const closeBtn = document.querySelector('.close-modal');

    // Mở modal khi bấm vào bất kỳ tour-card nào
    document.querySelectorAll('.tour-card').forEach(card => {
        card.addEventListener('click', function (e) {
            e.preventDefault(); // Ngăn hành vi mặc định

            const data = card.querySelector('.tour-data');

            // Đổ dữ liệu vào modal
            document.getElementById('detail-name').textContent = data.dataset.name;
            document.getElementById('detail-price-value').textContent = parseInt(data.dataset.price).toLocaleString('vi-VN');
            document.getElementById('detail-image').src = data.dataset.image;

            const descriptionList = data.dataset.description.split('||');
            const formattedDescription = descriptionList.map(item => `<li>${item.trim()}</li>`).join('');
            document.getElementById('detail-description').innerHTML = `<ul>${formattedDescription}</ul>`;

            // Reset lại số lượng mỗi lần mở modal
            document.getElementById('quantity').value = 1;

            // Hiển thị modal
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });

    // Đóng modal khi bấm nút "x"
    closeBtn.addEventListener('click', function () {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Đóng modal khi bấm ra ngoài
    window.addEventListener('click', function (e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Xử lý nút "Thêm vào giỏ hàng"
    document.getElementById('add-to-cart').addEventListener('click', function () {
        const name = document.getElementById('detail-name').textContent.trim();
        const price = parseInt(document.getElementById('detail-price-value').textContent.replace(/[₫,.]/g, ''));
        const image = document.getElementById('detail-image').src;
        const descriptionHTML = document.getElementById('detail-description').innerHTML;
        const quantity = parseInt(document.getElementById('quantity').value);
        const date = new Date().toLocaleDateString('vi-VN');

        // Chuyển mô tả HTML thành văn bản có "||"
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = descriptionHTML;
        const items = Array.from(tempDiv.querySelectorAll('li')).map(li => li.textContent);
        const description = items.join('||');

        // Lấy giỏ hàng hiện tại
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        const existing = cart.find(item => item.name === name);
        if (existing) {
            existing.quantity += quantity;
        } else {
            cart.push({
                name,
                price,
                image,
                description,
                date,
                quantity
            });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${name} đã được thêm vào giỏ hàng!`);
    });

    // Xử lý nút "Đặt ngay"
    document.getElementById('book-now').addEventListener('click', function () {
        alert('Đặt tour thành công!');
    });
});
