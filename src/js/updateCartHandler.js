const cartItemsList = document.getElementById('cartItemsList'); // Список товаров в корзине
const totalPriceElem = document.getElementById('totalPrice'); // Элемент для отображения общей стоимости
const cartLabel = document.querySelector('.header_login-cart_styles'); //корзина

let cartList = []; // список товаров в корзиней

// Функция для обновления содержимого корзины
export function updateCartPopup(cartList) {
  cartItemsList.innerHTML = ''; // очищаем текущий список товаров

  let totalPrice = 0; // общая стоимость корзины
  let counter = parseInt(cartLabel.getAttribute('data-before'), 10); // счетчик на корзине

  // Перебираем все товары в корзине и добавляем их
  cartList.forEach(item => {        
      if (item.amount) 
          {   
      const li = document.createElement('li');
      li.classList.add('cart-item');

      // Создаем контейнер для наложения всех изображений
      const imageContainer = document.createElement('div');
      imageContainer.style.position = 'relative'; // Позиционирование контейнера
      imageContainer.style.width = '50px'; // ширина контейнера
      imageContainer.style.height = '50px'; // высота контейнера
      imageContainer.style.display = 'inline-block'; // чтобы изображения располагались рядом

      // Создаем элементы для всех слоев товара
      item.imageLayers.forEach((imagePath, index) => {
          const itemImage = document.createElement('img');
          itemImage.src = imagePath; // добавляем изображение товара
          itemImage.style.position = 'absolute'; // Абсолютное позиционирование для наложения
          itemImage.style.top = 0;
          itemImage.style.left = 0;
          itemImage.style.width = '30px'; // размер изображения
          itemImage.style.height = '30px';
          itemImage.style.objectFit = 'contain';
          itemImage.style.zIndex = index; // Устанавливаем z-index для слоев (чтобы порядок был правильным)

          imageContainer.appendChild(itemImage); // Добавляем изображение в контейнер
      });

      li.appendChild(imageContainer); // Добавляем контейнер с изображениями в список

      const itemDetails = document.createElement('div');
      itemDetails.classList.add('cart-item-details');

      const itemName = document.createElement('p');
      itemName.textContent = item.name;

      const itemDescription = document.createElement('p');
      itemDescription.textContent = `Описание: ${item.description}`;

      const itemPrice = document.createElement('p');
      itemPrice.textContent = `Цена: ${item.price} руб.`;

      itemDetails.appendChild(itemName);
      itemDetails.appendChild(itemDescription);
      itemDetails.appendChild(itemPrice);

      const amountContainer = document.createElement('div');
      amountContainer.classList.add('cart-item-amount');

      const decrementBtn = document.createElement('button');
      decrementBtn.textContent = '-';
      decrementBtn.addEventListener('click', () => changeAmount(item, -1, counter));

      const amountInput = document.createElement('input');
      amountInput.value = item.amount;
      amountInput.disabled = true;

      const incrementBtn = document.createElement('button');
      incrementBtn.textContent = '+';
      incrementBtn.addEventListener('click', () => changeAmount(item, 1, counter));

      amountContainer.appendChild(decrementBtn);
      amountContainer.appendChild(amountInput);
      amountContainer.appendChild(incrementBtn);

      li.appendChild(itemDetails);
      li.appendChild(amountContainer);

      cartItemsList.appendChild(li);
      }
      totalPrice += item.price; // считаем общую стоимость корзины
  });

  // Обновляем общую стоимость
  totalPriceElem.textContent = `${totalPrice} руб.`;
}

// Функция для изменения количества товара
function changeAmount(item, delta, counter) {
  const newAmount = item.amount + delta;
  if (newAmount < 0) return; // нельзя уменьшить до -1
  if (newAmount == 0) {
      item.amount = 0;
      item.price = 0;
  }
  else {
    const priceOne =  parseInt(item.price / item.amount, 10); // получаем стоимость одного товара    
    item.amount = newAmount;
    item.price = item.amount * priceOne; // обновляем цену в зависимости от количества
  }
  cartList = cartList.filter((item) => item.amount>0);
  console.log('cartList',cartList);
  sessionStorage.removeItem(cartList);
  sessionStorage.setItem("cartList", JSON.stringify(cartList)); // перезаписываем storage
  cartLabel.setAttribute('data-before', (counter + delta));
  updateCartPopup(cartList); // обновляем корзину после изменения
}

function clearStore() {
  allert('Ваш заказ успешно оформлен');
  sessionStorage.clear()
} 