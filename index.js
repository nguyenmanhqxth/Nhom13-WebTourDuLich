document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle (nếu cần)
    const mobileMenuBtn = document.createElement('div');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    document.querySelector('.header .container').prepend(mobileMenuBtn);
    
    const navbar = document.querySelector('.navbar');
    
    mobileMenuBtn.addEventListener('click', function() {
        navbar.classList.toggle('active');
    });
    
    // Xử lý khi cuộn trang
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // Xử lý nút đặt tour
    const bookButtons = document.querySelectorAll('.book-btn');
    bookButtons.forEach(button => {
        button.addEventListener('click', function() {
            alert('Bạn cần đăng nhập để đặt tour!');
        });
    });
    
    // Xử lý tìm kiếm
    const searchBtn = document.querySelector('.search-btn');
    searchBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const searchInput = document.querySelector('.search-box input');
        searchInput.focus();
    });
    
    // Hiệu ứng khi di chuột vào card
    const cards = document.querySelectorAll('.tour-card, .category-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'transform 0.3s ease';
        });
    });
});
// Xử lý cho phần Why Choose Us
document.querySelectorAll('.reason-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
        this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
    });
});

// Xử lý cho các activity card
document.querySelectorAll('.activity-card').forEach(card => {
    card.addEventListener('click', function() {
        // Thêm hiệu ứng khi click vào activity
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
        
        // Có thể thêm xử lý mở modal hoặc chuyển trang tại đây
    });
});

// Xử lý nút khám phá
document.querySelector('.explore-btn').addEventListener('click', function() {
    alert('Bạn sẽ được chuyển đến trang khám phá các trải nghiệm!');
    // window.location.href = 'experiences.html';
});