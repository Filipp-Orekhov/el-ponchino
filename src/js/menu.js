const mainGrid = document.querySelector('.grid-card')
const boxes = document.querySelector('#boxes')
const donuts = document.querySelector('#donuts')
const searchField = document.querySelector('.search')
const btnSearch = document.querySelector('.btn-search')
const btnBack = document.querySelector('.btn-back')
const cartLabel = document.querySelector('.header_login-cart_styles'); //корзина
let counter = 0; // счетчик нажатий кнопки "В корзину"

const store = [
  {
    id:'11',
    img: '../../images/boxes/Xmas_box1.png',
    name: 'Новогодний набор 1',
    description:'воздушное тесто, фруктовая начинка, разноцветная глазурь, посыпка конфети',
    price: 1700
  },

  {
    id:'12',
    img:  '../../images/boxes/Xmas_box2.png',
    name: 'Новогодний набор 2',
    description:'воздушное тесто, карамельная начинка, разноцветная глазурь, посыпка снег',
    price: 1700
  },

  {
    id:'13',
    img:  '../../images/boxes/box2.png',
    name: 'Фруктовый микс',
    description:'воздушное тесто, фруктовая начинка, разноцветная глазурь, посыпка кокос',
    price: 1700
  },

  {
    id:'14',
    img:  '../../images/boxes/box1.png',
    name: 'Шоколадный набор 1',
    description:'воздушное тесто,  карамельная и фруктовая начинка, глаузурь  - молочный и белый шоколад, посыпка орех',
    price: 1700
  },

  {
    id:'15',
    img:  '../../images/boxes/box3.png',
    name: 'Шоколадный набор 2',
    description:'воздушное тесто, карамельная и шоколадная начинка, глаузурь  - молочный и темный шоколад, посыпка орех',
    price: 1700
  },

  {
    id:'21',
    img:  '../../images/menu_donuts/xmas1.png',
    name: 'Елочка',
    description:'воздушное тесто, карамельная начинка,разноцветная глазурь',
    price: 189
  },
  {
    id:'22',
    img:  '../../images/menu_donuts/zmas2.png',
    name: 'Еловый шар',
    description:'воздушное тесто, карамельная начинка,  разноцветная глазурь',
    price: 189
  },
  {
    id:'23',
    img:  '../../images/menu_donuts/orange_donut.png',
    name: 'Апельсиновый',
    description:'воздушное тесто, карамельная начинка, апельсиновая глазурь, посыпка конфети',
    price: 189
  },
  {
    id:'24',
    img:  '../../images/menu_donuts/nuts.png',
    name: 'Молочный шоколад',
    description:'воздушное тесто, карамельная начинка, глазурь молочный шоколад, посыпка орех',
    price: 189
  },
  {
    id:'25',
    img:  '../../images/menu_donuts/Strawberry_nuts.png',
    name: 'Клубничный',
    description:'воздушное тесто, клубничная начинка, клубничная глазурь, посыпка орех',
    price: 189
  },
  {
    id:'26',
    img:  '../../images/menu_donuts/lemon.png',
    name: 'Лимон',
    description:'воздушное тесто, лимонная начинка, лимонная глазурь, посыпка конфети',
    price: 189
  },
  {
    id:'27',
    img:  '../../images/menu_donuts/caramel_cho.png',
    name: 'Карамельный',
    description:'воздушное тесто, карамельная начинка, карамельная глазурь, посыпка шоколадная крошка',
    price: 189
  },
  {
    id:'28',
    img:  '../../images/menu_donuts/cho_cho.png',
    name: 'Темный шоколад',
    description:'воздушное тесто, шоколадная начинка, шоколадная глазурь, посыпка конфетти',
    price: 189
  },
  {
    id:'31',
    img:  '../../images/menu_donuts/nutscho.png', 
    name: 'Карамельно-шоколадный',
    description:'воздушное тесто, карамельная начинка, шоколадная глазурь, посыпка шоколадная крошка',
    price: 189
  },
  {
    id:'32',
    img:  '../../images/menu_donuts/Strawberry_choc.png',
    name: 'Вишневый',
    description:'воздушное тесто, вишневая начинка, вишневая глазурь, посыпка шоколадная крошка',
    price: 189
  },
  {
    id:'33',
    img:  '../../images/menu_donuts/white_coconut.png',
    name: 'Белый шоколад',
    description:'воздушное тесто, карамельная начинка, глазурь белый шоколад, посыпка кокос',
    price: 189
  },
  {
    id:'34',
    img:  '../../images/menu_donuts/choco.png',
    name: 'Брауни',
    description:'воздушное тесто, шоколадная начинка, шоколадная глазурь, посыпка конфети',
    price: 189
  },
  {
    id:'35',
    img:  '../../images/menu_donuts/strawberry.png',
    name: 'Малиновый',
    description:'воздушное тесто, малиновая начинка, малиновая глазурь, посыпка кокос',
    price: 189
  },
  {
    id:'36',
    img:  '../../images/menu_donuts/vanil.png',
    name: 'Жемчужный светлый',
    description:'воздушное тесто, шоколадная начинка, шоколадная глазурь, посыпка жемчужины',
    price: 189
  },
  {
    id:'37',
    img:  '../../images/menu_donuts/cho_sphere.png',
    name: 'Жемчужный темный',
    description:'воздушное тесто, шоколадная начинка, шоколадная глазурь, посыпка жемчужины',
    price: 189
  },
  {
    id:'38',
    img:  '../../images/menu_donuts/white.png',
    name: 'Конфети',
    description:'воздушное тесто, шоколадная начинка, глазурь белый шоколад, посыпка конфетти',
    price: 189
  },
]

