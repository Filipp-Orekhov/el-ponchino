const btnInCart = document.querySelector('.incart'); // добавить в корзину
const cartLabel = document.querySelector('.header_login-cart_styles'); //корзина
const chkboxTopping = document.querySelectorAll('.optiontop'); // чекбокс топпинг

let counter = 0; // счетчик нажатий кнопки "В корзину"

let cartList  = []; // список пончиков в корзине, изначально пустой

btnInCart.addEventListener('click', () => {

    const fillGlazebtn = document.querySelectorAll('.selected');
    const totalPrice = document.querySelector('.totalprice');

    // начальный пончик
    let cartItem = {
        name: "Пончик-конструктор",
        description: "",
        amount: 0,
        price: 0,
    };

    let txt  = ''; // переменная, в которую будем записывать текст начинки, глазури и топпинга

    let donutInCart = false;
              
    // делаем счетчик товаров в корзине видимым и увеличиваем его
    cartLabel.classList.remove('hidden'); 
    cartLabel.setAttribute('data-before', ++counter);
        
    // добавляем описание начинка/глазурь/ в переменную txt
    fillGlazebtn.forEach((btn) => {
        const spanChild = Array.from(btn.children).find(child => child.classList.contains('sort'));
        txt += spanChild.textContent + '/'; 
    });

    // добавляем описание топпинга в txt
    chkboxTopping.forEach((inp) => {
        if (inp.checked) {
            const labelTopping = document.querySelector(`label[for="${inp.id}"]`);
            txt += labelTopping.textContent + ',';
        }
    }); 
    
    // ищем в корзине пончик с записанным в txt описанием; если есть, увеличиваем стоимость и количество 
    cartList.forEach((item) => {
        console.log('описание пончика, который уже в корзине', item.description);
        if (item.description === txt) {
            item.price += parseInt(totalPrice.textContent.replace(/\D/g, ''), 10);
            item.amount++;
            donutInCart = true;
            console.log('multiply donut', cartList)
        }
    })

    // если нет, добавляем пончик в корзину
    if (!donutInCart) {
        cartItem.description = txt;
        cartItem.amount = 1;
        cartItem.price  = parseInt(totalPrice.textContent.replace(/\D/g, ''), 10);
        cartList.push(cartItem);
        console.log('add donut', cartList);
    }

    console.log('Теперь в корзине', cartList);
})