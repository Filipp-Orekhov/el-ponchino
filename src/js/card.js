document.addEventListener('DOMContentLoaded', () => {

    const cartLabel = document.querySelector('.cart_digit');
    if (!cartLabel) {
        console.error('Элемент .cart_digit не найден в DOM!');
        return;
    }

    const productId = localStorage.getItem('selectProductId');
    let cartList = JSON.parse(localStorage.getItem("cartList")) || [];
    let productData = null;

    let counter = cartList.reduce((sum, item) => sum + item.amount, 0);

    function saveCart() {
        localStorage.setItem("cartList", JSON.stringify(cartList));
    }

    // Функция для обновления cartCount в localStorage
    function updateCartCount() {
        counter = cartList.reduce((sum, item) => sum + item.amount, 0);
        localStorage.setItem('cartCount', counter.toString());
        console.log(`Обновлено количество товаров в корзине: ${counter}`);
    }

    function updateCartLabel() {
        const cartCount = localStorage.getItem('cartCount') || '0';
        // Прямое обновление текста элемента
        if (parseInt(cartCount) > 0) {
            cartLabel.classList.remove('hidden');
            cartLabel.textContent = cartCount;  // Обновляем текст, а не атрибут
            console.log(`Метка корзины обновлена, новое количество товаров: ${cartCount}`);
        } else {
            cartLabel.classList.add('hidden');
            console.log('Метка корзины скрыта (количество равно 0).');
        }
    }

    // Функция для обработки нажатия кнопки добавления товара в корзину
    function handleCartButtonClick(btn) {
        if (!productData) {
            console.error("Данные о товаре не загружены");
            return;
        }

        const existingProduct = cartList.find(item => item.id === productId);

        if (existingProduct) {
            existingProduct.amount += 1;
            console.log(`Количество товара "${productData.name}" увеличено на 1.`);
        } else {
            cartList.push({
                id: productData.id,
                name: productData.name,
                description: productData.description,
                img: productData.img,
                price: productData.price,
                amount: 1
            });
            console.log(`Товар "${productData.name}" добавлен в корзину.`);
        }

        saveCart();
        updateCartCount();
        updateCartLabel();

        console.log('Корзина после добавления товара:', cartList);

        const countControls = document.createElement('div');
        btn.replaceWith(countControls);
        countControls.classList.add('count_controls');
        countControls.innerHTML = `
            <div class="count_controls">
                <button class="btn-reset cart_count_change_btns minus_button">-</button>
                <span class="cart_number">${existingProduct ? existingProduct.amount : 1}</span>
                <button class="btn-reset cart_count_change_btns plus_button">+</button>
            </div>`;

        const minusBtn = countControls.querySelector('.minus_button');
        const plusBtn = countControls.querySelector('.plus_button');
        const countProductRender = countControls.querySelector('.cart_number');

        minusBtn.addEventListener('click', () => {
            const cartItem = cartList.find(item => item.id === productId);
            if (cartItem.amount > 1) {
                cartItem.amount -= 1;
                countProductRender.textContent = cartItem.amount;
                console.log(`Количество товара "${productData.name}" уменьшено на 1.`);
            } else {
                cartList = cartList.filter(item => item.id !== productId);
                countControls.replaceWith(btn);
                console.log(`Товар "${productData.name}" удален из корзины.`);
            }
            saveCart();
            updateCartCount();
            updateCartLabel();
        });

        plusBtn.addEventListener('click', () => {
            const cartItem = cartList.find(item => item.id === productId);
            cartItem.amount += 1;
            countProductRender.textContent = cartItem.amount;
            console.log(`Количество товара "${productData.name}" увеличено на 1.`);
            saveCart();
            updateCartCount();
            updateCartLabel();
        });
    }

    fetch('./data/data.json')
        .then(response => response.json())
        .then(data => {
            productData = data.find(product => product.id === productId);

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

                const cartBtn = document.querySelector('.card_btn_cart');
                const cartBtnMobile = document.querySelector('.btn_media_cart_card');

                if (cartBtn) {
                    cartBtn.addEventListener('click', () => handleCartButtonClick(cartBtn));
                }

                if (cartBtnMobile) {
                    cartBtnMobile.addEventListener('click', () => handleCartButtonClick(cartBtnMobile));
                }


                updateCartLabel();
            } else {
                window.location.href = 'index1.html';
            }
        });

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