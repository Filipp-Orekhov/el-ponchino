import Cart from "./Cart.js";
const productId = localStorage.getItem('selectedProductId');




fetch('./data/data.json')
    .then(response => response.json())
    .then(data => {
        const productData = data.find(product => product.id === productId);

        const cart = new Cart(productData);

        if (productData) {
            document.querySelector('.routing_card_url').textContent = productData.name;
            document.querySelector('.card_h2').textContent = productData.name;
            document.getElementById('productImage').src = productData.img;
            document.getElementById('productImage').alt = productData.name;
            document.getElementById('productPrice').textContent = `${productData.price} ₽`;
            document.getElementById('productKcal').textContent = productData.kcal;
            document.getElementById('productProteins').textContent = productData.proteins;
            document.getElementById('productFats').textContent = productData.fats;
            document.getElementById('productCarbohydrates').textContent = productData.carbohydrates;
            document.getElementById('productDescription').textContent = productData.description;
            document.getElementById('productComposition').textContent = productData.composition;

            const productName = document.querySelectorAll('[data-id="product"]');
            productName.forEach((el) => (el.innerHTML = productData.name));

            let countProductInCart = 0;
            const cartBtn = document.querySelector('.card_btn_cart');

            cartBtn.addEventListener('click', () => {
                countProductInCart += 1;

                const countControls = document.createElement('div');
                cartBtn.replaceWith(countControls);
                countControls.classList.add('count_controls');
                countControls.innerHTML = `
            <div class="count_controls">
                <button class="btn-reset cart_count_change_btns minus_button">-</button>
                <span class="cart_number">${countProductInCart}</span>
                <button class="btn-reset cart_count_change_btns plus_button">+</button>
            </div>`;

                const minusBtn = countControls.querySelector('.minus_button');
                const plusBtn = countControls.querySelector('.plus_button');
                const countProductRender = countControls.querySelector('.cart_number');

                minusBtn.addEventListener('click', () => {
                    if (countProductInCart > 1) {
                        countProductInCart -= 1;
                        countProductRender.textContent = countProductInCart;
                        cart.updateCount(productId, countProductInCart);
                    } else if (countProductInCart <= 1) {
                        countProductInCart -= 1;
                        countControls.replaceWith(cartBtn);
                        cart.removeItem(productId);
                    }
                });

                minusBtn.addEventListener('mousedown', () => {
                    minusBtn.classList.add('cart_count_change_btns_active');
                });

                minusBtn.addEventListener('mouseup', () => {
                    minusBtn.classList.remove('cart_count_change_btns_active');
                });

                plusBtn.addEventListener('mousedown', () => {
                    plusBtn.classList.add('cart_count_change_btns_active');
                });

                plusBtn.addEventListener('mouseup', () => {
                    plusBtn.classList.remove('cart_count_change_btns_active');
                });

                plusBtn.addEventListener('click', () => {
                    countProductInCart += 1;
                    countProductRender.textContent = countProductInCart;
                    cart.updateCount(productId, countProductInCart);
                });

                cart.addItem(productId, countProductInCart);
            });
        } else {
            window.location.href = 'menu.html';
        }
    });



