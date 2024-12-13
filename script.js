let scrollContainerFill = document.querySelector('#filling-buttons');
let scrollContainerGlaze = document.querySelector('#glaze-buttons');
let scrollBtn = document.querySelectorAll('.scroll-btn');

scrollContainerFill.addEventListener('wheel', (e) =>{
    e.preventDefault();
    scrollContainerFill.scrollLeft += e.deltaY;    
})

scrollContainerGlaze.addEventListener('wheel', (e) =>{
    e.preventDefault();
    scrollContainerGlaze.scrollLeft += e.deltaY;    
})

scrollBtn.forEach(button => {
    button.addEventListener('click', (e) =>{
        if (e.target.id === 'nextBtnFill') {
            scrollContainerFill.classList.add('scroll-smooth')
            scrollContainerFill.scrollLeft += 565; 
            button.classList.add("inactive") 
            const btn = Array.from(scrollBtn).find((b) => b.id==='backBtnFill')
            btn.classList.remove('inactive')      
        }
        if (e.target.id === "backBtnFill") {
            scrollContainerFill.classList.add('scroll-smooth')
            scrollContainerFill.scrollLeft -= 565; 
            button.classList.add("inactive") 
            const btn = Array.from(scrollBtn).find((b) => b.id==='nextBtnFill')
            btn.classList.remove('inactive')                 
        } 
        if (e.target.id === 'nextBtnGlaze') {
            scrollContainerGlaze.classList.add('scroll-smooth')
            scrollContainerGlaze.scrollLeft += 565; 
            button.classList.add("inactive") 
            const btn = Array.from(scrollBtn).find((b) => b.id==='backBtnGlaze')
            btn.classList.remove('inactive')                
           }
        if (e.target.id === "backBtnGlaze") {
            scrollContainerGlaze.classList.add('scroll-smooth')
            scrollContainerGlaze.scrollLeft -= 565; 
            button.classList.add("inactive") 
            const btn = Array.from(scrollBtn).find((b) => b.id==='nextBtnGlaze')
            btn.classList.remove('inactive')                
        }          
    })
})
document.addEventListener('DOMContentLoaded', () => {
    let basePrice = 120; // Базовая цена
    let baseCalories = 210; // Калории для основы
    let baseProteins = 3;
    let baseFats = 8;
    let baseCarbs = 30;

    // Начальная начинка (по умолчанию шоколадная)
    let filling = {
        image: "choco.png",
        price: 45,
        calories: 80,
        proteins: 1,
        fats: 5,
        carbs: 9
    };

    // Начальная глазурь
    let glaze = null;

    // Массив для топпингов
    let toppings = [];
    let toppingZIndex = 3; // Начальный z-index для топпингов

    // Обновляем итоговую информацию о пончике
    function updateSummary() {
        let totalPrice = basePrice + filling.price + (glaze ? glaze.price : 0) + toppings.reduce((acc, topping) => acc + topping.price, 0);
        let totalCalories = baseCalories + filling.calories + (glaze ? glaze.calories : 0) + toppings.reduce((acc, topping) => acc + topping.calories, 0);
        let totalProteins = baseProteins + filling.proteins + (glaze ? glaze.proteins : 0) + toppings.reduce((acc, topping) => acc + topping.proteins, 0);
        let totalFats = baseFats + filling.fats + (glaze ? glaze.fats : 0) + toppings.reduce((acc, topping) => acc + topping.fats, 0);
        let totalCarbs = baseCarbs + filling.carbs + (glaze ? glaze.carbs : 0) + toppings.reduce((acc, topping) => acc + topping.carbs, 0);

        // Обновляем значения на странице
        document.getElementById('calories').textContent = totalCalories;
        document.getElementById('proteins').textContent = totalProteins;
        document.getElementById('fats').textContent = totalFats;
        document.getElementById('carbs').textContent = totalCarbs;

        // Обновляем итоговую стоимость
        document.getElementById('total-price').textContent = `${totalPrice}₽`;
    }

    // Выбор начинки
    const fillingButtons = document.querySelectorAll('.option[data-type="filling"]');
    fillingButtons.forEach(button => {
        button.addEventListener('click', () => {
            fillingButtons.forEach(b => b.classList.remove('selected'));
            button.classList.add('selected');
            const data = button.dataset;
            filling = {
                image: data.image,
                price: parseInt(data.price),
                calories: parseInt(data.calories),
                proteins: parseFloat(data.proteins),
                fats: parseFloat(data.fats),
                carbs: parseFloat(data.carbs)
            };
            document.getElementById('filling-layer').src = `images/filling/${filling.image}`;
            updateSummary();
        });
    });

    // По умолчанию выбираем шоколадную начинку
    document.querySelector('.option.selected').click();

    // Выбор глазури
    const glazeButtons = document.querySelectorAll('.option[data-type="glaze"]');
    glazeButtons.forEach(button => {
        button.addEventListener('click', () => {
            glazeButtons.forEach(b => b.classList.remove('selected'));
            button.classList.add('selected');
            const data = button.dataset;
            glaze = {
                image: data.image,
                price: parseInt(data.price),
                calories: parseInt(data.calories),
                proteins: parseFloat(data.proteins),
                fats: parseFloat(data.fats),
                carbs: parseFloat(data.carbs)
            };

            // Добавляем глазурь только если она выбрана
            let glazeLayer = document.getElementById('glaze-layer');
            if (!glazeLayer) {
                glazeLayer = document.createElement('img');
                glazeLayer.classList.add('image-layer');
                glazeLayer.id = 'glaze-layer';
                document.getElementById('donut-frame').appendChild(glazeLayer);
            }
            glazeLayer.src = `images/glaze/${glaze.image}`;
            glazeLayer.style.zIndex = 2; // Устанавливаем z-index для глазури

            updateSummary();
        });
    });

    // Выбор топпинга
    const toppingButtons = document.querySelectorAll('.optiontop[data-type="topping"]');
    toppingButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Проверка, выбрана ли глазурь перед выбором топпинга
            if (!glaze) {
                alert('Выберите глазурь, чтобы добавить топпинги!');
                return; // Прекращаем выполнение, если глазурь не выбрана
            }

            const data = button.dataset;
            const topping = {
                image: data.image,
                price: parseInt(data.price),
                calories: parseInt(data.calories),
                proteins: parseFloat(data.proteins),
                fats: parseFloat(data.fats),
                carbs: parseFloat(data.carbs)
            };

            // Проверка, не был ли уже выбран этот топпинг
            const index = toppings.findIndex(t => t.image === topping.image);
            if (index === -1) {
                toppings.push(topping);
                button.classList.add('selected');

                // Создаем элемент изображения для топпинга
                const toppingLayer = document.createElement('img');
                toppingLayer.classList.add('image-layer');
                toppingLayer.src = `images/topping/${topping.image}`;
                toppingLayer.style.zIndex = toppingZIndex; // Устанавливаем уникальный z-index
                toppingLayer.alt = topping.image;
                toppingLayer.id = `topping-layer-${topping.image}`;

                // Добавляем изображение на пончик
                document.getElementById('donut-frame').appendChild(toppingLayer);

                // Увеличиваем z-index для следующего топпинга
                toppingZIndex++;
            } else {
                // Удаляем топпинг, если он уже был выбран
                toppings.splice(index, 1);
                button.classList.remove('selected');

                // Удаляем изображение с пончика
                const toppingLayer = document.getElementById(`topping-layer-${topping.image}`);
                if (toppingLayer) {
                    toppingLayer.remove();
                }
            }

            // Обновляем итоговую информацию о КБЖУ и стоимости
            updateSummary();
        });
    });
});