let cart = []

class Card {
  constructor(id,img, name, description, price) {
    this.id = id,
    this.img = img,
    this.name = name,
    this.description = description,
    this.price = price
  }

  addToCard(id, name, price, amount=1) {
    console.log('price',price);
    let donutInCart = false; 
    cart.forEach((item) => {
      //ищем в корзине такой пончик, если есть, увеличиваем стоимость и количество
      if (item.id === id) {
          item.price += price;
          item.amount++;
          console.log('+ donut', cart)
          donutInCart = true;
      }
    })  
    if (!donutInCart) {
        cart.push({
        id,
        name,
        price,
        amount
      })
    }
  
    console.log('cart', cart);
    sessionStorage.setItem("cart", JSON.stringify(cart));

    // Проверка: получение массива из localStorage
    const savedcart = JSON.parse(sessionStorage.getItem("cart"));
    console.log('savedcart',savedcart);
  }

  render() {
    const mainWrapper = document.createElement('div');
    mainWrapper.classList.add('card');
    mainWrapper.setAttribute('data-url', 'card.html');
    
    const HTML = `                       
      <img class="card_img" src="${this.img}" alt="${this.name}">         
      <div class="card_info">             
        <h2 class="card_name">${this.name}</h2>             
        <p>${this.description}</p>               
      </div>         
      <div class="card_control"> 
        <span class="price-span">${this.price} ₽</span>             
        <button data-price="${this.price}" id="${this.id}" class="btn">
          <img class="cart-img" src="../../images/shoping_cart.svg">
        </button>                   
      </div> 
    `     
    mainWrapper.innerHTML = HTML
    mainGrid.append(mainWrapper)

    const btn = mainWrapper.querySelector('.btn')
    const add = mainWrapper.querySelector('.add')
    console.log(add)
    
    // добавляем пончик в корзину
    btn.addEventListener('click', (e) => {
      console.log('event', e.target.dataset)
      e.stopPropagation();
      this.addToCard(this.id, this.name, this.price)

    // делаем счетчик товаров в корзине видимым и увеличиваем его
    cartLabel.classList.remove('hidden'); 
    cartLabel.setAttribute('data-before', ++counter);
    console.log('cartlabel',cartLabel);
    })
    
    // переход на страницу карточки товара
    mainWrapper.addEventListener('click', (e) => {
      console.log('redirection func')
      if (e.target.classList.contains('btn')) {
         // добавляем пончик в корзину
          e.stopPropagation();
          return;
        /*  this.addToCard(this.id, this.name, this.price)

          // делаем счетчик товаров в корзине видимым и увеличиваем его
         cartLabel.classList.remove('hidden'); 
         cartLabel.setAttribute('data-before', ++counter);
         console.log('cartlabel',cartLabel);*/
      }
        const url = mainWrapper.getAttribute('data-url');
        if (url) {
            window.location.href = url; // Redirect to the URL
        }
    });
  }
}

const removeAll = () =>{
  while (mainGrid.children[0]) {
    mainGrid.replaceChildren()
  }
}

const renderAll = (text, store) =>{
  removeAll()
  const a = !text ? store: store.filter(el =>el.name.toLocaleLowerCase().includes(text) || el.description.toLocaleLowerCase().includes(text))
  a.filter(el => el.name.toLocaleLowerCase().includes(text) || el.description.toLocaleLowerCase().includes(text)).forEach((el)=>{
    new Card(el.id, el.img, el.name, el.description, el.price).render()
  })
  }

document.addEventListener('DOMContentLoaded', () =>{
  const boxes_store = store.slice(0,5);
  renderAll('', boxes_store)
  boxes.classList.add("selected-menu")
})

boxes.addEventListener('click', () =>{
  const boxes_store = store.slice(0,5);
  renderAll('', boxes_store);
  donuts.classList.remove("selected-menu");
  boxes.classList.add("selected-menu");
})

donuts.addEventListener('click', () => {
  const donuts_store = store.slice(5,);
  renderAll('', donuts_store);
  boxes.classList.remove("selected-menu");
  donuts.classList.add("selected-menu");  
})

let searchText = ''

searchField.addEventListener('input', (e)=>{
  searchText = e.target.value
})

btnSearch.addEventListener('click', (e)=>{
  renderAll(searchText, store)
})



/*    Class Product    */

class Product {

  constructor(id, name, price) {
    this.id = id,
    this.name = name,
    this.price = price
  } 
  
  render() {
    const cartWrapper = document.createElement('div')
    cartWrapper.classList.add('show')
    const HTML = 
      ` <div class="item_info">
        <h2 class="item-title">${this.name}</h2>             
        <span>${this.price}</span>        
        </div>  
        <div class="remove-wrapper">             
        <button id = ${this.id} class = "btn-del"> X </button>                     
        </div>        
      ` 
    cartWrapper.innerHTML = HTML
    cartList.append(cartWrapper) 
    
    const btnDel = cartWrapper.querySelector('.btn-del')
    
    btnDel.addEventListener('click', (e) => {
      const indexItem = cart.findIndex((el) => el.id == e.target.id)
      cart.splice(indexItem) 
      cartCount.textContent = cart.length 
      console.log(cart) 
      document.getElementById(e.target.id).parentNode.parentNode.remove()
      const btn = document.getElementById(e.target.id)
      const add = document.getElementById(e.target.id*10)
      btn.disabled = false
      add.classList.remove('show')    
    })   
  } 
}

const removeCart = () =>{
  while (cartList.children[0]) {
    cartList.replaceChildren()
  }
}
