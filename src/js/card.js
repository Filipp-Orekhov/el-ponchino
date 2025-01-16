import Cart from "./Cart.js";
const productId = localStorage.getItem('selectProductId');

fetch('./data/data.json')
    .then(response => response.json())
    .then(data => {
        const productData = data.find(product => product.id === productId);

        const cart = new Cart(productData);

        if (productData) {
            document.querySelector('.routing_card_url').textContent = productData.name;
            document.querySelector('.card_h2').textContent = productData.name;
            document.querySelector('.productImage').src = productData.img;
            document.querySelector('.productImage').alt = productData.name;
            document.querySelector('.productPrice').textContent = `${productData.price} ₽`;
            document.querySelector('.productKcal').textContent = productData.kcal;
            document.querySelector('.productProteins').textContent = productData.proteins;
            document.querySelector('.productFats').textContent = productData.fats;
            document.querySelector('.productCarbohydrates').textContent = productData.carbohydrates;
            document.querySelector('.productDescription').textContent = productData.description;
            document.querySelector('.productComposition').textContent = productData.composition;

            const productName = document.querySelectorAll('[data-id="product"]');
            productName.forEach((el) => (el.innerHTML = productData.name));

            let countProductInCart = 0;
            const cartBtn = document.querySelector('.card_btn_cart');
            const cartBtnMobile = document.querySelector('.btn_media_cart_card');

            function handleCartButtonClick (btn) {
                countProductInCart += 1;

                const countControls = document.createElement('div');
                btn.replaceWith(countControls);
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
                        countControls.replaceWith(btn);
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

            }

            if (cartBtn) {
                cartBtn.addEventListener('click',() => handleCartButtonClick(cartBtn));
            }

            if (cartBtnMobile) {
                cartBtnMobile.addEventListener('click', () => handleCartButtonClick(cartBtnMobile));
            }
        } else {
            window.location.href = 'index1.html';
        }

        const energyBtnMedia = document.querySelector('.energy_btn_media');
        const energyValueWrapperMedia = document.createElement('div');
        energyBtnMedia.addEventListener('click', () => {
            energyBtnMedia.replaceWith(energyValueWrapperMedia);
            energyValueWrapperMedia.classList.add('media_card_container_energy');
            energyValueWrapperMedia.innerHTML = `
                <div class="media_card_return">
                    <span class="btn ">КБЖУ на 1 порцию</span> 
                    <button class="btn-reset hide_energy_media">
                        <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.71114 7.157L13.3681 1.5L11.9541 0.0859985L7.00414 5.036L2.05414 0.0859985L0.640137 1.5L6.29714 7.157C6.48467 7.34447 6.73897 7.44979 7.00414 7.44979C7.2693 7.44979 7.52361 7.34447 7.71114 7.157Z" fill="#6F6F6F"/>
                        </svg>
                    </button>
                </div>
                <div class="energy_value_wrapper_media">
                      <div class="kcal_wrapper energy_wrappers">
                          <span class="energy_spans">Ккал</span>
                          <div class="numbers_wrappers_energy">
                              <span class="kcal_count productKcal">${productData.kcal}</span>
                          </div>
                      </div>
                      <div class="proteins_wrapper energy_wrappers">
                          <span class="energy_spans">Белки</span>
                          <div class="numbers_wrappers_energy">
                              <span class="kcal_count productProteins">${productData.proteins}</span>
                          </div>
                      </div>
                      <div class="fats_wrapper energy_wrappers">
                          <span class="energy_spans">Жиры</span>
                          <div class="numbers_wrappers_energy">
                              <span class="kcal_count productFats">${productData.fats}</span>
                          </div>
                      </div>
                      <div class="carbohydrates_wrapper energy_wrappers">
                          <span class="energy_spans">Углеводы</span>
                          <div class="numbers_wrappers_energy">
                              <span class="kcal_count productCarbohydrates">${productData.carbohydrates}</span>
                          </div>
                      </div>
                </div>
            `;
            const hideEnergyMedia = energyValueWrapperMedia.querySelector('.hide_energy_media');

            hideEnergyMedia.addEventListener('click', () => {
                energyValueWrapperMedia.replaceWith(energyBtnMedia);
            })
        })
    });



