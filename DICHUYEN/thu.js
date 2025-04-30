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

//////
    const modal = document.getElementById("tourModal");
    const closeBtn = document.querySelector(".close");
  
    document.querySelectorAll(".tour-card").forEach(card => {
      card.addEventListener("click", function (e) {
        // Nếu click vào nút mua thì không mở modal
        if (e.target.classList.contains("add-to-cart-btn")) return;
  
        const image = card.querySelector("img").src;
        const info = card.querySelector(".tour-info");
        const title = info.querySelector(".tour-title").textContent;
        const price = info.querySelector(".tour-price").textContent;
        const rating = info.querySelector(".star").innerHTML;
        const tags = [...info.querySelectorAll(".tag")].map(tag => tag.textContent);
  
        document.getElementById("modal-image").src = image;
        document.getElementById("modal-title").textContent = title;
        document.getElementById("modal-price").textContent = price;
        document.getElementById("modal-rating").innerHTML = rating;
        document.getElementById("modal-quantity").value = 1;
  
        const list = document.getElementById("modal-description-list");
        list.innerHTML = "";
        tags.forEach(tag => {
          const li = document.createElement("li");
          li.textContent = tag;
          list.appendChild(li);
        });
  
        modal.style.display = "block";

        const list2 = document.getElementById("modal-description-list");
        list.innerHTML = "";
        tags.forEach(tag => {
            const li = document.createElement("li");
            li.textContent = tag;
            list.appendChild(li);
        });
      });
    });
  
    closeBtn.onclick = () => (modal.style.display = "none");
    window.onclick = (e) => {
      if (e.target == modal) modal.style.display = "none";
    };
  
    document.getElementById("add-to-cart-modal").addEventListener("click", () => {
      alert("Đã thêm vào giỏ hàng!");
    });
  
    document.getElementById("book-now-modal").addEventListener("click", () => {
      alert("Chuyển đến trang đặt hàng!");
    });


});

console.log("Image path:", productImage);
