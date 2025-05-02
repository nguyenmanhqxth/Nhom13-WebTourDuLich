document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('tour-modal');
    const closeBtn = document.querySelector('.close-modal');

    // Mở modal khi bấm vào tour
    document.querySelectorAll('.tour-card').forEach(card => {
        card.addEventListener('click', function (e) {
            e.preventDefault();

            const data = card.querySelector('.tour-data');

            // Lấy thông tin
            const name = data.dataset.name;
            const price = parseInt(data.dataset.price);
            const image = data.dataset.image;
            const descriptionList = data.dataset.description.split('||');

            // Gán thông tin vào modal
            document.getElementById('detail-name').textContent = name;
            document.getElementById('detail-price').textContent = price.toLocaleString('vi-VN');
            document.getElementById('detail-price').setAttribute('data-value', price); // lưu giá trị gốc
            document.getElementById('detail-image').src = image;

            const formattedDescription = descriptionList.map(item => `<li>${item.trim()}</li>`).join('');
            document.getElementById('detail-description').innerHTML = `<ul>${formattedDescription}</ul>`;

            // Reset số lượng
            document.getElementById('quantity').value = 1;

            // Hiện modal
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });

    // Đóng modal
    closeBtn.addEventListener('click', function () {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Click ra ngoài modal để đóng
    window.addEventListener('click', function (e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Thêm vào giỏ hàng
    document.getElementById('add-to-cart').addEventListener('click', function () {
        const name = document.getElementById('detail-name').textContent.trim();
        const price = parseInt(document.getElementById('detail-price').getAttribute('data-value')); // giá gốc
        const image = document.getElementById('detail-image').src;
        const descriptionHTML = document.getElementById('detail-description').innerHTML;
        const quantity = parseInt(document.getElementById('quantity').value);
        const date = new Date().toLocaleDateString('vi-VN');

        // Chuyển mô tả từ <li> sang chuỗi
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = descriptionHTML;
        const items = Array.from(tempDiv.querySelectorAll('li')).map(li => li.textContent);
        const description = items.join('||');

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

    // Đặt ngay (giả lập)
    document.getElementById('book-now').addEventListener('click', function () {
        alert('Đặt tour thành công!');
    });
});
