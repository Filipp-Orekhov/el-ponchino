    const headerNavLinks = document.querySelectorAll('.link_style');



    const handleClickHeaderNavLinks = (event) => {
        event.preventDefault();
        event.target.classList.add('link_style_clicked');
    };

    const handleMouseIn = (event) => {
        event.target.classList.add('link_style_hovered');
    };

    const handleMouseOut = (event) => {
        event.target.classList.remove('link_style_hovered');
    };

    headerNavLinks.forEach((headerLink) => {
        headerLink.addEventListener('mouseover', handleMouseIn);
        headerLink.addEventListener('mouseout', handleMouseOut);
        headerLink.addEventListener('click', handleClickHeaderNavLinks);
    });

    const headerCart = document.querySelector('.header_login-cart_styles.header_cart');
    const headerLogin = document.querySelector('.header_login-cart_styles.header_login');

    const handleClickHeaderIcons = (event) => {
        event.preventDefault();
        event.currentTarget.classList.add('header_login-cart_styles_clicked');
    };

    if (headerCart) {
        headerCart.addEventListener('click', handleClickHeaderIcons);
    }

    if (headerLogin) {
        headerLogin.addEventListener('click', handleClickHeaderIcons);
    }

    const cartDigit = document.querySelector('.cart_digit');
    const cartCount = localStorage.getItem('cartCount' );
    const cartHeaderCounter = document.querySelector('[data-id="cart_header_counter_wrapper"]');
    if (cartCount) {
        cartHeaderCounter.classList.remove('hidden');
        cartDigit.textContent = cartCount;
    }

    const cartLabel = document.querySelector('.header_login-cart_styles');
    const cartPopup = document.querySelector('.cart-popup');
    let cartList = JSON.parse(localStorage.getItem('cartList')) || [];
    let counter = 0;

    function renderCart() {
        const cartItemsList = cartPopup.querySelector('.cart-items');
        cartItemsList.innerHTML = '';
        let totalPrice = 0; // общая стоимость корзины

        // Перебираем все товары в корзине и добавляем их
        cartList.forEach(item => {
            const li = document.createElement('li');
            li.classList.add('cart-item');

            // Создаем контейнер для изображения
            const imageContainer = document.createElement('div');
            imageContainer.style.position = 'relative'; // Позиционирование контейнера
            imageContainer.style.width = '50px'; // ширина контейнера
            imageContainer.style.height = '50px'; // высота контейнера
            imageContainer.style.display = 'inline-block'; // чтобы изображения располагались рядом

            // Если есть imageLayers, показываем их, если нет, показываем обычное изображение
            if (item.imageLayers && item.imageLayers.length > 0) {
                item.imageLayers.forEach((imagePath, index) => {
                    const itemImage = document.createElement('img');
                    itemImage.src = imagePath; // добавляем изображение товара
                    itemImage.style.position = 'absolute'; // Абсолютное позиционирование для наложения
                    itemImage.style.top = 0;
                    itemImage.style.left = 0;
                    itemImage.style.width = '50px'; // размер изображения
                    itemImage.style.height = '50px';
                    itemImage.style.objectFit = 'contain';
                    itemImage.style.zIndex = index; // Устанавливаем z-index для слоев (чтобы порядок был правильным)

                    imageContainer.appendChild(itemImage); // Добавляем изображение в контейнер
                });
            } else {
                // Если imageLayers нет, просто показываем одно изображение товара
                const itemImage = document.createElement('img');
                itemImage.src = item.img; // Берем изображение из товара
                itemImage.style.width = '50px';
                itemImage.style.height = '50px';
                itemImage.style.objectFit = 'contain';
                imageContainer.appendChild(itemImage); // Добавляем изображение товара
            }

            li.appendChild(imageContainer); // Добавляем контейнер с изображениями в список

            const itemDetails = document.createElement('div');
            itemDetails.classList.add('cart-item-details');

            const itemName = document.createElement('p');
            itemName.textContent = item.name;

            const itemDescription = document.createElement('p');
            itemDescription.textContent = `Описание: ${item.description}`;
            itemDescription.style.fontSize = '12px';

            const itemPrice = document.createElement('p');
            itemPrice.textContent = `Цена: ${item.price} руб.`;

            itemDetails.appendChild(itemName);
            itemDetails.appendChild(itemDescription);
            itemDetails.appendChild(itemPrice);

            const amountContainer = document.createElement('div');
            amountContainer.classList.add('cart-item-amount');

            const decrementBtn = document.createElement('button');
            decrementBtn.textContent = '-';
            decrementBtn.addEventListener('click', () => changeAmount(item, -1)); // Функция изменения количества

            const amountInput = document.createElement('input');
            amountInput.value = item.amount;
            amountInput.disabled = true; // Невозможно редактировать вручную

            const incrementBtn = document.createElement('button');
            incrementBtn.textContent = '+';
            incrementBtn.addEventListener('click', () => changeAmount(item, 1)); // Функция изменения количества

            amountContainer.appendChild(decrementBtn);
            amountContainer.appendChild(amountInput);
            amountContainer.appendChild(incrementBtn);

            li.appendChild(itemDetails);
            li.appendChild(amountContainer);

            cartItemsList.appendChild(li);

            totalPrice += item.price; // считаем общую стоимость корзины
            console.log(totalPrice);
        });

        document.addEventListener('DOMContentLoaded', () => {
            const storedCartList = localStorage.getItem('cartList');
            if (storedCartList) {
                try {
                    cartList = JSON.parse(storedCartList);
                    counter = parseInt(localStorage.getItem('cartCount'), 10) || 0;

                    // Если cartList пустой, инициализируем его как пустой массив
                    if (!Array.isArray(cartList)) {
                        cartList = [];
                    }

                    if (counter > 0) {
                        cartLabel.classList.remove('hidden');
                        cartLabel.setAttribute('data-before', counter);
                    } else {
                        cartLabel.classList.add('hidden');
                    }

                    updateCartPopup(); // Обновляем корзину
                } catch (error) {
                    console.error('Ошибка при загрузке корзины из localStorage:', error);
                    cartList = []; // Если произошла ошибка, инициализируем корзину как пустой массив
                }
            }
        });


        function changeAmount(item, delta) {
            const newAmount = item.amount + delta;
            if (newAmount < 0) return; // нельзя уменьшить до 0

            if (newAmount === 0) {
                console.log('amount 0');
                cartList = cartList.filter(cartItem => cartItem !== item);
            } else {
                const pricePerItem = parseInt(item.price / item.amount, 10);
                item.amount = newAmount;
                item.price = item.amount * pricePerItem; // обновляем цену в зависимости от количества
            }
            if (delta>0) {counter++} else {counter--}

            renderCart(); // обновляем корзину после изменения
            localStorage.setItem('cartCounter', counter);

            // Сохраняем изменения в localStorage
            localStorage.setItem('cartList', JSON.stringify(cartList));
            localStorage.setItem('cartCount', counter.toString());
        }

        function showCart() {
        cartPopup.classList.remove('hidden');
        cartPopup.style.display = 'block';
    }

    function hideCart() {
        cartPopup.classList.add('hidden');
        cartPopup.style.display = 'none';
    }

    cartLabel.addEventListener('mouseover', showCart);

    cartLabel.addEventListener('click', (event) => {
        event.stopPropagation();
        showCart();
    });

    cartPopup.addEventListener('mouseleave', hideCart);

    // cartLabel.addEventListener('mouseleave', hideCart);

    cartPopup.addEventListener('mouseover', (event) => {
        event.stopPropagation();
    });

    }

    document.addEventListener('DOMContentLoaded', () => {
        renderCart();
    });
