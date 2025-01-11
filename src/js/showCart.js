const cartPopup = document.querySelector('.cart-popup'); // Элемент для всплывающего окна
const cartLabel = document.querySelector('.header_login-cart_styles'); // корзина

// Функция для показа корзины
function showCart() {
    cartPopup.classList.remove('hidden');
    cartPopup.style.display = 'block';
}

// Функция для скрытия корзины
function hideCart() {
    cartPopup.classList.add('hidden');
    cartPopup.style.display = 'none';
}

// Открытие корзины при наведении на иконку корзины
cartLabel.addEventListener('mouseover', showCart);

// Открытие корзины при клике на иконку корзины
cartLabel.addEventListener('click', (event) => {
    event.stopPropagation(); // предотвращаем распространение клика на документ
    showCart();
});

// Закрытие корзины, когда мышка покидает область корзины
cartPopup.addEventListener('mouseleave', hideCart);

// Также закрыть корзину, если пользователь уходит с кнопки корзины
// cartLabel.addEventListener('mouseleave', hideCart);

// Предотвращаем закрытие при наведении на корзину, если она уже открыта
cartPopup.addEventListener('mouseover', (event) => {
    event.stopPropagation(); // предотвращаем скрытие корзины при наведении на нее
});
